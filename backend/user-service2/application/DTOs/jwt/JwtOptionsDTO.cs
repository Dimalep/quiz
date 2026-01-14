namespace application.DTOs.jwt
{
    public class JwtOptionsDTO
    {
        public string Issuer { get; set; } = null!;
        public string Audience { get; set;  } = null!;
        public string key { get; set; } = null!;
        public int AccessTokenLifetimeMinutes { get; set; }
    }
}
