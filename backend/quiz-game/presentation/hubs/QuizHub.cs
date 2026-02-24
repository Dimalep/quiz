using domains.domains;
using Microsoft.AspNetCore.SignalR;
using services.DTOs;
using System.Security.Cryptography;

namespace presentation.hubs
{
    public record Player
    {
        public int Id { get; set; }
        public string Nickname { get; set;  } = string.Empty;
        public string Role { get; set; } = null!;
    }

    public class QuizHub : Hub
    {
        private static readonly Dictionary<string, Dictionary<string, Player>> _quizSessions = new();
        private static readonly object _lock = new();

        public async Task ConnectToQuiz(string sessionKey, Player currentPlayer)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"quiz_{sessionKey}");

            lock (_lock)
            {
                if (!_quizSessions.ContainsKey(sessionKey))
                    _quizSessions[sessionKey] = new Dictionary<string, Player>();

                _quizSessions[sessionKey][Context.ConnectionId] = currentPlayer;
            }

            await Clients.Group($"quiz_{sessionKey}")
                .SendAsync(
                    "UserJoined",
                    currentPlayer,
                    _quizSessions[sessionKey].Values.ToList()
                );
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            lock (_lock)
            {
                foreach (var kvp in _quizSessions.ToList())
                {
                    var sessionKey = kvp.Key;
                    var players = kvp.Value;

                    if (players.TryGetValue(Context.ConnectionId, out var playerToRemove))
                    {
                        players.Remove(Context.ConnectionId);

                        Clients.Group($"quiz_{sessionKey}")
                            .SendAsync("UserLeft", playerToRemove, players.Values.ToList());
                    }

                    if (players.Count == 0)
                        _quizSessions.Remove(sessionKey);
                }
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
