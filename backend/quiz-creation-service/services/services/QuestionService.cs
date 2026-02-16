using domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.interfaces;

namespace services.services
{
    public class QuestionService : IQuestionService
    {
        private readonly DatabaseContext _dbContext;
        private readonly Mapper _mapper;

        public QuestionService(DatabaseContext dbContext, Mapper mapper)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<QuestionDTO> AddQuestion(QuestionDTO questionDTO)
        {
            if (questionDTO == null) throw new ArgumentNullException("Questio cannto by null");

            var addedQuestion = await _dbContext.Questions.AddAsync(_mapper.FromDTO(questionDTO));
            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(addedQuestion.Entity);
        }

        public async Task<int> AddQuestions(ICollection<QuestionDTO> questionDTOs)
        {
            if (questionDTOs == null)
                throw new ArgumentNullException(nameof(questionDTOs));

            if (!questionDTOs.Any())
                throw new ArgumentException("Collection of questions cannot be empty", nameof(questionDTOs));

            var newCollection = questionDTOs.Select(que => _mapper.FromDTO(que)).ToList();

            await _dbContext.Questions.AddRangeAsync(newCollection);
            await _dbContext.SaveChangesAsync();    

            return newCollection.Count;
        }

        public async Task<QuestionDTO> DeleteQuestionById(int questionId)
        {
            var question = await _dbContext.Questions.FindAsync(questionId);
            if (question == null) throw new KeyNotFoundException($"Question with id: {questionId} not found");

            var deletedQuestion = _dbContext.Questions.Remove(question);
            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(deletedQuestion.Entity);
        }

        public async Task<QuestionDTO> GetQuestionById(int questionId)
        {
            var question = await _dbContext.Questions.FindAsync(questionId);
            if (question == null) throw new KeyNotFoundException($"Question with id: {questionId} not found");

            return _mapper.ToDTO(question);
        }

        public async Task<ICollection<QuestionDTO>> GetQuestionsByQuizId(int quizId)
        {
            var result = await _dbContext.Questions
                .Where(que => que.QuizId == quizId)
                .Select(que => _mapper.ToDTO(que))
                .ToListAsync();

            return result;
        }

        public async Task<QuestionDTO> UpdateQuestion(QuestionDTO questionDTO)
        {
            var question = await _dbContext.Questions.FindAsync(questionDTO.Id);
            if (question == null) throw new KeyNotFoundException($"Question with id: {questionDTO.Id} not found");

            var quiz = await _dbContext.Quizzes.FindAsync(question.QuizId);
            if (quiz == null) throw new KeyNotFoundException($"Quiz whti id: {question.QuizId} not found");

            question.Id = questionDTO.Id;
            question.Title = questionDTO.Title;
            question.QuizId = questionDTO.QuizId;
            question.Quiz = quiz;
            question.Type = questionDTO.Type;

            var updatedQuestion = _dbContext.Questions.Update(question);
            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(updatedQuestion.Entity);
        }
    }
}
