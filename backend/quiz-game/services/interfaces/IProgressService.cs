using domains.domains;
using services.DTOs;

namespace services.interfaces
{
    public interface IProgressService
    {
        public Task<Progress> CreateProgress(int playerId, string sessionKey);
        
        //new
        public Task<CurrentPlayerProgress> PlayerStarted(int playerId, string sessionKey);
        
        // Deleted
        // public Task<Progress> Start(int playerId, string sessionKey);
        
        public Task<Progress> Finish(int playerId, string sessionKey);
        public Task<ICollection<Progress>> Restart(int gameId);
        
        public Task<Progress> AddAnswer(string sessionKey, QuestionResult answer, int progressId);
        public Task<ToAnswerProgressResponse> ToAnswer(ToAnswerProgressRequest answer);
        
        public Task<Progress?> GetById(int progressId);
        public Task<Progress?> GetProgressByPlayerIdAndGameId(int playerId, int gameId); 
        
        public Task<ICollection<ProgressForAdmin>> GetProgressesBySessionKey(string sessionKey);
        
        // public Task<Progress> UpdateProgress(Progress progress);
        // public Task<Progress?> GetBySessionKeyAndPlayerId(string sessionKey, int playerId);
    }
}