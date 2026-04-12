using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using services.interfaces;

namespace presentation.controllers;

[ApiController]
[Route("api/progresses")]
public class ProgressController(IProgressService progressService) : ControllerBase
{
    [HttpGet("{progressId}")]
    public async Task<IActionResult> GetProgressBySessionKeyAndPlayerId([FromRoute] int progressId )
    {
        var result = await progressService.GetById(progressId);
        return Ok(result);
    }

    [HttpGet("session_key={sessionKey}")]
    public async Task<IActionResult> GetProgressesBySessionKey([FromRoute] string sessionKey)
    {
        var result = await progressService.GetProgressesBySessionKey(sessionKey);
        return Ok(result);
    }
    
    [HttpGet("progress_id={progressId}")]
    public async Task<IActionResult> GetProgressById([FromRoute] int progressId)
    {
        var result = await progressService.GetById(progressId);
        return Ok(result);
    }

    [HttpGet("player_id={playerId}/game_id={gameId}")]
    public async Task<IActionResult> GetProgressByPlayerIdAndGameId([FromRoute] int playerId, int gameId)
    {
        var result = await progressService
            .GetProgressByPlayerIdAndGameId(playerId, gameId);
        
        return Ok(result);
    }
}