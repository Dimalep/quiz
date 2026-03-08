using domains;
using domains.domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.interfaces;

namespace services.services
{
    public class QuizService(DatabaseContext db) : IQuizService
    {
         public async Task<int> CreateEmptyQuiz()
         {
             var newQuiz = new Quiz
             {
                 Title = string.Empty,
                 Description = string.Empty,
                 QuantityQuestions = 0,
             };

             var createdQuiz = await db.Quizzes.AddAsync(newQuiz);
             await db.SaveChangesAsync();
             
             return createdQuiz.Entity.Id;
        }

        public async Task<Quiz> UpdateQuiz(Quiz quiz)
        {
            var updatingQuiz = await GetQuizById(quiz.Id);

            Console.WriteLine($"Cout questions 1 - {quiz.Questions.Count()}");

            db.Entry(updatingQuiz).CurrentValues.SetValues(quiz);

            Console.WriteLine($"Cout questions 2 - {quiz.Questions.Count()}");

            updatingQuiz.QuantityQuestions = quiz.Questions.Count();

            await db.SaveChangesAsync();

            return updatingQuiz;
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
    }
}
