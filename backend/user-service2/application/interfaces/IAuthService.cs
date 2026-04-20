using application.DTOs.auth;

namespace application.interfaces
{
    public interface IAuthService
    {
        public Task<AuthResponse> AuthByEmail(AuthByEmailResquest req);
        public Task<AuthResponse> Login(AuthRequest req);
        public Task<AuthResponse> Registration(AuthRequest req);

        public Task<AuthResponse> Refresh(string refreshToken);
        public Task Logout(string refreshToken); 
    }
}