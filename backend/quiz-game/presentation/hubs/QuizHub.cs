using domains.domains;
using Microsoft.AspNetCore.SignalR;
using services.DTOs;
using services.interfaces;

namespace presentation.hubs
{
    public record PlayerDTO
    {
        public int Id { get; set; }
        public string Nickname { get; set;  } = string.Empty;
        public string Role { get; set; } = null!;
    }
    
    public class QuizRuntimeSession
    {
        public string SessionKey = null!;
        //Connected players
        public Dictionary<string, PlayerDTO> Connections { get; set; } = new();
        //Players progresses
        public Dictionary<int, Progress> Progresses { get; set; } = new();
        public bool IsStarted { get; set; } = false;
        //Hours
        public double Lifetime { get; set; }
        //lock
        public object SyncRoot { get; set; } = new();
    }
    
    public class QuizHub : Hub
    {
        private readonly IGameService _gameService;
        private readonly IProgressService _progressService;

        public QuizHub(IGameService gameService, IProgressService progressService)
        {
            _gameService = gameService;
            _progressService = progressService;
        }

        private static readonly Dictionary<string, QuizRuntimeSession> _sessions = new();
        private static readonly object _lock = new();

        public async Task CompleteGame(string sessionKey)
        {
            var session = GetOrCreateSession(sessionKey);

            lock (session.SyncRoot)
            {
                session.IsStarted = false;
            }

            var game = await _gameService.Complete(sessionKey);

            await Clients.Group($"quiz_{sessionKey}").SendAsync("GameCompleted", game);
            await SendProgressToAdmin(session);
        }
        
        public async Task LaunchGame(string sessionKey, double lifetime)
        {
            var session = GetOrCreateSession(sessionKey);
            
            lock (session.SyncRoot)
            {
                session.IsStarted = true;
                session.Lifetime = lifetime;
            }

            var game = await _gameService.Launch(lifetime, sessionKey);

            await Clients.Group($"quiz_{session.SessionKey}").SendAsync("GameLaunched", game);
            await SendProgressToAdmin(session);
        }
        
        private async Task SendProgressToAdmin(QuizRuntimeSession session)
        {
            List<Progress> progresses;
            
            lock (session.SyncRoot)
            {
                progresses = session.Progresses
                    .Values
                    .OrderByDescending(x => x.CurrentQuestionIndex)
                    .ToList();
            }

            List<ProgressDTO> progressDTOs = progresses.Select(p => new ProgressDTO()
            {
                Id = p.Id,
                CompleteAt = p.CompleteAt,
                CurrentQuestionIndex = p.CurrentQuestionIndex,
                QuantityQuestion = p.CurrentQuestionIndex,
                SessionId = p.SessionId,
                StartAt = p.StartAt,
                Player = new services.DTOs.PlayerDTO
                {
                    Id = p.Player.Id,
                    Nickname = p.Player.Nickname,
                }
            }).ToList();
            
            await Clients.Group($"quiz_admin_{session.SessionKey}")
                .SendAsync("ProgressUpdatedForAdmin", progressDTOs);
        }

        public async Task FinishGame(string sessionKey, Progress progress)
        {
            var session = GetOrCreateSession(sessionKey);

            lock (session.SyncRoot)
            {
                session.Progresses[progress.PlayerId] = progress;
            }

            await Clients.Caller.SendAsync("ProgressUpdated", progress);
            await SendProgressToAdmin(session);
        }
        
        public async Task StartGame(string sessionKey, int playerId)
        {
            var session = GetOrCreateSession(sessionKey);

            var progress = await _progressService.AddPlayerProgress(playerId, sessionKey);

            lock (session.SyncRoot)
            {
                session.Progresses[playerId] = progress;
            }

            await Clients.Caller.SendAsync("ProgressUpdated", progress);
            await SendProgressToAdmin(session);
        }
        
        //*need to optimize
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            foreach (var session in _sessions.Values)
            {
                lock (session.SyncRoot)
                {
                    if (session.Connections.TryGetValue(Context.ConnectionId, out var player))
                    {
                        session.Connections.Remove(Context.ConnectionId);

                        Clients.Group($"quiz_{session.SessionKey}")
                            .SendAsync("UserLeft", player, session.Connections.Values.ToList());
                    }
                }
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task ConnectToQuiz(string sessionKey, PlayerDTO player)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"quiz_{sessionKey}");

            if (player.Role == "admin")
            {
                await Groups
                    .AddToGroupAsync(Context.ConnectionId, $"quiz_admin_{sessionKey}");
            }

            var session = GetOrCreateSession(sessionKey);

            lock (session.SyncRoot)
            {
                session.Connections[Context.ConnectionId] = player;
            }

            await Clients.Group($"quiz_{sessionKey}")
                .SendAsync("UserJoined", player, session.Connections.Values.ToList());
        }
        
        private static QuizRuntimeSession GetOrCreateSession(string sessionKey)
        {
            lock (_lock)
            {
                if (!_sessions.ContainsKey(sessionKey))
                    _sessions[sessionKey] = new QuizRuntimeSession()
                    {
                        SessionKey = sessionKey
                    };

                return _sessions[sessionKey];
            }
        }
    }
}
