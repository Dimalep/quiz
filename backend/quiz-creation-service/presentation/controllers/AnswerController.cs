using Microsoft.AspNetCore.Mvc;
using services.DTOs;
using services.interfaces;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/answers")]
    public class AnswerController : ControllerBase
    {
        private IAnswerService _answerService;

        public AnswerController(IAnswerService answerService) 
        {
            _answerService = answerService;
        }

        [HttpPost]
        public async Task<IActionResult> AddAnwer([FromBody] AnswerDTO answerDTO)
        {
            var result = await _answerService.AddAnswer(answerDTO);
            return Ok(result);
        }

        [HttpPut("batch")]
        public async Task<IActionResult> UpdateAnwers([FromBody] ICollection<AnswerDTO> answerDTOs)
        {
            var result = await _answerService.UpdateAnswers(answerDTOs);
            return Ok(result);
        }

        [HttpDelete("{answerId}")]
        public async Task<IActionResult> DeleteAnwerById([FromRoute] int answerId)
        {
            var result = await _answerService.DeleteAnswerById(answerId);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAnswer([FromBody] AnswerDTO answerDTO)
        {
            var result = await _answerService.UpdateAnswer(answerDTO);
            return Ok(result);
        }

        [HttpGet("{answerId}")]
        public async Task<IActionResult> GetAnswerById([FromRoute] int answerId)
        {
            var result = await _answerService.GetAnswerById(answerId);
            return Ok(result);
        }

        [HttpGet("by-question/{questionId}")]
        public async Task<IActionResult> GetAnswersByQuestionId([FromRoute] int questionId)
        {
            var result = await _answerService.GetAnswerById(questionId);
            return Ok(result);
        }
    }
}
