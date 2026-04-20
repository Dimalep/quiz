namespace application.DTOs.auth
{
    public record SendCodeRequest
    {
        public string Email { get; set; } = null!;
        public int AnonUserId { get; set; }
    }
}
