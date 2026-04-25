namespace services.DTOs
{
    public class AiQuizDto
    {
        public int UserId { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int QuantityQuestions { get; set; }
        public List<AiQuestionDto> Questions { get; set; } = new();
    }

    public class AiQuestionDto
    {
        public int Index { get; set; }
        public string Text { get; set; } = null!;
        public string Type { get; set; } = "buttons";
        public int Complexity { get; set; }
        public List<AiAnswerDto> Answers { get; set; } = new();
    }

    public class AiAnswerDto
    {
        public int Index { get; set; }
        public string Text { get; set; } = null!;
        public bool IsCorrect { get; set; }
    }
}
