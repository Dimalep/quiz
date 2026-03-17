using System.Text.Json;
using domains.domains;
using Microsoft.AspNetCore.SignalR;
using services.DTOs;
using services.interfaces;

namespace presentation.hubs
{
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
        private readonly IPlayerService playerService;

        public QuizHub(IGameService gameService, IProgressService progressService, IPlayerService playerService)
        {
            _gameService = gameService;
            _progressService = progressService;
            this.playerService = playerService;
        }

        private static readonly Dictionary<string, QuizRuntimeSession> _sessions = new();
        private static readonly object _lock = new();

        public async Task ChangeName(PlayerDTO playerDto, string sessionKey)
        {
            var session = GetOrCreateSession(sessionKey);

            var changedPlayer = await playerService.Update(playerDto);

            lock (session.SyncRoot)
            {
                session.Connections[Context.ConnectionId] = changedPlayer;

                if (session.Progresses.ContainsKey(playerDto.Id))
                {
                    session.Progresses[playerDto.Id].Player.Nickname = changedPlayer.Nickname;
                }
            }

            await Clients
                .Group($"quiz_{sessionKey}")
                .SendAsync("UpdatedPlayers", session.Connections.Values.ToList());
            await Clients.Caller.SendAsync("UpdatedPlayerCaller", changedPlayer);
        }
        
        public async Task GiveAnswer(string sessionKey, QuestionResult questionResult, int playerId)
        {
            var session = GetOrCreateSession(sessionKey);

            var progress = await _progressService.AddAnswer(sessionKey, questionResult, playerId);
            
            lock (session.SyncRoot)
            {
                session.Progresses[playerId] = progress;
            }

            ProgressForPlayer prgoressForPlayer = new ProgressForPlayer
            {
                CurrentQuestionIndex = progress.CurrentQuestionIndex,
                QuantityCompletedQuestions = progress.QuizResult.Questions.Count(),
                QuantityQuestions = progress.QuantityQuestions,
                Status = progress.Status,
            };
            
            await Clients.Caller.SendAsync("ProgressUpdatedForPlayer", prgoressForPlayer);
            await SendProgressToAdmin(session);
        }
        
        public async Task CloseForConnect(string sessionKey)
        {
            var game = await _gameService.CloseForConnect(sessionKey);
            
            await Clients.Group($"quiz_{sessionKey}").SendAsync("GameClose", game);
            await Clients.Group($"quiz_admin_{sessionKey}").SendAsync("GameClose", game);
        }
        
        public async Task OpenForConnect(string sessionKey)
        {
            var game = await _gameService.OpenForConnect(sessionKey);
            
            await Clients.Group($"quiz_{sessionKey}").SendAsync("GameOpen", game);
            await Clients.Group($"quiz_admin_{sessionKey}").SendAsync("GameOpen", game);
        }
        
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

        public async Task RestartGame(string sessionKey)
        {
            var session = GetOrCreateSession(sessionKey);
            //
            var game = await _gameService.Restart(sessionKey);
            var progresses = await _progressService.Restart(game.Id);
            //
            lock (session.SyncRoot)
            {
                session.Progresses = progresses.ToDictionary(p => p.PlayerId);
            }
            
            await Clients.Group($"quiz_admin_{session.SessionKey}").SendAsync("RestartForAdmin", game);
            await SendProgressToAdmin(session);
        }
        
        #region for admin

        public async Task GetProgressesForAdmin(string sessionKey)
        {
            var session = GetOrCreateSession(sessionKey);
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

            List<ProgressForAdmin> progressesForAdmin = progresses
                .Select(p => new ProgressForAdmin
                {
                    Player = new services.DTOs.PlayerDTO
                    {
                        Id = p.Player.Id,
                        Nickname = p.Player.Nickname
                    },
                    CurrentQuestionIndex = p.CurrentQuestionIndex,
                    QuantityCorrectAnswers = p.QuizResult.QuantityCorrectAnswers,
                    QuantityRemainedQuestions = p.QuizResult?.Questions?.Count ?? 0,
                    Status = p.Status
                }).ToList();
            
            await Clients.Group($"quiz_admin_{session.SessionKey}")
                .SendAsync("ProgressUpdatedForAdmin", progressesForAdmin);
        }

        #endregion

        public async Task FinishGame(string sessionKey, int playerId)
        {
            var session = GetOrCreateSession(sessionKey);

            var progress = await _progressService.Finish(playerId, sessionKey);
            
            lock (session.SyncRoot)
            {
                session.Progresses[progress.PlayerId] = progress;
            }
            
            ProgressForPlayer progressForPlayer = new ProgressForPlayer
            {   
                ProgressId = progress.Id,
                CurrentQuestionIndex = progress.CurrentQuestionIndex,
                QuantityCompletedQuestions = progress.QuizResult.Questions.Count(),
                QuantityQuestions = progress.QuantityQuestions,
                Status = progress.Status,
            };
            
            await Clients.Caller.SendAsync("CompletedProgress", progressForPlayer);
            await SendProgressToAdmin(session);
        }
        
        //*need to optimize
        public async Task StartGame(string sessionKey, int playerId)
        {
            var session = GetOrCreateSession(sessionKey);
            
            var progress = await _progressService.Start(playerId, sessionKey);

            lock (session.SyncRoot)
            {
                session.Progresses[playerId] = progress;
            }
        
            ProgressForPlayer progressForPlayer = new ProgressForPlayer
            {
                ProgressId = progress.Id,
                CurrentQuestionIndex = progress.CurrentQuestionIndex,
                QuantityCompletedQuestions = progress.QuizResult.Questions.Count(),
                QuantityQuestions = progress.QuantityQuestions,
                Status = progress.Status,
            };
            
            await Clients.Caller.SendAsync("ProgressUpdatedForPlayer", progressForPlayer);
            await SendProgressToAdmin(session);
        }

        public async Task CreateProgress(string sessionKey, int playerId)
        {
            var session = GetOrCreateSession(sessionKey);

            var progress = await _progressService.CreateProgress(playerId, sessionKey);
            
            lock(session.SyncRoot)
            {
                session.Progresses[playerId] = progress;
            }
            
            ProgressForPlayer prgoressForPlayer = new ProgressForPlayer
            {
                ProgressId = progress.Id,
                CurrentQuestionIndex = progress.CurrentQuestionIndex,
                QuantityCompletedQuestions = progress.QuizResult.Questions.Count(),
                QuantityQuestions = progress.QuantityQuestions,
                Status = progress.Status,
            };
            
            await Clients.Caller.SendAsync("ProgressUpdatedForPlayer", prgoressForPlayer);
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
                            .SendAsync("UserLeft", player, session.Connections.Values.Where(p => p.Role == "player").ToList());
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

            var game = await _gameService.GetQuizSessionByKey(sessionKey);
            
            await Clients.Group($"quiz_{sessionKey}")
                .SendAsync("UserJoined", 
                    player,
                    session.Connections.Values.Where(p => p.Role == "player").ToList());

            await Clients.Caller.SendAsync("FirstConnect", game);
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
