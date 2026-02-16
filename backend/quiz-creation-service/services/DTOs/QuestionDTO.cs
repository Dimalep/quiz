namespace services.DTOs
{
    public record QuestionDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public int QuizId { get; set; }
        public string Type { get; set; } = null!;
    }
}
