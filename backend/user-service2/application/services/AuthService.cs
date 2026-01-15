using application.DTOs.auth;
using application.exceptions;
using application.exeptions;
using application.interfaces;
using domain.models;

namespace application.services
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly IPasswordService _passwordService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly ISessionService _sessionService;

        public AuthService(IUserService userService, IPasswordService passwordService, IJwtTokenService jwtTokenService, ISessionService sessionService) 
        {
            _userService = userService;
            _passwordService = passwordService;
            _jwtTokenService = jwtTokenService;
            _sessionService = sessionService;
        }

        public async Task<ResponseDTO> Login(LogRequestDTO req)
        {
            if (req == null)
                throw new BadRequestException("Argument cannot by null");

            User? user = new User();

            switch (req.AuthType)
            {
                case enums.AuthType.Username: 
                    user = await _userService.GetByUsername(req.Value); 
                    break;
                case enums.AuthType.Emal: 
                    user = await _userService.GetByEmail(req.Value);
                    break;
                case enums.AuthType.Phone: 
                    user = await _userService.GetByPhone(req.Value);
                    break;
                default:
                    throw new UnauthorizedAccessException("Error");
            }

            if (user == null)
                throw new ArgumentException("Cannot find user");

            bool verify = _passwordService.Verify(req.Password, user.Password);

            if (verify)
            {
                string accessToken = _jwtTokenService.GenerateAccessToken(user);
                string refreshToken = _jwtTokenService.GenerateRefreshToken();

                await _sessionService.Add(new Session()
                {
                    User = user,
                    UserId = user.Id,
                    RefreshToken = refreshToken,
                    LastUsedAt = DateTime.UtcNow,
                    CreateAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddDays(15)
                });

                return new ResponseDTO() 
                {
                    UserId = user.Id,
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };
            }
            else
            {
                throw new exceptions.InvalidDataException("Invalid data");
            }

        }

        public async Task<ResponseDTO> Registrate(RegRequestDTO req)
        {
            if (req == null)
                throw new BadRequestException("Request cannot by null");

            var existingUser = await _userService.GetByUsername(req.Username);

            if (existingUser != null)
                throw new exceptions.ConflictException("User already exists");


            var user = await _userService.AddUser(new User()
            {
                Username = req.Username,
                Password = _passwordService.Hash(req.Password)
            });

            string accessToken = _jwtTokenService.GenerateAccessToken(user);
            string refreshToken = _jwtTokenService.GenerateRefreshToken();

            await _sessionService.Add(new Session()
            {
                User = user,
                UserId = user.Id,
                RefreshToken = refreshToken,
                LastUsedAt = DateTime.UtcNow,
                CreateAt = DateTime.UtcNow,
            });

            return new ResponseDTO()
            {
                UserId = user.Id,
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<ResponseDTO> Refresh(string refreshToken)
        {
            Session? session = await _sessionService.GetByRefreshToken(refreshToken);

            if (session != null)
            {
                User user = session.User;

                string newAccessToken = _jwtTokenService.GenerateAccessToken(user);
                string newRefreshToken = _jwtTokenService.GenerateRefreshToken();

                session.RefreshToken = newRefreshToken;
                session.LastUsedAt = DateTime.UtcNow;
                session.ExpiresAt = DateTime.UtcNow.AddDays(7);

                await _sessionService.Update(session);

                return new ResponseDTO()
                {
                    UserId = session.UserId,
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                };
            }
            else 
                throw new ConflictException("Cannot find session by refreshToken");
        }

        public async Task Logout(string refreshToken)
        {
            var session = await _sessionService.GetByRefreshToken(refreshToken);
            if (session != null)
            {
                session.IsRevoked = true;
                session.LastUsedAt = DateTime.UtcNow;
                await _sessionService.Update(session);
            }
        }
    }
}
