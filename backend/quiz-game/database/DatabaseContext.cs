using database.entity_configuration;
using domains.domains;
using Microsoft.EntityFrameworkCore;

namespace database;

public class DatabaseContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Game> Games { get; set; }
    public DbSet<Player> Players { get; set; }
    public DbSet<Progress> Progresses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new GameConfiguration());
        modelBuilder.ApplyConfiguration(new PlayerConfiguration());
        modelBuilder.ApplyConfiguration(new ProgressConfiguration());
    }
}
