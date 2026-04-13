using System.Diagnostics;
using System.Text.Json;
using database;
using domains.domains;
using Microsoft.EntityFrameworkCore;
using services.Cache;
using services.DTOs;
using services.grpc;
using services.interfaces;

namespace services.services
{
    public class GameService : IGameService
    {
        private readonly QuizGrpcServiceClient _quizGrpcClient;
        private readonly DatabaseContext _dbContext;
        private readonly Mapper _mapper;
        private readonly QuizCacheService _quizCacheService;

        public GameService(QuizGrpcServiceClient quizGrpcClient, DatabaseContext dbContext, Mapper mapper, QuizCacheService quizCacheService)
        {
            _quizGrpcClient = quizGrpcClient;
            _dbContext = dbContext;
            _mapper = mapper;
            _quizCacheService = quizCacheService;
        }
        
        public async Task<GameResponse> GetGameByQuizIdAndUserId(int quizId, int userId)
        {
            var game = await _dbContext.Games
                .FirstOrDefaultAsync(q => q.QuizId == quizId && q.UserId == userId);

            if (game == null)
                throw new ArgumentException("Not found game by quizId and userId");

            return new GameResponse
            {
                Id = game.Id,
                QuizId = game.QuizId,
                SessionKey = game.sessionKey,
                Status = game.Status
            };
        }

        public async Task<ICollection<GameDTO>> GetGamesByUserId(int userId)
        {
            var data = await _dbContext.Games
                .Where(g => g.UserId == userId)
                .Select(g => new GameDTO
                {
                    Id = g.Id,
                    QuizId = g.UserId,
                    Status = g.Status,
                    sessionKey = g.sessionKey,
                    CompleteAt = g.CompleteAt,
                    CreateAt = g.CreateAt
                }).ToListAsync();
            
            return data;
        }

        public async Task<Game> StartFromProfile(int gameId)
        {
            throw new NotImplementedException();
        }

        // The initial method of the game
        public async Task<Game> InitialGame(int quizId, int userId)
        {
            Debug.WriteLine($"Quiz id - {quizId}");
            
            // // Get the full quiz
            // var response = await _httpClient
            //     .GetAsync($"http://localhost:5051/api/quizzes/{quizId}");
            //
            // if (!response.IsSuccessStatusCode)
            // {
            //     throw new Exception("Failed to fetch quiz snapshot");
            // }
            //
            // var json = await response.Content.ReadAsStringAsync();
            //
            // var quiz = JsonSerializer.Deserialize<Quiz>(json);
            //
            // if (quiz == null)
            //     throw new Exception($"Quiz by id: {quizId} not found");
            //
            // // Set quiz in-memory Dictionary
            // _quizCacheService.Set(quiz.Id, quiz);

            var quiz = await _quizCacheService.GetOrLoad(quizId);
            if (quiz == null)
                throw new Exception($"Cannot get quiz by id {quizId}");
            
            // Generate key
            var sessionKey = Random.Shared.Next(100000, 999999).ToString();
            
            Debug.WriteLine($"Quiz id - {quiz.Id}");
            
            // Create new game
            var game = new Game
            {
                sessionKey = sessionKey,
                QuizId = quizId,
                UserId = userId,
                Status = Status.opened
            };

            var addedGame = await _dbContext.Games.AddAsync(game);
            await _dbContext.SaveChangesAsync();

            return addedGame.Entity;
        }
        
        public async Task<Game> Launch(double lifetime, string sessionKey)
        {
            var quizSession = await _dbContext.Games
                .FirstOrDefaultAsync(qs => qs.sessionKey == sessionKey);
            
            if(quizSession == null)
            {
                throw new ArgumentNullException("Not found quiz session by id");
            }

            if (quizSession.Status == Status.launched)
            {
                throw new InvalidOperationException("Quiz session is already started");
            }
            
            quizSession.StartAt = DateTime.UtcNow;
            quizSession.Status = Status.launched;
            quizSession.CompleteAt = DateTime.UtcNow.AddHours(lifetime);
            
            await _dbContext.SaveChangesAsync();
            return quizSession;
        }
        
        public async Task<Game> Complete(string sessionKey)
        {
            var quizSession = await _dbContext.Games
                .FirstOrDefaultAsync(qs => qs.sessionKey == sessionKey);
            
            if (quizSession == null)
                throw new ArgumentNullException("Not found quiz session by id");

            // quizSession.CompleteAt = DateTime.UtcNow;
            quizSession.Status = Status.completed;
            
            await _dbContext.SaveChangesAsync();
            return quizSession;
        }

        public async Task<Game> OpenForConnect(string sessionKey)
        {
            var quizSession = await _dbContext.Games
                .FirstOrDefaultAsync(qs => qs.sessionKey == sessionKey);
            
            if (quizSession == null)
                throw new ArgumentNullException("Not found quiz session by id");

            quizSession.Status = Status.opened;
            await _dbContext.SaveChangesAsync();
            return quizSession;
        }

        public async Task<Game> CloseForConnect(string sessionKey)
        {
            var quizSession = await _dbContext.Games
                .FirstOrDefaultAsync(qs => qs.sessionKey == sessionKey);
            
            if (quizSession == null)
                throw new ArgumentNullException("Not found quiz session by id");

            quizSession.Status = Status.closed;
            await _dbContext.SaveChangesAsync();
            return quizSession;
        }

        public async Task<Game> Restart(string sessionKey)
        {
            var game = await _dbContext.Games
                .FirstOrDefaultAsync(g => g.sessionKey == sessionKey);

            if (game == null)
            {
                throw new ArgumentNullException("Not found game by session key");
            }
            
            game.Status = Status.opened;
            
            await _dbContext.SaveChangesAsync();
            
            return game;
        }
        
        public async Task<GameResponse> Add(int quizId, int userId)
        {
            var quizResponse = await _quizGrpcClient.GetQuizByIdAsync(quizId);
            if (quizResponse == null)
                throw new ArgumentNullException("QuizResponse cannot be null");
            
            var sessionKey = Random.Shared.Next(100000, 999999).ToString();

            var quizSession = new Game
            {
                CreateAt = DateTime.UtcNow,
                QuizId = quizResponse.Id,
                sessionKey = sessionKey,
                Status = Status.opened,
                UserId = userId,
            };

            await _dbContext.Games.AddAsync(quizSession);
            await _dbContext.SaveChangesAsync();

            return new GameResponse
            {
                Id = quizSession.Id,
                SessionKey = sessionKey,
                Status = Status.opened,
                QuizId = quizSession.QuizId
            };
        }

        public async Task<bool> CheckActiveQuizSessionByQuizId(int quizId)
        {
            var quizSession = await _dbContext.Games.FirstOrDefaultAsync(qs => qs.QuizId == quizId);
            if(quizSession == null)
            {
                return false;
            }

            return (quizSession.Status != Status.closed) ? true : false;
        }

        public async Task<GameResponse> GetQuizSessionByKey(string sessionKey)
        {
            var game = await _dbContext.Games
                .FirstOrDefaultAsync(g => g.sessionKey == sessionKey);
            
            if (game == null)
                throw new ArgumentNullException("Not found quizSession by token");
            
            return new GameResponse 
            {
                Id = game.Id,
                SessionKey = sessionKey,
                Status = game.Status,
                QuizId = game.QuizId,
                UserId = game.UserId
            };
        }

        public async Task<GameDTO> UpdateQuizSession(GameDTO game)
        {
            if(game == null)
            {
                throw new ArgumentNullException("Quiz session cannot by null");
            }

            var quizSessionFromDb = await _dbContext.Games.FirstOrDefaultAsync(qs => qs.Id == game.Id);

            if(quizSessionFromDb == null)
            {
                throw new ArgumentNullException("Quiz session not found");
            }

            quizSessionFromDb.Status = game.Status;
            quizSessionFromDb.sessionKey = game.sessionKey; 

            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(quizSessionFromDb);
        }
    }
}
