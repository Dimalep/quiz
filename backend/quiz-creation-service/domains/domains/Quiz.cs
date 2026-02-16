using System.ComponentModel.DataAnnotations.Schema;

namespace domains.domains
{
    [Table("quizzes")]
    public class Quiz
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("title")]
        public string Title { get; set; } = null!;

        [Column("description")]
        public string Description { get; set; } = null!;

        [Column("quantity_questions")]
        public int QuantityQuestions { get; set; }
    }
}
