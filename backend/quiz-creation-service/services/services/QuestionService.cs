using System.Diagnostics.CodeAnalysis;
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

        public async Task<int> UpdateQuestions(ICollection<QuestionDTO> questionDTOs)
        {
            if (questionDTOs == null)
                throw new ArgumentNullException(nameof(questionDTOs));

            if (!questionDTOs.Any())
                throw new ArgumentException("Collection of questions cannot be empty", nameof(questionDTOs));

            var ids = questionDTOs.Select(x => x.Id).ToList();
            var existing = await _dbContext.Questions.Where(q => ids.Contains(q.Id)).ToListAsync();

            foreach(var question in existing)
            {
                var dto = questionDTOs.First(q => q.Id == question.Id);

                question.Title = dto.Title;
                question.Type = dto.Type;

                _dbContext.Entry(question).State = EntityState.Modified;
            }

            return await _dbContext.SaveChangesAsync();
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

        public async Task<QuestionWithAnswers> GetWithAnswersById(int questionId)
        {
            var question = await _dbContext.Questions.FirstOrDefaultAsync(q => q.Id == questionId);
            if (question == null)
                throw new ArgumentException("Question by id not found");

            var answers = await _dbContext.Answers
                .Where(a => a.QuestionId == questionId)
                .Select(a => _mapper.ToDTO(a))
                .ToListAsync();

            var result = new QuestionWithAnswers
            {
                QuestionId = question.Id,
                Title = question.Title,
                Type = question.Type,
                Answers = answers
            };

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
