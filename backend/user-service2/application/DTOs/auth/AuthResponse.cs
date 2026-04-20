using domain.models;

namespace application.DTOs.auth
{
    public record AuthResponse
    {
        // public int UserId { get; set; }
        public User User { get; set; } = null!;
        public string AccessToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!; 
    }
}
