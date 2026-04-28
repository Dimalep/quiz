using application.DTOs;
using application.exceptions;
using application.exeptions;
using application.interfaces;
using domain.models;
using infrastructure;
using Microsoft.EntityFrameworkCore;

namespace application.services
{
    public class UserService(DatabaseContext dbContext, IPasswordService passwordService) : IUserService
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

        public async Task<User?> GetByUsername(string username)
        {
            return await dbContext.Users.FirstOrDefaultAsync(el => el.Username == username); ;
        }

        public async Task<UserDTO> PatchUser(int userId, EditUserRequest req)
        {
            Console.WriteLine($"Полученный пароль: {req.Password}");

            var user = await GetById(userId);

            if (user == null)
                throw new Exception($"Error patch user. Not found user by id {userId}");

            if (!string.IsNullOrWhiteSpace(req.Username))
            {
                var exsitsUserWithUpatedUsername = await GetByUsername(req.Username);

                if(exsitsUserWithUpatedUsername == null || exsitsUserWithUpatedUsername.Id == user.Id)
                {
                    user.Username = req.Username;
                }

                throw new BadRequestException("Пользователь с таким логином уже существует");
            }

            if(!string.IsNullOrWhiteSpace(req.Password))
                user.Password = passwordService.Hash(req.Password);

            user.UpdateAt = DateTime.UtcNow;

            await dbContext.SaveChangesAsync();

            Console.WriteLine($"Обновленный пароль: {user.Password}");

            return new UserDTO
            {
                Id = user.Id,
                UpdateAt = user.UpdateAt,
                CreateAt = user.CreateAt,
                Username = user.Username,
                Email = user.Email,
                IsRegistered = user.IsRegistered,
            };
        }
    }
}
