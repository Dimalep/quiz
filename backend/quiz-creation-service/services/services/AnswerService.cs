using domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.interfaces;

namespace services.services
{
    public class AnswerService : IAnswerService
    {
        private readonly DatabaseContext _dbContext;
        private readonly Mapper _mapper;

        public AnswerService(Mapper mapper, DatabaseContext dbContext) 
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<AnswerDTO> AddAnswer(AnswerDTO answerDTO)
        {
            if (answerDTO == null) throw new ArgumentNullException("Answer DTO cannot by null");

            var addedAnser = await _dbContext.Answers.AddAsync(_mapper.FromDTO(answerDTO));
            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(addedAnser.Entity);
        }

        public async Task<int> AddAnswers(ICollection<AnswerDTO> answerDTOs)
        {
            if (answerDTOs == null) throw new ArgumentNullException("Collection with answers cannot by bull");
            if (!answerDTOs.Any()) throw new ArgumentException("Collection with answers is empty");

            var newAnswers = answerDTOs.Select(ans => _mapper.FromDTO(ans)).ToList();
            
            await _dbContext.Answers.AddRangeAsync(newAnswers);
            await _dbContext.SaveChangesAsync();

            return newAnswers.Count;
        }

        public async Task<AnswerDTO> DeleteAnswerById(int answerId)
        {
            var answer = await _dbContext.Answers.FindAsync(answerId);
            if (answer == null) throw new KeyNotFoundException($"Answer with id: {answerId} not found");

            var deletedAnswer = _dbContext.Answers.Remove(answer);
            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(deletedAnswer.Entity);
        }

        public async Task<AnswerDTO> GetAnswerById(int answerId)
        {
            var answer = await _dbContext.Answers.FindAsync(answerId);
            if (answer == null) throw new KeyNotFoundException($"Answer with id: {answerId} not found");

            return _mapper.ToDTO(answer);
        }

        public async Task<ICollection<AnswerDTO>> GetAnswersByQuestionId(int questionId)
        {
            var result = await _dbContext.Answers
                .Where(ans => ans.QuestionId == questionId)
                .Select(ans => _mapper.ToDTO(ans))
                .ToListAsync();

            return result;
        }

        public async Task<AnswerDTO> UpdateAnswer(AnswerDTO answerDTO)
        {
            if (answerDTO == null) throw new ArgumentNullException("Answer DTO cannot by null");

            var answer = await _dbContext.Answers.FindAsync(answerDTO.Id);
            if (answer == null) throw new KeyNotFoundException($"Answer with id: {answerDTO.Id} not found");

            var question = await _dbContext.Questions.FindAsync(answerDTO.QuestionId);
            if (question == null) throw new KeyNotFoundException($"Question with id: {answerDTO.QuestionId} not found");

            answer.Text = answerDTO.Text;
            answer.QuestionId = answerDTO.QuestionId;
            answer.Question = question;

            var updatedAnswer = _dbContext.Answers.Update(answer);

            return _mapper.ToDTO(updatedAnswer.Entity);
        }
    }
}
