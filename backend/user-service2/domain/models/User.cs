namespace domain.models
{
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password {  get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdateAt { get; set; }
        public string? Lastname { get; set; }
        public string? Firstname { get; set; }
        public bool IsRegistered { get; set; } = false;
    }
}
