using Microsoft.AspNetCore.Mvc;
using services.interfaces;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/quiz-sessions")]
    public class QuizSessionController : ControllerBase
    {
        private readonly IQuizSessionService _quizSessionService;
        //private readonly IQrService _qrService;

        public QuizSessionController(IQuizSessionService quizSessionService)
        {
            //_qrService = qrService;
            _quizSessionService = quizSessionService;
        }

        [HttpPost("{quizId}")]
        public async Task<IActionResult> AddQuizSession([FromRoute] int quizId)
        {
            var quizSession = await _quizSessionService.AddQuizSession(quizId);
            if (quizSession == null) throw new ArgumentNullException("Quiz session cannot by null");

            //var qr = _qrService.GenerateQrBase64($"http://localhost:5173/quiz/game/{quizSession.Key}");
            return Ok(quizSession);
        }
    }
}
