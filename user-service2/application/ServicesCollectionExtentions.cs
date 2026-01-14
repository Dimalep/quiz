using application.interfaces;
using application.services;
using infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace application;

public static class ServicesCollectionExtentions
{
    public static IServiceCollection AddAppServices(this IServiceCollection services, string? connectionString)
    {
        services.AddUserDbContext(connectionString); //?

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IPasswordService, PasswordService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<ISessionService, SessionService>();

        return services;
    }
}
