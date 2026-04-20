using application.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController(IUserService userService) : Controller
    {
        [AllowAnonymous]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(int userId)
        {
            var user = await userService.GetById(userId);

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("generateAnonUser")]
        public async Task<IActionResult> AddAnonymusUser()
        {
            var result = await userService.AddAnonUser();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("generate-anon-user")]
        public async Task<IActionResult> GenerateAnonUser()
        {
            var res = await userService.GenerateAnonUser();
            return Ok(res);
        }
    }
}
