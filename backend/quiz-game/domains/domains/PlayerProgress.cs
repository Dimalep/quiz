using System.ComponentModel.DataAnnotations.Schema;

namespace domains.domains
{
    [Table("player_progress")]
    public class PlayerProgress
    {
        [ForeignKey("QuizSessionId")]
        public QuizSession QuizSession { get; set; } = null!;

        [Column("quiz_session_id")]
        public int QuizSessionId { get; set; }
    }
}
