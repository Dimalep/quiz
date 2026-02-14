using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace infrastructure
{
    public static class ServicesCollectionExtentions
    {
        public static IServiceCollection AddUserDbContext(this IServiceCollection services, string? connectionString)
        {
            services.AddDbContext<DatabaseContext>(options =>
                options.UseNpgsql(connectionString)
            );

            return services;
        }
    }
}
    