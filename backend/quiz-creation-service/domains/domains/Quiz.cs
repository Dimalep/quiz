using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace domains.domains
{
    [Table("quizzes")]
    public class Quiz
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("title")]
        public string Title { get; set; } = null!;

        [Column("description")]
        public string Description { get; set; } = null!;

        [Column("quantity_questions")]
        public int QuantityQuestions { get; set; }

        [Column("questions")]
        public List<Question> Questions { get; set; } = new();
    }

    public class Question
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public int Index { get; set; }
        public string Text { get; set; } = null!;
        public string Type { get; set; } = "buttons";
        public int Complexity { get; set; }
        public List<Answer> Answers { get; set; } = new();
    }

    public class Answer
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public int Index { get; set; }
        public string Text { get; set; } = null!;
        public bool IsCorrect { get; set; }
    }
}
