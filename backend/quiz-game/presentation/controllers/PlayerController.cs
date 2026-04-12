using domains.domains;
using Microsoft.AspNetCore.Mvc;
using services.DTOs;
using services.interfaces;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/players")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playService;
        
        public PlayerController(IPlayerService playerService) 
        {
            _playService = playerService;
        }

        [HttpPost]
        public async Task<IActionResult> AddPlayer([FromBody] Player player) 
        {
            var result = await _playService.AddPlayer(player);
            return Ok(result);
        }

        [HttpGet("{playerId}")]
        public async Task<IActionResult> GetPlayerById([FromRoute] int playerId)
        {
            var result = await _playService.GetPlayerById(playerId);
            return Ok(result);
        }
        [HttpGet("userId={userId}/gameId={gameId}/role={role}")]
        public async Task<IActionResult> GetOrCreatePlayer([FromRoute] int userId, int gameId, string role)
        {
            var result = await _playService.GetOrCreatePlayer(userId, gameId, role);
            return Ok(result);
        }
        
        [HttpGet("game_id={gameId}/user_id={userId}")]
        public async Task<IActionResult> GetPlayerByGameIdAndUserId([FromRoute] int gameId, int userId)
        {
            var result = await _playService.GetPlayerByGameIdAndUserId(gameId, userId);
            return Ok(result);
        }
    }
}
