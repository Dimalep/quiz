using domains.domains;
using Microsoft.EntityFrameworkCore;

namespace database;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions options): base(options) { }

    public DbSet<QuizSession> QuizSessions { get; set; }
    public DbSet<Player> Players { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
