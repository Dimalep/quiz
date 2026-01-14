namespace application.DTOs
{
    public record UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }

        public string Lastname { get; set; } = string.Empty;
        public string Firstname { get; set; } = string.Empty;
        public string Middlename { get; set; } = string.Empty;
    }
}
