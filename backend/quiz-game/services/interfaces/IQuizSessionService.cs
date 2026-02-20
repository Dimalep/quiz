using services.DTOs;

namespace services.interfaces
{
    public interface IQuizSessionService
    {
        public Task<QuizSessionDTO> AddQuizSession(int quizId); 
    }
}
