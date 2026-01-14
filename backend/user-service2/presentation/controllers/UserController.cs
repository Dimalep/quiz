using application.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        public UserController(IUserService userService) 
        {
            this.userService = userService;
        }

        [Authorize]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(int userId)
        {
            var user = await userService.GetById(userId);

            return Ok(user);
        }
    }
}
