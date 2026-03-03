using domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace database
{
    public static class ServicesCollectionExtentions
    {
        public static IServiceCollection AddQuizCreationDbContext(this IServiceCollection services, string? connectionString)
        {   
            var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
            dataSourceBuilder.EnableDynamicJson(); // 🔥 ОБЯЗАТЕЛЬНО

            var dataSource = dataSourceBuilder.Build();
            
            services.AddDbContext<DatabaseContext>(options =>
                options.UseNpgsql(dataSource));
            
            return services;
        }
    }
}
