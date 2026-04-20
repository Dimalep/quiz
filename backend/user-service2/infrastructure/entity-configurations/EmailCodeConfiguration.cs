using domain.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.entity_configurations;

public class EmailCodeConfiguration : IEntityTypeConfiguration<EmailCode>
{
    public void Configure(EntityTypeBuilder<EmailCode> builder)
    {
        builder.ToTable("email_codes");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(e => e.Email)
            .HasColumnName("email")
            .IsRequired();

        builder.Property(e => e.Code)
            .HasColumnName("code")
            .IsRequired();

        builder.Property(e => e.ExpireAt)
            .HasColumnName("expire_at")
            .IsRequired();

        builder.HasIndex(e => new { e.Email, e.Code });
    }
}