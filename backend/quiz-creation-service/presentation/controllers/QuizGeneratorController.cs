using Microsoft.AspNetCore.Mvc;
using services.interfaces;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/generator")]
    public class QuizGeneratorController(IQuizGeneratorService quizGeneratorService) : ControllerBase
    {
        [HttpPost("by-thema")]
        public async Task<IActionResult> GenerateQuizByThema(string thema)
        {
            var res = await quizGeneratorService.GenerateQuizByThema(thema); 
            return Ok(res);
        }
    }
}
