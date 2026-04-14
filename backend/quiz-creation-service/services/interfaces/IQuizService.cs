
using domains.domains;
using services.DTOs;

namespace services.interfaces
{
    public interface IQuizService
    {
        public Task<int> CreateEmptyQuiz(int userId);
        public Task<Quiz> UpdateQuiz(Quiz quiz);
        public Task<Quiz> DeleteQuizById(int quizId);
            

        public Task<Quiz?> GetQuizById(int quizId);
        public Task<InfoAboutQuiz> GetInfoAboutQuizByQuizId(int quizId);
        public Task<ICollection<Quiz>> GetQuizzesByUserId(int userId);
        #region ?

        // Deleted
        //public Task<ShortQuiz> GetShortQuizById(int quizId);
        //public Task<LightQuiz> GetLightQuizById(int quizId);

        #endregion
       
        //public Task<Quiz> GetQuizByIdWithShuffledQuestions(int quizId);
    }
}
