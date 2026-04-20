namespace application.DTOs.auth
{
    public class AuthByEmailResquest
    {
        public string Email { get; set; } = null!;
        public string Code { get; set; } = null!;
        public int AnonUserId { get; set; }
    }
}
