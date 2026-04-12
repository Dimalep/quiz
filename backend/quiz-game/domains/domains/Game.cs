using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace domains.domains
{
    [Table("games")]
    public class Game
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
        public string sessionKey { get; set; } = null!;

        [Column("quiz_id")]
        public int QuizId { get; set;}

        [Column("status")]
        public Status Status{ get; set; } = Status.opened;
        
        //owner
        [Column("user_id")]
        public int UserId { get; set; }
    }

    public enum Status
    {
        opened,
        closed,
        launched,
        completed
    }
}
