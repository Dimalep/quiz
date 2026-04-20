namespace domains.domains
{
    public class Progress
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

        public Game Game { get; set; } = null!;
        public Player Player { get; set; } = null!;
    }

    public class PlayerQuizResult
    {
        public int QuizId { get; set; }
        public int QuantityCorrectAnswers { get; set; }
        public bool IsFinished { get; set; }

        public List<QuestionResult> Questions { get; set; } = new();
    }
    
    public class QuestionResult
    {
        public int Index { get; set; }
        public string QuestionId { get; set; } = null!;
        public int Complexity { get; set; }
        public int QuestionIndex { get; set; }
        public string QuestionText { get; set; } = null!;

        public List<AnswerResult> Answers { get; set; } = new();
    }

    public class AnswerResult
    {
        public string AnswerId { get; set; } = null!;
        public int AnswerIndex { get; set; }
        public string AnswerText { get; set; } = null!;
        public bool IsCorrect { get; set; }
    }

    public enum ProgressStatus
    {
        waiting,
        in_game,
        completed,
    }

}
