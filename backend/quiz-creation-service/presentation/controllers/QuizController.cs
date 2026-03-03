using domains.domains;
using Microsoft.AspNetCore.Mvc;
using services.interfaces;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/quizzes")]
    public class QuizController(IQuizService quizService) : ControllerBase
    {
        [HttpPost("create_new_empty_quiz")]
        public async Task<IActionResult> CreateNewEmptyQuiz()
        {
            var result = await quizService.CreateEmptyQuiz();
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateQuiz([FromBody] Quiz quiz)
        {
            var result = await quizService.UpdateQuiz(quiz);
            return Ok(result);
        }

        [HttpGet("{quizId}")]
        public async Task<IActionResult> GetQuizById([FromRoute] int quizId)
        {
            var result = await quizService.GetQuizById(quizId);
            return Ok(result);
        }

        [HttpGet("get-short/{quizId}")]
        public async Task<IActionResult> GetShortQuizById([FromRoute] int quizId)
        {
            var result = await quizService.GetShortQuizById(quizId);
            return Ok(result);
        }

        // [HttpPost]
        // public async Task<IActionResult> AddQuiz([FromBody] QuizDTO quizDTO)
        // {
        //     var result = await _quizService.AddQuiz(quizDTO);
        //     return Ok(result);
        // }
        //
        // [HttpDelete("{quizId}")]
        // public async Task<IActionResult> DeleteQuiz([FromRoute] int quizId)
        // {
        //     var result = await _quizService.DeleteQuizById(quizId);
        //     return Ok(result);
        // }
        //
        // [HttpPut]
        // public async Task<IActionResult> UpdateQuiz([FromBody] QuizDTO quizDTO)
        // {
        //     var result = await _quizService.UpdateQuiz(quizDTO);
        //     return Ok(result);
        // }
        //
        // [HttpGet("{quizId}")]
        // public async Task<IActionResult> GetById([FromRoute] int quizId)
        // {
        //     var result = await _quizService.GetQuizById(quizId);
        //     return Ok(result);
        // }
        //
        // [HttpGet("with-questions-ids/{quizId}")]
        // public async Task<IActionResult> GetWithQuestionsIdsById([FromRoute] int quizId)
        // {
        //     var result = await _quizService.GetWithQuestionsIdsById(quizId);
        //     Console.WriteLine(result);
        //     return Ok(result);
        // }
    }
}
