using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace domains.domains
{
    [Table("quiz_sessions")]
    public class QuizSession
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("create_at")]
        public DateTime CreateAt {get; set;}

        [Column("start_at")]
        public DateTime StartAt { get; set;}

        [Column("complete_at")]
        public DateTime CompleteAt { get; set; }

        [Column("key")]
        public string Key { get; set; } = null!;

        [Column("quiz_id")]
        public int QuizId { get; set;}

        [Column("status")]
        public Status Status{ get; set; } = Status.inactive;
    }

    public enum Status
    {
        active,
        inactive,
        game
    }
}
