namespace domains.domains
{
    public class Game
    {
        public int Id { get; set; }
        public DateTime CreateAt {get; set;}
        public DateTime StartAt { get; set;}
        public DateTime CompleteAt { get; set; }
        public string Key { get; set; } = null!;
        public int QuizId { get; set;}
        public Status Status{ get; set; } = Status.opened;
        public int UserId { get; set; }

        //public ICollection<Player> Players = new List<Player>();
        //public ICollection<Progress> Progresses = new List<Progress>();
    }

    public enum Status
    {
        opened,
        closed,
        launched,
        completed
    }
}
