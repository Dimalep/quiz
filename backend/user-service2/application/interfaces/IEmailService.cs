using application.DTOs.auth;

namespace application.interfaces
{
    public interface IEmailService
    {
        public Task SendAsync(string to);
        public Task<AuthByEmailResponse> Confirmation(AuthByEmailResquest req);
    }
}
