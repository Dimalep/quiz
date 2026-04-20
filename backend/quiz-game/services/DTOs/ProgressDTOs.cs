using domains.domains;

namespace services.DTOs;

#region ПОДУМАТЬ
public record ProgressState
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public int GameId { get; set; }
    public int CurrentQuestionIndex { get; set; } = 0;
    public int QuantityQuestions { get; set; } = 0;
    public int QuantityCompletedQuestions { get; set; } = 0;
    public DateTime StartAt { get; set; }
    public DateTime CompleteAt { get; set; }
    public ProgressStatus Status { get; set; } = ProgressStatus.waiting;
    public PlayerQuizResult QuizResult { get; set; } = new();
}

public class QuizResultDto
{
    public int QuizId { get; set; }
    public int QuantityCorrectAnswers { get; set; }
    public bool IsFinished { get; set; }

    public List<QuestionDto> Questions { get; set; } = new();
}

public class QuestionDto
{
    public int Index { get; set; }
    public string QuestionId { get; set; } = null!;
    public string? QuestionText { get; set; }

    public List<AnswerDto> Answers { get; set; } = new();
}

public class AnswerDto
{
    public string AnswerId { get; set; } = null!;
    public string? AnswerText { get; set; }
    public bool IsCorrect { get; set; }
}
#endregion


public record ProgressForAdmin
{
    public PlayerDTO Player { get; set; } = null!;
    public int QuantityRemainedQuestions { get; set; }
    public int QuantityAnsweredQuestions { get; set; }
    public int QuantityCorrectAnswers { get; set; }
    public int CurrentQuestionIndex { get; set; }
    public ProgressStatus Status { get; set; }
}

public record ProgressForPlayer
{
    public int ProgressId { get; set; }
    public ProgressStatus Status { get; set; }
    public int CurrentQuestionIndex { get; set; }
    public int QuantityQuestions { get; set; }
    public int QuantityCompletedQuestions { get; set; }
}

#region Player progress

public record PlayerProgress
{
    public int Id { get; set; }
    public ProgressStatus Status { get; set; }
    public List<QuestionResultHistory>? QuestionResultHistory { get; set; }
}

public record QuestionResultHistory
{
    public string Id { get; set; } = null!;
    public List<AnswerResultHistory>? AnswerResultHistory { get; set; }
}

public record AnswerResultHistory
{
    public string Id { get; set; } = null!;
    public string? Text { get; set; }
}

#endregion

#region Answer

public record ToAnswerProgressRequest
{
    public int PlayerId { get; set; }
    public string SessionKey { get; set; } = null!;
    public string QuestionId { get; set; } = null!;
    public string[] AnswersIds { get; set; } = null!;
    public int QuizId { get; set; }
    public int GameId { get; set; }
}
public record ToAnswerProgressResponse
{
    public Question? Question { get; set; }
    public Progress Progress { get; set; } = null!;
}

#endregion

#region Current player progress

public record CurrentPlayerProgress
{
    //next question
    public Question? Question { get; set; }
    
    //current player progress
    public Progress? Progress { get; set; }
}

#endregion
