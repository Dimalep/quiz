namespace application.DTOs.auth
{
    public record AuthRequest
    {
        // email or username
        public string Value { get; set; } = null!;
        public string Password { get; set; } = null!;
        
        public int UserId { get; set; }
    }
}
