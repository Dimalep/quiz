    using domains.domains;
    using Microsoft.AspNetCore.Mvc;
    using services.interfaces;

    namespace presentation.controllers
    {
        [ApiController]
        [Route("api/quizzes")]
        public class QuizController(IQuizService quizService) : ControllerBase
        {
            [HttpDelete("{quizId}")]
            public async Task<IActionResult> DeleteQuizById([FromRoute] int quizId)
            {
                var result = await quizService.DeleteQuizById(quizId);
                return Ok(result);
            }
            
            [HttpGet("by-userid/{userId}")]
            public async Task<IActionResult> GetQuizzesByUserId([FromRoute] int userId)
            {
                var result = await quizService.GetQuizzesByUserId(userId);
                return Ok(result);
            }
            
            [HttpPost("create_new_empty_quiz/{userId}")]
            public async Task<IActionResult> CreateNewEmptyQuiz([FromRoute] int userId)
            {
                var result = await quizService.CreateEmptyQuiz(userId);
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

            [HttpGet("get-info-about-quiz/{quizId}")]
            public async Task<IActionResult> GetInfoAboudQuizByQuizId([FromRoute] int quizId)
            {
                var result = await quizService.GetInfoAboutQuizByQuizId(quizId);
                return Ok(result);
            }
        }
    }
