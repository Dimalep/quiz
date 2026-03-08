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
}