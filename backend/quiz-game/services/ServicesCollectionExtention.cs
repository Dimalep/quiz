using database;
using Grpc.Net.Client;
using Microsoft.Extensions.DependencyInjection;
using services.grpc;
using services.interfaces;
using services.services;

namespace services;

public static class ServicesCollectionExtention
{
    public static IServiceCollection AddServices(this IServiceCollection services, string quizCreationAddress, string? connectionString)
    {
        services.AddDatabaseContext(connectionString);

        var channel = GrpcChannel.ForAddress(quizCreationAddress);
        services.AddSingleton<QuizGrpcServiceClient>(new QuizGrpcServiceClient(channel));

        services.AddScoped<IGameService, GameService>();
        services.AddScoped<IPlayerService, PlayerService>();
        services.AddScoped<IProgressService, ProgressService>();
        services.AddSingleton<Mapper>();

        return services;
    }
}
