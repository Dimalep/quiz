using domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace database
{
    public static class ServicesCollectionExtentions
    {
        public static IServiceCollection AddQuizCreationDbContext(this IServiceCollection services, string? connectionString)
        {
            services.AddDbContext<DatabaseContext>(options => options.UseNpgsql(connectionString));
            return services;
        }
    }
}
