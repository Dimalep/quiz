using Grpc.Net.Client;

namespace services.grpc
{
    public class QuizGrpcServiceClient
    {
        private QuizGrpc.QuizGrpcClient _client;

        public QuizGrpcServiceClient(GrpcChannel channel)
        {
            _client = new QuizGrpc.QuizGrpcClient(channel);
        }

        public async Task<QuizResponse> GetQuizByIdAsync(int quizId)
        {
            var request = new QuizRequest { QuizId = quizId };
            return await _client.GetQuizByIdAsync(request);
        }
    }
}
