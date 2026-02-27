using domains.domains;
using services.DTOs;

namespace services.interfaces
{
    public interface IProgressService
    {
        public Task<Progress> AddPlayerProgress(int playerId, string sessionKey);
        public Task<ProgressDTO> AddAnswer(string sessionKey, QuestionResult answer, int progressId);
        public Task<Progress> UpdateProgress(Progress progress);
    }
}