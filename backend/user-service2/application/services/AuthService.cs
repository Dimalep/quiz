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

        public async Task<AuthResponse> AuthByEmail(AuthByEmailResquest req)
        {
            User? user = new User();
            var registeredUser = await _userService.GetByEmail(req.Email);

            if(registeredUser == null)
            {
                user = await _userService.GetById(req.AnonUserId);

                if (user == null)
                    throw new Exception("Not found user");

                user.Email = req.Email;
                user.Username = req.Email;
                user.IsRegistered = true;

                await _userService.UpdateUser(user);
            }
            else
            {
                user = registeredUser;
            }

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

            return new AuthResponse()
            {
                // UserId = user.Id,
                User = user,
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthResponse> Login(AuthRequest req)
        {
            if (req == null)
                throw new BadRequestException("Argument cannot by null");

            var user = await _userService.GetByUsername(req.Value);

            if (user == null)
                throw new BadRequestException($"Не удалось найти пользователя с логином {req.Value}");
            
            // Check password
            if(!_passwordService.Verify(req.Password, user.Password))
                throw new exceptions.InvalidDataException("Неверный пароль");
                
            // Generate tokens
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

            return new AuthResponse() 
            {
                // UserId = user.Id,
                User = user,
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthResponse> Registration(AuthRequest req)
        {
            if (req == null)
                throw new BadRequestException("Request cannot by null");

            var existingUser = await _userService.GetByUsername(req.Value);

            if (existingUser != null)
                throw new ConflictException("Пользователь с таким логином уже занят");
            
            var user = await _userService.UpdateUser(new User
            {
                Id = req.UserId,
                Username = req.Value,
                Password = _passwordService.Hash(req.Password),
                IsRegistered = true
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
            
            return new AuthResponse()
            {
                // UserId = user.Id,
                User = user,
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthResponse> Refresh(string refreshToken)
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

                return new AuthResponse()
                {
                    // UserId = session.UserId,
                    User = user,
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
