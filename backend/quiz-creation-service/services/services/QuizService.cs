using domains;
using domains.domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.interfaces;

namespace services.services
{
    public class QuizService(DatabaseContext db) : IQuizService
    {
         public async Task<int> CreateEmptyQuiz(int userId)
         {
             var newQuiz = new Quiz
             {
                 Title = string.Empty,
                 Description = string.Empty,
                 QuantityQuestions = 0,
                 UserId = userId,
             };

             var createdQuiz = await db.Quizzes.AddAsync(newQuiz);
             await db.SaveChangesAsync();
             
             return createdQuiz.Entity.Id;
        }

        public async Task<Quiz> UpdateQuiz(Quiz quiz)
        {
            var updatingQuiz = await GetQuizById(quiz.Id);

            db.Entry(updatingQuiz).CurrentValues.SetValues(quiz);

            updatingQuiz.QuantityQuestions = quiz.Questions.Count();

            await db.SaveChangesAsync();

            return updatingQuiz;
        }

        public async Task<Quiz> DeleteQuizById(int quizId)
        {
            var quiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);
            if (quiz == null)
                throw new ArgumentException("Not found quiz");

            var deletedQuiz = db.Quizzes.Remove(quiz);
            await db.SaveChangesAsync();

            return deletedQuiz.Entity;
        }

        public async Task<Quiz> GetQuizById(int quizId)
        {
            var quiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);
            if (quiz == null)
            {
                throw new ArgumentException("Quiz not found");
            }

            return quiz;
        }

        public async Task<ShortQuiz> GetShortQuizById(int quizId)
        {
            var quiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);
            if (quiz == null)
            {
                throw new ArgumentException("Quiz not found");
            }

            var shortQuiz = new ShortQuiz
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Description = quiz.Description,
                QuantityQuestions = quiz.QuantityQuestions
            };
            
            return shortQuiz;
        }

        public async Task<ICollection<Quiz>> GetQuizzesByUserId(int userId)
        {
            return await db.Quizzes
                .Where(q => q.UserId == userId)
                .ToListAsync();
        }
    }
}
