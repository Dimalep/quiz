using domains.domains;

namespace services.DTOs
{
    public record QuizSessionDTO
    {
        public int Id { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime CompleteAt { get; set; }
        public string Key { get; set; } = null!;
        public int QuizId { get; set; }
        public Status Status { get; set; }
    }

    public record QuizSessionResponse 
    {
        public int Id { get; set; }
        public string SessionKey { get; set; } = null!;
    }
}
