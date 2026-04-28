using domain.models;

namespace application.DTOs.auth
{
    /// <summary>
    /// Default auth response
    /// </summary>
    public record AuthResponse
    {
        public User User { get; set; } = null!;
        public string AccessToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!; 
    }
}
