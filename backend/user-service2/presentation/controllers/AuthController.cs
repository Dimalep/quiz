using application.DTOs.auth;
using application.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly IEmailService _emailService;
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, IEmailService emailService, IUserService userService)
        {
            _authService = authService;
            _emailService = emailService;
            _userService = userService;
        }

        // Send code to email
        [AllowAnonymous]
        [HttpPost("send-code")]
        public async Task<IActionResult> SendCodeToEmail([FromBody] SendCodeRequest req)
        {
            // find anon user
            var existsUserById = await _userService.GetById(req.AnonUserId);
            if (existsUserById == null)
                throw new Exception("Error send code to email. Need refresh page and repeat");

            // find user by email
            var existsUserByEmail = await _userService.GetByEmail(req.Email);
            if (existsUserByEmail == null)
            {
                existsUserById.Email = req.Email;
                existsUserById.IsRegistered = true;
            }

            await _emailService.SendAsync(req.Email);

            return Ok();
        }

        // confirm email by code
        [AllowAnonymous]
        [HttpPost("confirmation")]
        public async Task<IActionResult> ConfirmationEmail([FromBody] AuthByEmailResquest req)
        {
            var authByEmailResponse = await _emailService.Confirmation(req);

            var result = await _authService.AuthByEmail(req);

            Console.WriteLine($"User id: {result.User.Id}\nUser email{result.User.Email}");

            return Ok(result);
        }

        // login to system
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginByUsername([FromBody] AuthRequest req)
        {
            var res = await _authService.Login(req);
            return Ok(res);
        }

        [AllowAnonymous]
        [HttpPost("registrate")]
        public async Task<IActionResult> RegistrateByUsername([FromBody] AuthRequest req)
        {
            var res = await _authService.Registration(req);
            return Ok(res);
        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] string refreshToken)
        {
            var res = await _authService.Refresh(refreshToken);
            return Ok(res);
        }

        [AllowAnonymous]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] string refreshToken)
        {
            await _authService.Logout(refreshToken);
            return Ok();
        }
    }
}
 