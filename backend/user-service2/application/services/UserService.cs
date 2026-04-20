using application.exceptions;
using application.interfaces;
using domain.models;
using infrastructure;
using Microsoft.EntityFrameworkCore;

namespace application.services
{
    public class UserService(DatabaseContext dbContext) : IUserService
    {
        public async Task<User> GenerateAnonUser()
        {
            var result = await dbContext.Users.AddAsync(new User());
            await dbContext.SaveChangesAsync();

            result.Entity.Username = $"user{result.Entity.Id}";
            await dbContext.SaveChangesAsync();
            
            return result.Entity;
        }
        
        public async Task<int> AddAnonUser()
        {
            var result = await dbContext.Users.AddAsync(new User());
            await dbContext.SaveChangesAsync();

            result.Entity.Username = $"user{result.Entity.Id}";
            await dbContext.SaveChangesAsync();
            
            return result.Entity.Id;
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
        public async Task<User> UpdateUser(User user)
        {
            if (user == null)
                throw new ConflictException("Argumnet can't be null");

            User? oldVersionUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
            if (oldVersionUser == null)
                throw new ConflictException("Cannt find user");

            oldVersionUser.Username = user.Username;
            oldVersionUser.Password = user.Password;
            oldVersionUser.IsRegistered = true;
            await dbContext.SaveChangesAsync();

            return oldVersionUser;
        }


        public async Task<User?> GetById(int id)
        {
            return await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User?> GetByEmail(string email)
        {
            return await dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
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
