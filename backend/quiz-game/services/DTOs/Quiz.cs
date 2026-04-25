namespace services.DTOs;

#region ORIGINAL QUIZ
public class Quiz
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    
    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;
    
    public int QuantityQuestions { get; set; }

    public List<Question> Questions { get; set; } = new();
}

public class Question
{
    public string Id { get; set; } = null!;
    public int Index { get; set; }
    public string Text { get; set; } = null!;
    public string Type { get; set; } = null!;
    public int Complexity { get; set; }
    public string? ImageUrl { get; set; }
    public List<Answer> Answers { get; set; } = new();
}

public class Answer
{
    public string Id { get; set; } = null!;
    public int Index { get; set; }
    public string Text { get; set; } = null!;
    public bool IsCorrect { get; set; }
}
#endregion


#region HISTORY
public record QuizHistory
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int QuantityQuestion { get; set; }
}
#endregion