using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using services.interfaces;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/games")]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;

        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [AllowAnonymous]
        [HttpGet("userid={userId}")]
        public async Task<IActionResult> GetGamesByUserId([FromRoute] int userId)
        {
            var res = await _gameService.GetGamesByUserId(userId);
            return Ok(res);
        }

        [AllowAnonymous]
        [HttpGet("quizid={quizId}/userid={userId}")]
        public async Task<ActionResult> GetGameByQuizIdAndUserId([FromRoute] int quizId, [FromRoute] int userId)
        {
            var result = await _gameService.GetGameByQuizIdAndUserId(quizId, userId);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("quizid={quizId}/userid={userId}")]
        public async Task<IActionResult> AddQuizSession([FromRoute] int quizId, [FromRoute] int userId)
        {
            var result = await _gameService.Add(quizId, userId);
            
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("{sessionKey}")]
        public async Task<IActionResult> GetQuizSessionByKey([FromRoute] string sessionKey)
        {
            var result = await _gameService.GetQuizSessionByKey(sessionKey);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("init/{quizId}/{userId}")]
        public async Task<IActionResult> InitialGame([FromRoute] int quizId, [FromRoute] int userId)
        {
            var result = await _gameService.InitialGame(quizId, userId);
            return Ok(result);
        }
    }
}
