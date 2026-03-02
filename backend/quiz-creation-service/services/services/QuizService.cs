using domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.interfaces;

namespace services.services
{
    public class QuizService : IQuizService
    {
        private readonly DatabaseContext _dbContext;
        private readonly Mapper _mapper;

        public QuizService(DatabaseContext dbContext, Mapper mapper) 
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<QuizDTO> AddQuiz(QuizDTO quizDTO)
        {
            if (quizDTO == null) throw new ArgumentNullException("Quiz cannot by null");

            var addedQuiz = await _dbContext.Quizzes.AddAsync(_mapper.FromDTO(quizDTO));
            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(addedQuiz.Entity);
        }

        public async Task<int> CreateEmptyQuiz()
        {
            var newQuiz = await AddQuiz(new QuizDTO 
            {
                Title = string.Empty,
                Description = string.Empty,
                QuantityQuestions = 0,
            });

            return newQuiz.Id;
        }

        public async Task<QuizDTO> DeleteQuizById(int quizId)
        {
            var quiz = await _dbContext.Quizzes.FindAsync(quizId);
            if (quiz == null) throw new ArgumentNullException("Quiz cannot by null");

            var deletedQuiz = _dbContext.Quizzes.Remove(quiz);
            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(deletedQuiz.Entity);
        }

        public async Task<QuizDTO?> GetQuizById(int quizId)
        {
            var quiz = await _dbContext.Quizzes.FindAsync(quizId);
            if (quiz == null) throw new KeyNotFoundException($"Quiz with id {quizId} not found");
            return _mapper.ToDTO(quiz);
        }

        public async Task<QuizWithQuestionsIds> GetWithQuestionsIdsById(int quizId)
        {
            var quiz = await _dbContext.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);
            if (quiz == null)
                throw new ArgumentException("Not found quiz by id");

            var questionsIds = await _dbContext.Questions
                .Where(q => q.QuizId == quizId)
                .Select(q => q.Id)
                .ToListAsync();

            var result = new QuizWithQuestionsIds
            {
                Id = quizId,
                Title = quiz.Title,
                Description = quiz.Description,
                QuantityQuestions = quiz.QuantityQuestions,
                QuestionsIds = questionsIds
            };

            return result;
        }

        public async Task<QuizDTO> UpdateQuiz(QuizDTO quizDTO)
        {
            var updatingQuiz = await _dbContext.Quizzes.FindAsync(quizDTO.Id);
            if(updatingQuiz == null) throw new KeyNotFoundException($"Quiz with id {quizDTO.Id} not found");

            updatingQuiz.Title = quizDTO.Title;
            updatingQuiz.Description = quizDTO.Description;
            updatingQuiz.QuantityQuestions = quizDTO.QuantityQuestions;

            var updatedQuiz = _dbContext.Quizzes.Update(updatingQuiz);
            await _dbContext.SaveChangesAsync();

            return _mapper.ToDTO(updatedQuiz.Entity);
        }
    }
}
