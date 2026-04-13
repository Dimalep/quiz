using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace domains.domains
{
    [Table("progresses")]
    public class Progress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        
        [Column("player_id")]
        public int PlayerId { get; set; }

        [ForeignKey("PlayerId")] 
        public Player Player { get; set; } = null!;
        
        [Column("game_id")]
        public int GameId { get; set; }
        
        [ForeignKey("GameId")]
        public Game Game { get; set; }
        
        [Column("current_question_index")]
        public int CurrentQuestionIndex { get; set; } = 0;

        [Column("quantity_questions")]
        public int QuantityQuestions { get; set; } = 0;
    
        [Column("quantity_completed_questions")]
        public int QuantityCompletedQuestions { get; set; } = 0;
        
        [Column("start_at")]
        public DateTime StartAt { get; set; }
        
        [Column("complete_at")]
        public DateTime CompleteAt { get; set; }

        [Column("status")]
        public ProgressStatus Status { get; set; } = ProgressStatus.waiting;
        
        public PlayerQuizResult QuizResult { get; set; } = new();
    }

    public enum ProgressStatus
    {
        waiting,
        in_game,
        completed,
    }
    
    public class PlayerQuizResult
    {
        [JsonPropertyName("quizId")]
        public int QuizId { get; set; }
        
        [JsonPropertyName("quantityCorrectAnswers")]
        public int QuantityCorrectAnswers { get; set; }

        [JsonPropertyName("questions")]
        public List<QuestionResult> Questions { get; set; } = new();
    }
    
    public class QuestionResult
    {
        [JsonPropertyName("questionId")]
        public string QuestionId { get; set; }
        
        [JsonPropertyName("complexity")]
        public int Complexity { get; set; }
        
        [JsonPropertyName("questionIndex")]
        public int QuestionIndex { get; set; }

        [JsonPropertyName("questionText")] 
        public string QuestionText { get; set; } = null!;
        
        [JsonPropertyName("answers")]
        public List<AnswerResult> Answers { get; set; } = new();
    }

    public class AnswerResult
    {
        [JsonPropertyName("answerId")]
        public string AnswerId { get; set; }
        
        [JsonPropertyName("answerIndex")]
        public int AnswerIndex { get; set; }

        [JsonPropertyName("answerText")] 
        public string AnswerText { get; set; } = null!;
        
        [JsonPropertyName("isCorrect")]
        public bool IsCorrect { get; set; }
    }
}
