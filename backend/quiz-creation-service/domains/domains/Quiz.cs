using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace domains.domains
{
    // [Table("quizzes")]
    // public class Quiz
    // {
    //     [Column("id")]
    //     [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    //     public int Id { get; set; }
    //
    //     [Column("title")]
    //     public string Title { get; set; } = null!;
    //
    //     [Column("description")]
    //     public string Description { get; set; } = null!;
    //
    //     [Column("quantity_questions")]
    //     public int QuantityQuestions { get; set; }
    // }
    
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

        [Column("questions")]
        public List<Question> Questions { get; set; } = new();
    }

    public class Question
    {
        public int Index { get; set; }
        public string Text { get; set; } = null!;
        public string Type { get; set; } = "buttons";
        public List<Answer> Answers { get; set; } = new();
    }

    public class Answer
    {
        public int Index { get; set; }
        public string Text { get; set; } = null!;
        public bool IsCorrect { get; set; }
    }
}
