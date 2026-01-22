using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace domain.models
{
    [Table("users")]
    public class User
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }


        [Column("username")]
        public string Username { get; set; } = string.Empty;
        [Column("email")]
        public string Email { get; set; } = string.Empty;
        [Column("phone")]
        public string Phone {  get; set; } = string.Empty;
        [Column("password")]
        public string Password {  get; set; } = string.Empty;


        [Column("create_at")]
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
        [Column("update_at")]
        public DateTime UpdateAt { get; set; }

        [Column("lastname")]
        public string Lastname { get; set; } = string.Empty;
        [Column("firstname")]
        public string Firstname { get; set; } = string.Empty;
        [Column("middlename")]
        public string Middlename { get; set; } = string.Empty;

        public bool IsRegistered { get; set; } = false;
    }
}
