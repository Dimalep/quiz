using domains.domains;
using services.DTOs;

namespace services
{
    public class Mapper
    {
        #region Map quiz
        public QuizDTO ToDTO(Quiz quiz)
        {
            return new QuizDTO
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Description = quiz.Description,
                QuantityQuestions = quiz.QuantityQuestions,
            };
        }

        public Quiz FromDTO(QuizDTO quizDTO)
        {
            return new Quiz
            {
                Id = quizDTO.Id,
                Title = quizDTO.Title,
                Description = quizDTO.Description,
                QuantityQuestions = quizDTO.QuantityQuestions,
            };
        }
        #endregion

        #region Map question
        public QuestionDTO ToDTO(Question question)
        {
            return new QuestionDTO
            {
                Id = question.Id,
                Title = question.Title,
                QuizId = question.QuizId,
                Type = question.Type,
            };
        }

        public Question FromDTO(QuestionDTO questionDTO)
        {
            return new Question
            {
                Id = questionDTO.Id,
                Title = questionDTO.Title,
                QuizId = questionDTO.QuizId,
                Type = questionDTO.Type,
            };
        }
        #endregion

        #region Map answer
        public AnswerDTO ToDTO(Answer answer)
        {
            return new AnswerDTO
            {
                Id = answer.Id,
                Text = answer.Text,
                IsCorrect = answer.IsCorrect,
                QuestionId = answer.QuestionId,
            };
        }

        public Answer FromDTO(AnswerDTO answerDTO)
        {   
            return new Answer
            {
                Id = answerDTO.Id,
                Text = answerDTO.Text,
                IsCorrect = answerDTO.IsCorrect,
                QuestionId= answerDTO.QuestionId,
            };
        }
        #endregion
    }
}
