using services.DTOs;

namespace services.interfaces
{
    public interface IPlayerService
    {
        public Task<PlayerDTO> AddPlayer(AddPlayerRequest addPlayerDTO);
        public Task<GetPlayerResponse> GetPlayerById(int id);
    }
}
