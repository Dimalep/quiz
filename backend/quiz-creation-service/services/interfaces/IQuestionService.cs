using services.DTOs;

namespace services.interfaces
{
    public interface IQuestionService
    {
        public Task<QuestionDTO> AddQuestion(QuestionDTO questionDTO);
        public Task<int> AddQuestions(ICollection<QuestionDTO> questionDTOs);
        public Task<QuestionDTO> DeleteQuestionById(int questionId);
        public Task<QuestionDTO> UpdateQuestion(QuestionDTO questionDTO);
        public Task<QuestionDTO> GetQuestionById(int questionId);
        public Task<ICollection<QuestionDTO>> GetQuestionsByQuizId(int quizId);
    }
}
