using Microsoft.AspNetCore.Mvc;
using services.interfaces;

namespace presentation.controllers
{
    [ApiController]
    [Route("api/quiz-sessions")]
    public class QuizSessionController : ControllerBase
    {
        private readonly IGameService _gameService;

        public QuizSessionController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpPost("{quizId}")]
        public async Task<IActionResult> AddQuizSession([FromRoute] int quizId)
        {
            var quizSession = await _gameService.Add(quizId);
            if (quizSession == null) throw new ArgumentNullException("Quiz session cannot by null");

            //var qr = _qrService.GenerateQrBase64($"http://localhost:5173/quiz/game/{quizSession.Key}");
            return Ok(quizSession);
        }

        [HttpGet("{sessionKey}")]
        public async Task<IActionResult> GetQuizSessionByKey([FromRoute] string sessionKey)
        {
            var result = await _gameService.GetQuizSessionByKey(sessionKey);
            return Ok(result);
        }
    }
}
