using System.Security.Principal;
using database;
using domains.domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.interfaces;

namespace services.services
{
    public class PlayerService : IPlayerService
    {
        private readonly DatabaseContext _dbContext;

        public PlayerService(DatabaseContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<Player?> GetPlayerByGameIdAndUserId(int gameId, int userId)
        {
            var player = await _dbContext.Players
                .FirstOrDefaultAsync(p => p.GameId == gameId && p.UserId == userId);

            return player;
        }

        public async Task<Player> GetOrCreatePlayer(int userId, int gameId, string role)
        {
            var existsUser = await _dbContext.Players
                .FirstOrDefaultAsync(p => p.UserId == userId && p.GameId == gameId);

            if (existsUser != null)
            {
                existsUser.Role = role;
                await _dbContext.SaveChangesAsync();
                
                Console.WriteLine($"Role - {existsUser.Role}");
                
                return existsUser;
            }

            var addedUser = await _dbContext.Players
                .AddAsync(new Player
                {
                    Nickname = "player",
                    UserId = userId,
                    GameId = gameId,
                    Role = role
                });

            await _dbContext.SaveChangesAsync();

            Console.WriteLine($"Role - {addedUser.Entity.Role}");
            
            return addedUser.Entity;
        }

        public async Task<Player> AddPlayer(Player player)
        {
            if (player == null)
                throw new ArgumentNullException("Cant add new player. Player cannot by null");
            
            var addedPlayer = await _dbContext.Players.AddAsync(player);
            await _dbContext.SaveChangesAsync();

            return addedPlayer.Entity;
        }

        public async Task<GetPlayerResponse> GetPlayerById(int id)
        {
            var player = await _dbContext.Players.FirstOrDefaultAsync(p => p.Id == id);
            if (player == null)
                throw new ArgumentNullException("Not found player by id");

            return new GetPlayerResponse 
            {
                Id = player.Id,
                Nickname = player.Nickname,
                UserId = player.UserId,
                Role = player.Role
            };
        }

        public async Task<PlayerDTO> Update(PlayerDTO player)
        {
            var existsPlayer = await _dbContext.Players
                .FirstOrDefaultAsync(p => p.Id == player.Id);

            if (existsPlayer == null)
                throw new ArgumentException("Player not found");

            existsPlayer.Nickname = player.Nickname;

            await _dbContext.SaveChangesAsync();
            
            return new PlayerDTO
            {
                Id = existsPlayer.Id,
                Nickname = existsPlayer.Nickname,
                Role = existsPlayer.Role
            };
        }
    }
}
