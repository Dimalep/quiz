using Microsoft.AspNetCore.Mvc;
using services.DTOs;
using services.interfaces;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/quizzes")]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;

        public QuizController(IQuizService quizService) 
        {
            _quizService = quizService;
        }

        [HttpPost("create_new_empty_quiz")]
        public async Task<IActionResult> AddQuiz()
        {
            var result = await _quizService.CreateEmptyQuiz();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddQuiz([FromBody] QuizDTO quizDTO)
        {
            var result = await _quizService.AddQuiz(quizDTO);
            return Ok(result);
        }

        [HttpDelete("{quizId}")]
        public async Task<IActionResult> DeleteQuiz([FromRoute] int quizId)
        {
            var result = await _quizService.DeleteQuizById(quizId);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateQuiz([FromBody] QuizDTO quizDTO)
        {
            var result = await _quizService.UpdateQuiz(quizDTO);
            return Ok(result);
        }

        [HttpGet("{quizId}")]
        public async Task<IActionResult> GetById([FromRoute] int quizId)
        {
            var result = await _quizService.GetQuizById(quizId);
            return Ok(result);
        }
    }
}
