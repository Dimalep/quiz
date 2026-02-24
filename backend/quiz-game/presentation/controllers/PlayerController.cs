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
        public async Task<IActionResult> AddPlayer([FromBody] AddPlayerRequest request) 
        {
            var result = await _playService.AddPlayer(request);
            return Ok(result);
        }

        [HttpGet("{playerId}")]
        public async Task<IActionResult> GetPlayerById([FromRoute] int playerId)
        {
            var result = await _playService.GetPlayerById(playerId);
            return Ok(result);
        }
    }
}
