using domains;
using domains.domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.interfaces;
using System.Diagnostics;

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
            Debug.WriteLine($"{quiz.Id} {quiz.Description}");
            
            var updatingQuiz = await GetQuizById(quiz.Id);

            if (updatingQuiz == null)
            {
                throw new Exception($"Quiz with id {quiz.Id} not found");
            }
            
            Debug.WriteLine($"{updatingQuiz.Id} {updatingQuiz.Description}");
            
            
            // db.Entry(updatingQuiz).CurrentValues.SetValues(quiz);

            updatingQuiz.Description = quiz.Description;
            updatingQuiz.Title = quiz.Title;
            updatingQuiz.UserId = quiz.UserId;
            updatingQuiz.Questions = quiz.Questions;
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

        public async Task<Quiz?> GetQuizById(int quizId)
        {
            var quiz = await db.Quizzes
                .FirstOrDefaultAsync(q => q.Id == quizId);
            
            return quiz;
        }

        public async Task<Quiz> GetQuizByIdWithShuffledQuestions(int quizId)
        {
            var quiz = await db.Quizzes
                .FirstOrDefaultAsync(q => q.Id == quizId);
            
            if (quiz == null)
                throw new ArgumentException("Quiz not found");
            
            var shuffled = quiz.Questions
                .OrderBy(q => Guid.NewGuid())
                .ToList();
            
            for (int i = 0; i < shuffled.Count; i++)
            {
                shuffled[i].Index = i;
            }
            
            quiz.Questions = shuffled;
            await db.SaveChangesAsync();
            
            return quiz;
        }
        
        // Deleted
        //public async Task<ShortQuiz> GetShortQuizById(int quizId)
        //{
        //    var quiz = await db.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);
        //    if (quiz == null)
        //    {
        //        throw new ArgumentException("Quiz not found");
        //    }

        //    var shortQuiz = new ShortQuiz
        //    {
        //        Id = quiz.Id,
        //        Title = quiz.Title,
        //        Description = quiz.Description,
        //        QuantityQuestions = quiz.QuantityQuestions
        //    };
            
        //    return shortQuiz;
        //}

        //Get by id light version of quiz  
        //public async Task<LightQuiz> GetLightQuizById(int quizId)
        //{
        //    var quiz = await db.Quizzes
        //        .FirstOrDefaultAsync(q => q.Id == quizId);

        //    if (quiz == null)
        //        throw new ArgumentException("Not found quiz by id");

        //    var questionsIds = quiz.Questions
        //        .Select(question => question.Id)
        //        .ToList();

        //    return new LightQuiz
        //    {
        //        Id = quiz.Id,
        //        Description = quiz.Description,
        //        QuantityQuestions = quiz.QuantityQuestions,
        //        QuestionsIds = questionsIds,
        //    };
        //}

        public async Task<ICollection<Quiz>> GetQuizzesByUserId(int userId)
        {
            return await db.Quizzes
                .Where(q => q.UserId == userId)
                .ToListAsync();
        }

        // Get only info about quiz with no questions
        public async Task<InfoAboutQuiz> GetInfoAboutQuizByQuizId(int quizId)
        {
            var quiz = await GetQuizById(quizId);
            if (quiz == null)
                throw new Exception($"Error get info about quiz. Not found quiz by id {quizId}");

            return new InfoAboutQuiz
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Description = quiz.Description,
                QuantityQuestions = quiz.QuantityQuestions
            };
        }
    }
}
