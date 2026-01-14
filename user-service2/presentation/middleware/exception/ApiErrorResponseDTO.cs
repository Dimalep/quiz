namespace presentation.middleware.exception
{
    public class ApiErrorResponseDTO
    {
        public int StatusCode { get; set; }
        public string Code { get; set; } = null!;
        public string Message { get; set; } = null!;
    }
}
