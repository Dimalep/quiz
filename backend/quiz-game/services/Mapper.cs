using domains.domains;
using services.DTOs;

namespace services
{
    public class Mapper
    {
        public GameDTO ToDTO(Game game)
        {
            return new GameDTO 
            {
                Id = game.Id,
                CreateAt = game.CreateAt,
                CompleteAt = game.CompleteAt,
                QuizId = game.QuizId,
                sessionKey = game.sessionKey,
                Status = game.Status
            };
        }

        public Game FromDTO(GameDTO gameDto)
        {
            return new Game
            {
                Id = gameDto.Id,
                CreateAt = gameDto.CreateAt,
                CompleteAt = gameDto.CompleteAt,
                QuizId = gameDto.QuizId,
                sessionKey = gameDto.sessionKey,
                Status = gameDto.Status
            };
        }
        
        public PlayerProgress ToPlayerProgress(Progress progress)
        {
            return new PlayerProgress
            {
                Id = progress.Id,
                Status = progress.Status,
                QuestionResultHistory = progress.QuizResult.Questions
                    .Select(q => new QuestionResultHistory
                    {
                        Id = q.QuestionId,
                        AnswerResultHistory = q.Answers
                            .Select(a => new AnswerResultHistory
                            {
                                Id = a.AnswerId,
                                Text = a.AnswerText
                            })
                            .ToList()
                    })
                    .ToList()
            };
        }
    }
}
