using application.enums;

namespace application.DTOs.auth
{

    public record RegRequestDTO
    {
        public AuthType AuthType { get; set; }
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
