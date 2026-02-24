using services.DTOs;

namespace services.interfaces
{
    public interface IQuizSessionService
    {
        public Task<QuizSessionResponse> AddQuizSession(int quizId);
        //public Task<> Connect();
        public Task<QuizSessionDTO> StartQuizSession(int quizSessionId);
        public Task<QuizSessionDTO> CompleteQuizSession(int quizSessionId);
        public Task<QuizSessionResponse> GetQuizSessionByKey(string sessionKey);

        public Task<QuizSessionDTO> UpdateQuizSession(QuizSessionDTO quizSession);
        public Task<bool> CheckActiveQuizSessionByQuizId(int quizId);
    }
}
