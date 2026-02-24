using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace domains.domains
{
    [Table("players")]
    public class Player
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("login")]
        public string Nickname { get; set; } = string.Empty;

        [Column("role")]
        public string Role { get; set; } = null!;

        [Column("user_id")]
        public int UserId { get; set; }

        [ForeignKey("QuizSessionId")]
        public QuizSession QuizSession { get; set; } = null!;

        [Column("quiz_session_id")]
        public int QuizSessionId { get; set; }
    }

    //public enum Role {
    //    admin,
    //    player
    //}
}
