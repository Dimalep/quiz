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
        
        [Column("session_id")]
        public int SessionId { get; set; }
        
        [Column("current_question_index")]
        public int CurrentQuestionIndex { get; set; } = 0;
        
        [Column("start_at")]
        public DateTime StartAt { get; set; }
        
        [Column("complete_at")]
        public DateTime CompleteAt { get; set; }
        
        
        [Column("quiz_result", TypeName="jsonb")]
        public PlayerQuizResult QuizResult { get; set; } = new();
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
        public int QuestionId { get; set; }

        [JsonPropertyName("question")] public string Question { get; set; } = null!;
        
        [JsonPropertyName("answerId")]
        public int AnswerId { get; set; }

        [JsonPropertyName("answer")] public string Answer { get; set; } = null!;
        
        [JsonPropertyName("isCorrect")]
        public bool IsCorrect { get; set; }
    }
}
