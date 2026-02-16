using System.ComponentModel.DataAnnotations.Schema;

namespace domains.domains
{
    [Table("questions")]
    public class Question
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("title")]
        public string Title { get; set; } = null!;

        [Column("quiz_id")]
        public int QuizId { get; set; }

        [ForeignKey("QuizId")]
        public Quiz Quiz { get; set; } = null!;

        [Column("type")]
        public string Type { get; set; } = null!;

    }
}
