using application.interfaces;
using domain.models;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text;

using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using application.DTOs.jwt;

namespace application.services
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly JwtOptionsDTO _jwtOptions;

        public JwtTokenService(IOptions<JwtOptionsDTO> jwtOptions) 
        {
            _jwtOptions = jwtOptions.Value;
        }    

        public string GenerateAccessToken(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken
            (
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtOptions.AccessTokenLifetimeMinutes),
                signingCredentials: creds  
            );

            Console.WriteLine($"Issuer from JwtOptionsDTO: {_jwtOptions.Issuer}");

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public ClaimsPrincipal? GetPrincipalFromToken(string jwtToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtOptions.key);

            try
            {
                var principal = tokenHandler.ValidateToken(jwtToken,
                    new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = _jwtOptions.Issuer,

                        ValidateAudience = true,
                        ValidAudience = _jwtOptions.Audience,

                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),

                        ValidateLifetime = false,
                    }, out _);

                return principal;
            }catch
            {
                return null;
            }

        }

        public string GenerateRefreshToken() 
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        }
    }
}
