using domain.models;
using System.Security.Claims;

namespace application.interfaces
{
    public interface IJwtTokenService
    {
        string GenerateAccessToken(User user);
        public string GenerateRefreshToken();
        ClaimsPrincipal? GetPrincipalFromToken(string jwtToken);
    }
}
