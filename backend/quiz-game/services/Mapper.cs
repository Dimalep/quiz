using domains.domains;
using services.DTOs;

namespace services
{
    public class Mapper
    {
        public QuizSessionDTO ToDTO(QuizSession quizSession)
        {
            return new QuizSessionDTO 
            {
                Id = quizSession.Id,
                CreateAt = quizSession.CreateAt,
                CompleteAt = quizSession.CompleteAt,
                QuizId = quizSession.QuizId,
                Key = quizSession.Key,
            };
        }

        public QuizSession FromDTO(QuizSessionDTO quizSessionDTO)
        {
            return new QuizSession
            {
                Id = quizSessionDTO.Id,
                CreateAt = quizSessionDTO.CreateAt,
                CompleteAt = quizSessionDTO.CompleteAt,
                QuizId = quizSessionDTO.QuizId,
                Key = quizSessionDTO.Key,
            };
        }
    }
}
