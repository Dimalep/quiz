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

        services.AddScoped<IAnswerService, AnswerService>();
        services.AddScoped<IQuestionService, QuestionService>();
        services.AddScoped<IQuizService, QuizService>();

        services.AddSingleton<Mapper>();

        return services;
    }
}
