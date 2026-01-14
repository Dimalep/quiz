namespace application.interfaces
{
    public interface IPasswordService
    {
        public string Hash(string password);
        public bool Verify(string password, string actualPassword);
    }
}
