namespace application.DTOs
{
    // Main user DTO (without password)
    public record UserDTO
    {
        public int Id { get; init; }
        public string? Username { get; init; }
        public string? Email { get; init; }
        public DateTime CreateAt { get; init; }
        public DateTime UpdateAt { get; init; }
        public bool IsRegistered { get; init; } 
    }

    // DTO for update user data
    public record EditUserRequest
    {
        public string? Username { get; init; }
        public string? Password { get; init; }
    }
}
