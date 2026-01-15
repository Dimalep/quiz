namespace application.exceptions
{
    public class InvalidDataException : Exception
    {
        public string Code { get; } = null!;
        public InvalidDataException(string message, string code = "invalid_data") : base(message)
        {
            Code = code;
        }
    }
}
