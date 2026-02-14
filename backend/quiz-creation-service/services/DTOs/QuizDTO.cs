namespace services.DTOs
{
    public record QuizDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Type { get; set; } = null!;
        public int QuantityQuestions { get; set; }
    }
}
