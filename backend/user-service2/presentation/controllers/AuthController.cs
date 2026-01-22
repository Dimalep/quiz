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

        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginByUsername([FromBody] LogRequestDTO req)
        {
            var res = await authService.Login(req);

            return Ok(res);
        }

        [AllowAnonymous]
        [HttpPost("registrate")]
        public async Task<IActionResult> RegistrateByUsername([FromBody] RegRequestDTO req)
        {
            var res = await authService.Registrate(req);

            return Ok(res);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] string refreshToken)
        {
            var res = await authService.Refresh(refreshToken);

            return Ok(res);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] string refreshToken)
        {
            await authService.Logout(refreshToken);
            return Ok();
        }
    }
}
 