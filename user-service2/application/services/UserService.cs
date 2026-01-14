using application.DTOs;
using application.interfaces;
using domain.models;
using infrastructure;
using Microsoft.EntityFrameworkCore;

namespace application.services
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext dbContext;

        public UserService(DatabaseContext dbContext) 
        {
            this.dbContext = dbContext;
        }

        public async Task<User> AddUser(User user)
        {
            if(user == null) throw new ArgumentNullException("Argument cannot by null. [method 'AddUserAsync' from 'UserService' class]"); 

            var result = await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();

            return result.Entity;
        } 

        public async Task<User> DeleteUserById(int userId)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null) 
                throw new ArgumentNullException("Argument cannot by null. [method 'DeleteUserByIdAsync' from 'UserService' class]"); //*

            var deletedUser = dbContext.Users.Remove(user);
            await dbContext.SaveChangesAsync();

            return deletedUser.Entity;
        }
        public Task<User> UpdateUser(User user)
        {
            throw new NotImplementedException();
        }


        public async Task<UserDTO> GetById(int id)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
                throw new ArgumentNullException("Argument cannot by null. [method 'GetById' from 'UserService' class]");

            return new UserDTO()
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Phone = user.Phone,

                CreateAt = user.CreateAt,
                UpdateAt = user.UpdateAt,

                Lastname = user.Lastname,
                Middlename = user.Middlename,
                Firstname = user.Firstname
            };
        }

        public Task<User> GetByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetByPhone(string phone)
        {
            throw new NotImplementedException();
        }

        public async Task<User?> GetByUsername(string username)
        {
            if (username == string.Empty)
                throw new ArgumentNullException("Argument cannot by empty string. [method 'GetByUsername' from 'UserService' class]");

            var user = await dbContext.Users.FirstOrDefaultAsync(el => el.Username == username);

            return user;
        }
    }
}
