using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace domain.models
{
    [Table("sessions")]
    public class Session
    {
        [Column("id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        [Column("refresh_token")]
        public string RefreshToken { get; set; } = null!;

        [Column("create_at")]
        public DateTime CreateAt { get; set; }
        [Column("expires_at")]
        public DateTime ExpiresAt { get; set; }

        [Column("is_revoked")]
        public bool IsRevoked { get; set; } = false;

        [Column("last_used_at")]
        public DateTime LastUsedAt { get; set; }
    }
}
