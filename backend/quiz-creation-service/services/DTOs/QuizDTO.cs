namespace services.DTOs
{
    public record ShortQuiz
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int QuantityQuestions { get; set; }
    }

    public record LightQuiz
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int QuantityQuestions { get; set; }
        public List<string> QuestionsIds { get; set; }
    }
}
