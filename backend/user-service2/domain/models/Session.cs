namespace domain.models
{
    public class Session
    {
        public int Id { get; set; }
        public string RefreshToken { get; set; } = null!;
        public bool IsRevoked { get; set; } = false;
        public DateTime CreateAt { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime LastUsedAt { get; set; }
        
        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
