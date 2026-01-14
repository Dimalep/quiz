using application.interfaces;
using System.Security.Cryptography;

namespace application.services
{
    public class PasswordService : IPasswordService
    {
        private const int SaltSize = 16;
        private const int KeySize = 32;
        private const int Iterations = 100_000;

        public string Hash(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(SaltSize);

            var hash = Rfc2898DeriveBytes.Pbkdf2
            (
                password,
                salt,
                Iterations,
                HashAlgorithmName.SHA256,
                KeySize
            );

            return $"{Iterations}.{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}";
        }

        public bool Verify(string password, string actualPassword)
        {
            var parts = actualPassword.Split('.');
            if(parts.Length != 3) 
                return false;

            var iterations = int.Parse(parts[0]);
            var salt = Convert.FromBase64String(parts[1]);
            var hash = Convert.FromBase64String(parts[2]);

            var computedHash = Rfc2898DeriveBytes.Pbkdf2
            (
                password,
                salt, 
                iterations,
                HashAlgorithmName.SHA256,
                hash.Length
            );

            return CryptographicOperations.FixedTimeEquals(hash, computedHash);
        }
    }
}
