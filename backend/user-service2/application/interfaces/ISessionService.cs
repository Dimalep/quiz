using domain.models;

namespace application.interfaces
{
    public interface ISessionService
    {
        public Task<Session> Add(Session session);
        public Task<Session?> Update(Session session);
        public Task<Session?> GetByRefreshToken(string refreshToken);
    }
}
