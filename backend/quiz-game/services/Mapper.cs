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
                Key = game.Key,
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
                Key = gameDto.Key,
                Status = gameDto.Status
            };
        }
    }
}
