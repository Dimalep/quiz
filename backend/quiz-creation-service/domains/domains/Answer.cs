using System.ComponentModel.DataAnnotations.Schema;

namespace domains.domains
{
    [Table("answers")]
    public class Answer
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("text")]
        public string Text { get; set; } = null!;

        [Column("is_correct")]
        public bool IsCorrect { get; set; }

        [Column("question_id")]
        public int QuestionId { get; set; }

        [ForeignKey("QuestionId")]
        public Question Question { get; set; } = null!;
    }
}
