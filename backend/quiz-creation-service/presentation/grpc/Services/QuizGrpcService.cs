using Grpc.Core;
using services.interfaces;

namespace presentation.grpc
{
    public class QuizGrpcService(IQuizService quizService) : QuizGrpc.QuizGrpcBase
    {
        public override async Task<QuizResponse> GetQuizById(QuizRequest request, ServerCallContext context)
        {
            var quiz = await quizService.GetQuizById(request.QuizId);

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
