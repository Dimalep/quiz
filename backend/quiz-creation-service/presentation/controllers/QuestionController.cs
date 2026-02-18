using Microsoft.AspNetCore.Mvc;
using services.DTOs;
using services.interfaces;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/questions")]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionService _questionService;

        public QuestionController(IQuestionService questionService) 
        {
            _questionService = questionService;
        }

        [HttpPost]
        public async Task<IActionResult> AddQuestion([FromBody] QuestionDTO questionDTO)
        {
            var result = await _questionService.AddQuestion(questionDTO);
            return Ok(result);
        }

        [HttpPut("batch")]
        public async Task<IActionResult> AddQuestions([FromBody] ICollection<QuestionDTO> questionDTOs)
        {
            var result = await _questionService.UpdateQuestions(questionDTOs);
            return Ok(result);
        }

        [HttpDelete("{questionId}")]
        public async Task<IActionResult> DeleteQuestionById([FromRoute] int questionId)
        {
            var result = await _questionService.DeleteQuestionById(questionId);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateQuestion([FromBody] QuestionDTO questionDTO)
        {
            var result = await _questionService.UpdateQuestion(questionDTO);
            return Ok(result);
        }

        [HttpGet("{questionId}")]
        public async Task<IActionResult> GetQuestionById([FromRoute] int questionId)
        {
            var result = await _questionService.GetQuestionById(questionId);
            return Ok(result);
        }

        [HttpGet("by-quiz/{quizId}")]
        public async Task<IActionResult> GetQuestionsByQuizId([FromRoute] int quizId)
        {
            var result = await _questionService.GetQuestionsByQuizId(quizId);
            return Ok(result);
        }
    }
}
