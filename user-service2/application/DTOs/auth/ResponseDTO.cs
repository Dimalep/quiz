namespace application.DTOs.auth
{
    public record ResponseDTO
    {
        public int UserId { get; set; }
        public string AccessToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!; 
    }
}
