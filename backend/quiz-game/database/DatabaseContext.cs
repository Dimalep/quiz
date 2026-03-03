using System.Text.Json;
using domains.domains;
using Microsoft.EntityFrameworkCore;

namespace database;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions options): base(options) { }

    public DbSet<Game> Games { get; set; }
    public DbSet<Player> Players { get; set; }
    public DbSet<Progress> PlayerProgresses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Progress>(entity =>
        {
            entity.OwnsOne(p => p.QuizResult, qr =>
            {
                qr.ToJson("quiz_result");

                qr.OwnsMany(q => q.Questions);
            });
        });
    }
}
