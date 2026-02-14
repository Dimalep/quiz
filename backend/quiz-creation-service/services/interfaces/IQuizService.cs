using services.DTOs;

namespace services.interfaces
{
    public interface IQuizService
    {
        public Task<QuizDTO> AddQuiz(QuizDTO quizDTO);
        public Task<QuizDTO> DeleteQuizById(int quizId);
        public Task<QuizDTO> UpdateQuiz(QuizDTO quizDTO);
        public Task<QuizDTO?> GetQuizById(int quizId);
    }
}
