using database;
using domains.domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.grpc;
using services.interfaces;

namespace services.services
{
    public class QuizSessionService : IQuizSessionService
    {
        private readonly QuizGrpcServiceClient _quizGrpcClient;
        private readonly DatabaseContext _dbContext;
        private readonly Mapper _mapper;

        public QuizSessionService(QuizGrpcServiceClient quizGrpcClient, DatabaseContext dbContext, Mapper mapper)
        {
            _quizGrpcClient = quizGrpcClient;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<QuizSessionResponse> AddQuizSession(int quizId)
        {
            var quizResponse = await _quizGrpcClient.GetQuizByIdAsync(quizId);
            if (quizResponse == null)
                throw new ArgumentNullException("QuizResponse cannot be null");

            var check = await CheckActiveQuizSessionByQuizId(quizId);
            if (check)
                throw new Exception("Quiz session already launch");

            var sessionKey = Random.Shared.Next(100000, 999999).ToString();

            var quizSession = new QuizSession
            {
                CreateAt = DateTime.UtcNow,
                QuizId = quizResponse.Id,
                Key = sessionKey
            };

            await _dbContext.QuizSessions.AddAsync(quizSession);
            await _dbContext.SaveChangesAsync();

            return new QuizSessionResponse
            {
                Id = quizSession.Id,
                SessionKey = sessionKey,
            };
        }

        public async Task<bool> CheckActiveQuizSessionByQuizId(int quizId)
        {
            var quizSession = await _dbContext.QuizSessions.FirstOrDefaultAsync(qs => qs.QuizId == quizId);
            if(quizSession == null)
            {
                return false;
            }

            return (quizSession.Status != Status.inactive) ? true : false;
        }

        public async Task<QuizSessionDTO> CompleteQuizSession(int quizSessionId)
        {
            var quizSession = await _dbContext.QuizSessions.FirstOrDefaultAsync(qs => qs.Id == quizSessionId);
            if (quizSession == null)
            {
                throw new ArgumentNullException("Not found quiz session by id");
            }

            quizSession.CompleteAt = DateTime.UtcNow;
            quizSession.Status = Status.inactive;

            await _dbContext.SaveChangesAsync();
            return _mapper.ToDTO(quizSession);
        }

        public async Task<QuizSessionResponse> GetQuizSessionByKey(string sessionKey)
        {
            var quizSession = await _dbContext.QuizSessions.FirstOrDefaultAsync(qs => qs.Key == sessionKey);
            if (quizSession == null)
                throw new ArgumentNullException("Not found quizSession by token");
            return new QuizSessionResponse 
            {
                Id = quizSession.Id,
                SessionKey = sessionKey,
            };
        }

        public async Task<QuizSessionDTO> StartQuizSession(int quizSessionId)
        {
            var quizSession = await _dbContext.QuizSessions.FirstOrDefaultAsync(qs => qs.Id == quizSessionId);
            if(quizSession == null)
            {
                throw new ArgumentNullException("Not found quiz session by id");
            }

            quizSession.StartAt = DateTime.UtcNow;
            quizSession.Status = Status.active;

            await _dbContext.SaveChangesAsync();
            return _mapper.ToDTO(quizSession);
        }

        public async Task<QuizSessionDTO> UpdateQuizSession(QuizSessionDTO quizSession)
        {
            if(quizSession == null)
            {
                throw new ArgumentNullException("Quiz session cannot by null");
            }

            var quizSessionFromDb = await _dbContext.QuizSessions.FirstOrDefaultAsync(qs => qs.Id == quizSession.Id);

            if(quizSessionFromDb == null)
            {
                throw new ArgumentNullException("Quiz session not found");
            }

            quizSessionFromDb.Status = quizSession.Status;
            quizSessionFromDb.Key = quizSession.Key; 

            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(quizSessionFromDb);
        }
    }
}
