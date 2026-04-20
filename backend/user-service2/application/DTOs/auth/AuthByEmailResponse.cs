namespace application.DTOs.auth
{
    public class AuthByEmailResponse
    {
        public string Email { get; set; } = null!;
        public int AnonUserId { get; set;  }
    }
}
