using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace database
{
    public static class ServicesCollectionExtention
    {
        public static IServiceCollection AddDatabaseContext(this IServiceCollection services, string? connectionString)
        {
            services.AddDbContext<DatabaseContext>(options => options.UseNpgsql(connectionString));
            return services;
        }
    }
}
