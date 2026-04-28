using database;
using Microsoft.Extensions.DependencyInjection;
using services.interfaces;
using services.services;
using System.Net.Http.Headers;

namespace services;

public static class ServicesCollectionExtentions
{
    public static IServiceCollection AddServices(this IServiceCollection services, string? connectionString)
    {
        services.AddQuizCreationDbContext(connectionString);

        services.AddScoped<IQuizService, QuizService>();
        services.AddHttpClient<IQuizGeneratorService, QuizGeneratorService>(client =>
        {
            client.BaseAddress = new Uri("https://openrouter.ai");

            client.DefaultRequestHeaders.Add("HTTP-Referer", "http://localhost");
            client.DefaultRequestHeaders.Add("X-Title", "QuizApp");

            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", "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");
        }).ConfigureHttpClient(client =>
        {
            client.Timeout = TimeSpan.FromMinutes(5);
        });

        return services;
    }
}
