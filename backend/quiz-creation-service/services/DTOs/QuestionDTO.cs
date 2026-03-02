namespace services.DTOs
{
    public record QuestionDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public int QuizId { get; set; }
        public string Type { get; set; } = null!;
    }

    public record QuestionWithAnswers
    {
        public int QuestionId { get; set; }
        public string Title { get; set; } = null!;
        public string Type { get; set; } = null!;
        public ICollection<AnswerDTO> Answers { get; set; } = null!;
    }

}
