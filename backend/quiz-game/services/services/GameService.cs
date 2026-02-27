using database;
using domains.domains;
using Microsoft.EntityFrameworkCore;
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

        public GameService(QuizGrpcServiceClient quizGrpcClient, DatabaseContext dbContext, Mapper mapper)
        {
            _quizGrpcClient = quizGrpcClient;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<GameResponse> Add(int quizId)
        {
            var quizResponse = await _quizGrpcClient.GetQuizByIdAsync(quizId);
            if (quizResponse == null)
                throw new ArgumentNullException("QuizResponse cannot be null");

            var existsQuizSession = await _dbContext.Games
                .FirstOrDefaultAsync(qs => qs.QuizId == quizId);

            if(existsQuizSession != null)
            {
                existsQuizSession.Status = Status.active;
                await _dbContext.SaveChangesAsync();

                return new GameResponse
                {
                    Id = existsQuizSession.Id,
                    SessionKey = existsQuizSession.Key,
                    Status = Status.active
                };
            }

            var sessionKey = Random.Shared.Next(100000, 999999).ToString();

            var quizSession = new Game
            {
                CreateAt = DateTime.UtcNow,
                QuizId = quizResponse.Id,
                Key = sessionKey,
                Status = Status.active,
            };

            await _dbContext.Games.AddAsync(quizSession);
            await _dbContext.SaveChangesAsync();

            return new GameResponse
            {
                Id = quizSession.Id,
                SessionKey = sessionKey,
                Status = Status.active
            };
        }

        public async Task<bool> CheckActiveQuizSessionByQuizId(int quizId)
        {
            var quizSession = await _dbContext.Games.FirstOrDefaultAsync(qs => qs.QuizId == quizId);
            if(quizSession == null)
            {
                return false;
            }

            return (quizSession.Status != Status.inactive) ? true : false;
        }

        public async Task<Game> Complete(string sessionKey)
        {
            var quizSession = await _dbContext.Games
                .FirstOrDefaultAsync(qs => qs.Key == sessionKey);
            
            if (quizSession == null)
                throw new ArgumentNullException("Not found quiz session by id");

            // quizSession.CompleteAt = DateTime.UtcNow;
            quizSession.Status = Status.inactive;
            
            await _dbContext.SaveChangesAsync();
            return quizSession;
        }

        public async Task<GameResponse> GetQuizSessionByKey(string sessionKey)
        {
            var quizSession = await _dbContext.Games.FirstOrDefaultAsync(qs => qs.Key == sessionKey);
            if (quizSession == null)
                throw new ArgumentNullException("Not found quizSession by token");
            return new GameResponse 
            {
                Id = quizSession.Id,
                SessionKey = sessionKey,
                Status = quizSession.Status
            };
        }

        public async Task<Game> Launch(double lifetime, string sessionKey)
        {
            var quizSession = await _dbContext.Games
                .FirstOrDefaultAsync(qs => qs.Key == sessionKey);
            
            if(quizSession == null)
            {
                throw new ArgumentNullException("Not found quiz session by id");
            }

            if (quizSession.Status == Status.game)
            {
                throw new InvalidOperationException("Quiz session is already started");
            }
            
            quizSession.StartAt = DateTime.UtcNow;
            quizSession.Status = Status.game;
            quizSession.CompleteAt = DateTime.UtcNow.AddHours(lifetime);
            
            await _dbContext.SaveChangesAsync();
            return quizSession;
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
            quizSessionFromDb.Key = game.Key; 

            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(quizSessionFromDb);
        }
    }
}
