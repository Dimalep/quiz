using Grpc.Core;
using services.interfaces;

namespace QuizCreationService.Services
{
    public class QuizService : QuizGrpc.QuizGrpcBase
    {
        private readonly IQuizService _quizService;

        public QuizService(IQuizService quizService)
        {
            _quizService = quizService;
        }

        public override async Task<QuizResponse> GetQuizById(QuizRequest request, ServerCallContext context)
        {
            var quiz = await _quizService.GetQuizById(request.QuizId);

            if(quiz == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Quiz cannot be null"));
            }

            return new QuizResponse
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Description = quiz.Description,
                QuantityQuestions = quiz.QuantityQuestions,
            };
        }
    }
}
