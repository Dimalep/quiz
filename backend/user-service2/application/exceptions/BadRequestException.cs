namespace application.exeptions
{
    public class BadRequestException : Exception
    {
        public string Code { get; } = null!;

        public BadRequestException(string message, string code = "bad_request") : base(message)
        {
            Code = code;
        }
    }
}
