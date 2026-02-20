namespace services.DTOs
{
    public class QuizSessionDTO
    {
        public int Id { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime CompleteAt { get; set; }
        public string Key { get; set; } = null!;
        public int QuizId { get; set; }
    }
}
