using services.DTOs;

namespace services.interfaces
{
    public interface IAnswerService
    {
        public Task<AnswerDTO> AddAnswer(AnswerDTO answerDTO);
        public Task<int> AddAnswers(ICollection<AnswerDTO> answerDTOs);
        public Task<AnswerDTO> DeleteAnswerById(int answerId);
        public Task<AnswerDTO> UpdateAnswer(AnswerDTO answerDTO);
        public Task<int> UpdateAnswers(ICollection<AnswerDTO> answerDTOs);
        public Task<AnswerDTO> GetAnswerById(int answerId);
        public Task<ICollection<AnswerDTO>> GetAnswersByQuestionId(int questionId);
    }
}
