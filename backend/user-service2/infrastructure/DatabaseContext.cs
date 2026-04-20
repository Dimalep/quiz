using domain.models;
using infrastructure.entity_configurations;
using Microsoft.EntityFrameworkCore;

namespace infrastructure;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) 
    : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Session> Sessions { get; set; }
    
    // need to stick it in redis
    public DbSet<EmailCode> EmailCodes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("app");
        
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new SessionConfiguration());
        modelBuilder.ApplyConfiguration(new EmailCodeConfiguration());
        
        base.OnModelCreating(modelBuilder);
    }
}
