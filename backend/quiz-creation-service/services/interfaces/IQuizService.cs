
using domains.domains;
using services.DTOs;

namespace services.interfaces
{
    public interface IQuizService
    {
        public Task<int> CreateEmptyQuiz(int userId);
        public Task<Quiz> UpdateQuiz(Quiz quiz);
        public Task<Quiz> DeleteQuizById(int quizId);
            
        public Task<Quiz?> GetQuizById(int quizId);
        public Task<ShortQuiz> GetShortQuizById(int quizId);
        public Task<ICollection<Quiz>> GetQuizzesByUserId(int userId);
        public Task<Quiz> GetQuizByIdWithShuffledQuestions(int quizId);
    }
}
