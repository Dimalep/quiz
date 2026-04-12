using domains.domains;
using services.DTOs;

namespace services.interfaces
{
    public interface IPlayerService
    {
        public Task<Player> AddPlayer(Player player);
        public Task<PlayerDTO> Update(PlayerDTO player);
        
        public Task<GetPlayerResponse> GetPlayerById(int id);
        public Task<Player?> GetPlayerByGameIdAndUserId(int gameId, int userId);
        
        public Task<Player> GetOrCreatePlayer(int userId, int gameId, string role);
    }
}
