using domain.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.entity_configurations;

public class SessionConfiguration : IEntityTypeConfiguration<Session>
{
    public void Configure(EntityTypeBuilder<Session> builder)
    {
        builder.ToTable("sessions");

        builder.HasKey(el => el.Id);

        builder.Property(el => el.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(el => el.UserId)
            .HasColumnName("user_id");

        builder.Property(el => el.RefreshToken)
            .HasColumnName("refresh_token");

        builder.Property(el => el.CreateAt)
            .HasColumnName("create_at");

        builder.Property(el => el.ExpiresAt)
            .HasColumnName("expires_at");

        builder.Property(el => el.IsRevoked)
            .HasColumnName("is_revoked");

        builder.Property(el => el.LastUsedAt)
            .HasColumnName("last_used_at"); 
        
        builder.HasOne(el => el.User)
            .WithMany()
            .HasForeignKey(el => el.UserId);
    }
}