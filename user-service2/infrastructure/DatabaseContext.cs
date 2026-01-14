using domain.models;
using Microsoft.EntityFrameworkCore;

namespace infrastructure;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {}

    public DbSet<User> Users { get; set; }
    public DbSet<Session> Sessions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
