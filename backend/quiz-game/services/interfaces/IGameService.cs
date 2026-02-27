using domains.domains;
using services.DTOs;

namespace services.interfaces
{
    public interface IGameService
    {
        public Task<GameResponse> Add(int quizId);
        public Task<GameResponse> GetQuizSessionByKey(string sessionKey);

        #region admin function
        public Task<Game> Launch(double lifetime, string sessionKey);
        public Task<Game> Complete(string sessionKey);
        public Task<Game> OpenForConnect(string sessionKey);
        public Task<Game> CloseForConnect(string sessionKey);
        #endregion
        
        public Task<GameDTO> UpdateQuizSession(GameDTO game);
        public Task<bool> CheckActiveQuizSessionByQuizId(int quizId);
    }
}
