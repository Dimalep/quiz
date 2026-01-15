using application.interfaces;
using domain.models;
using infrastructure;
using Microsoft.EntityFrameworkCore;

namespace application.services
{
    public class SessionService : ISessionService
    {
        public DatabaseContext _dbContext { get; set; }

        public SessionService(DatabaseContext db)
        {
            _dbContext = db;
        }

        public async Task<Session> Add(Session session)
        {
            if (session != null)
            {
                var addedSession = await _dbContext.Sessions.AddAsync(session);
                await _dbContext.SaveChangesAsync();

                return addedSession.Entity;
            }
            else {
                throw new InvalidDataException("Session cannot be null");
            }
        }

        public async Task<Session?> GetByRefreshToken(string refreshToken) 
        {
            return await _dbContext.Sessions.Include(i => i.User).
                FirstOrDefaultAsync(i => i.RefreshToken == refreshToken);
        }

        public async Task<Session?> Update(Session session) 
        {
            if(session != null)
            {
                _dbContext.Sessions.Update(session);
                await _dbContext.SaveChangesAsync();
            }

            return session;
        }
    }
}
