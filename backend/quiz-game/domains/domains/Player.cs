namespace domains.domains
{
    public class Player
    {
        public int Id { get; set; }
        public string? Nickname { get; set; }
        public string Role { get; set; } = null!;
        public int UserId { get; set; }
        public Game Game { get; set; } = null!;
        public int GameId { get; set; }

        //public ICollection<Progress> Progresses { get; set; } = new List<Progress>();
    }
}
