using domains.domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace database.entity_configuration
{
    public class GameConfiguration : IEntityTypeConfiguration<Game>
    {
        public void Configure(EntityTypeBuilder<Game> builder)
        {
            builder.ToTable("games");

            builder.HasKey(el => el.Id);

            builder.Property(el => el.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

            builder.Property(el => el.CreateAt)
                .HasColumnName("create_at");

            builder.Property(el => el.StartAt)
                .HasColumnName("start_at");

            builder.Property(el => el.CompleteAt)
                .HasColumnName("complete_at");

            builder.Property(el => el.Key)
                .HasColumnName("key");

            builder.Property(el => el.QuizId)
                .HasColumnName("quiz_id");

            builder.Property(el => el.Status)
                .HasColumnName("status");

            builder.Property(el => el.UserId)
                .HasColumnName("user_id");
        }
    }
}
