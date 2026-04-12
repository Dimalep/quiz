using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace domains.domains
{
    [Table("players")]
    public class Player
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("nickname")]
        public string Nickname { get; set; } = string.Empty;

        [Column("role")]
        public string Role { get; set; } = null!;

        [Column("user_id")]
        public int UserId { get; set; }

        [ForeignKey("GameId ")]
        public Game Game { get; set; } = null!;

        [Column("game_id")]
        public int GameId { get; set; }
    }
}
