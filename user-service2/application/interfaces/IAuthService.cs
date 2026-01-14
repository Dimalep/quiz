using application.DTOs.auth;

namespace application.interfaces
{
    public interface IAuthService
    {
        public Task<ResponseDTO> Login(LogRequestDTO req);
        public Task<ResponseDTO> Registrate(RegRequestDTO req);
        public Task<ResponseDTO> Refresh(string refreshToken);
        public Task Logout(string refreshToken); 
    }
}
