using application.DTOs;
using domain.models;

namespace application.interfaces
{
    public interface IUserService
    {
        public Task<int> AddAnonUser();
        public Task<User> AddUser(User user);
        public Task<User> DeleteUserById(int userId);
        public Task<User> UpdateUser(User user);
        public Task<User?> GetByUsername(string username);
        public Task<User> GetByPhone(string phone);
        public Task<User> GetByEmail(string email);
        public Task<UserDTO> GetById(int id);
    }
}
