using application.DTOs;
using domain.models;

namespace application.interfaces
{
    public interface IUserService
    {
        public Task<User> GenerateAnonUser();
        public Task<int> AddAnonUser();
        public Task<User> UpdateUser(User user);
        public Task<User?> GetByUsername(string username);
        public Task<User?> GetByEmail(string email);
        public Task<User?> GetById(int id);
    }
}
