using application.enums;

namespace application.DTOs.auth
{
    public record LogRequestDTO
    {
        public AuthType AuthType { get; set; }
        public string Value { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
