using domains.domains;

namespace services.DTOs
{
    public record PlayerDTO
    {
        public int Id {  get; set; }
        public string Nickname { get; set; } = null!;
        public string Role { get; set; } = null!;
    }

    // For add new player to quiz
    public record AddPlayerRequest
    {
        public string Nickname { get; set; } = null!;
        public string QuizSessionKey { get; set; } = null!;
        public int UserId { get; set; }
        public string Role { get; set; } = null!;
    }

    public record GetPlayerResponse
    {
        public int Id { get; set; }
        public string Nickname { get; set; } = null!;
        public int UserId { get; set; }
        public string Role { get; set; } = null!;
    }
}
