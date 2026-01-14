namespace application.exceptions
{
    public class ConflictException : Exception
    {
        public string Code { get; } = null!;

        public ConflictException(string message, string code = "conflict") : base(message)
        {
            Code = code;
        }
    }
}
