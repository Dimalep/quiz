namespace services.DTOs
{
    public record QuizDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int QuantityQuestions { get; set; }
    }

    public record QuizWithQuestionsIds
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int QuantityQuestions { get; set; }
        public ICollection<int> QuestionsIds { get; set; } = null!;
    }
}
