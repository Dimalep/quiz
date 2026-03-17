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

        public async Task<PlayerDTO> AddPlayer(AddPlayerRequest addPlayerDTO)
        {
            var quizSession = await _dbContext.Games
                .FirstOrDefaultAsync(qs => qs.sessionKey == addPlayerDTO.QuizSessionKey);

            if (quizSession == null)
            {
                throw new ArgumentNullException("Not found quiz session by session key");
            }

            var existsPlayer = await _dbContext.Players
                .FirstOrDefaultAsync(p => p.UserId == addPlayerDTO.UserId);

            if(existsPlayer != null) 
            {
                existsPlayer.Nickname = addPlayerDTO.Nickname;
                existsPlayer.Role = addPlayerDTO.Role;
                existsPlayer.QuizSessionId = quizSession.Id;
                
                await _dbContext.SaveChangesAsync();
                return new PlayerDTO
                {
                    Id = existsPlayer.Id,
                    Role = existsPlayer.Role,
                    Nickname = existsPlayer.Nickname,
                };
            }

            var player = new Player
            {
                Nickname = addPlayerDTO.Nickname,
                QuizSessionId = quizSession.Id,
                UserId = addPlayerDTO.UserId,
                Role = addPlayerDTO.Role,
            };

            var addedPlayer = await _dbContext.Players.AddAsync(player);
            await _dbContext.SaveChangesAsync();

            return new PlayerDTO
            {
                Id = addedPlayer.Entity.Id,
                Nickname = addedPlayer.Entity.Nickname,
                Role = addedPlayer.Entity.Role,
            };
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
