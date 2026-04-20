using domains.domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace database.entity_configuration
{
    public class PlayerConfiguration : IEntityTypeConfiguration<Player>
    {
        public void Configure(EntityTypeBuilder<Player> builder)
        {
            builder.ToTable("players");

            builder.HasKey(el => el.Id);

            builder.Property(el => el.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

            builder.Property(el => el.Nickname)
                .HasColumnName("nickname");

            builder.Property(el => el.Role)
                .HasColumnName("role");

            builder.Property(el => el.UserId)
                .HasColumnName("user_id");

            builder.Property(el => el.GameId)
                .HasColumnName("game_id");

            builder.HasOne(el => el.Game)
                .WithMany()
                .HasForeignKey(el => el.GameId);
        }
    }
}
