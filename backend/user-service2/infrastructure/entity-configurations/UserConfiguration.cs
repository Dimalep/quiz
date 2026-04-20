using domain.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace infrastructure.entity_configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("users");
        
        builder.HasKey(el => el.Id);

        builder.Property(el => el.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(el => el.Username)
            .HasColumnName("username");

        builder.HasIndex(el => el.Username)
            .IsUnique()
            .HasFilter("\"username\" IS NOT NULL");

        builder.Property(el => el.Email)
            .HasColumnName("email");

        builder.Property(el => el.Password)
            .HasColumnName("password");

        builder.Property(el => el.CreateAt)
            .HasColumnName("create_at");

        builder.Property(el => el.UpdateAt)
            .HasColumnName("update_at");

        builder.Property(el => el.Firstname)
            .HasColumnName("firstname")
            .IsRequired(false);

        builder.Property(el => el.Lastname)
            .HasColumnName("lastname")
            .IsRequired(false);

        builder.Property(el => el.IsRegistered)
            .HasColumnName("is_registered");
    }
}