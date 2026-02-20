using database;
using domains.domains;
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

        public async Task<QuizSessionDTO> AddQuizSession(int quizId)
        {
            var quizResponse = await _quizGrpcClient.GetQuizByIdAsync(quizId);
            if(quizResponse == null)
            {
                throw new ArgumentNullException("QuizResponse cannot by null");
            }

            //var base64 = _qrService.GenerateQrBase64($"http://localhost:5173/quiz/game/{quizResponse.Id}");
            var sessionKey = Random.Shared.Next(100000, 999999).ToString();

            var quizSession = await _dbContext.AddAsync(new QuizSession
            {
                //CompleteAt = DateTime.UtcNow,
                CreateAt = DateTime.UtcNow,
                QuizId = quizResponse.Id,
                Key = sessionKey
            });
            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(quizSession.Entity);
        }
    }
}
