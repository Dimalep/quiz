using database;
using Microsoft.Extensions.DependencyInjection;
using services.interfaces;
using services.services;

namespace services;

public static class ServicesCollectionExtentions
{
    public static IServiceCollection AddServices(this IServiceCollection services, string? connectionString)
    {
        services.AddQuizCreationDbContext(connectionString);

        services.AddScoped<IQuizService, QuizService>();
        //services.AddHttpClient<IQuizGeneratorService, QuizGeneratorService>(client =>
        //{
        //    client.BaseAddress = new Uri("https://openrouter.ai/api/v1");
        //});

        return services;
    }
}
