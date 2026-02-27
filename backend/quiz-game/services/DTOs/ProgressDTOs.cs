using domains.domains;

namespace services.DTOs;

public record ProgressDTO
{
    public int Id { get; set; }
    public PlayerDTO Player { get; set; } = null!;
    public int SessionId { get; set; }
    public int CurrentQuestionIndex { get; set; }
    public int QuantityQuestion { get; set; }
    public DateTime StartAt { get; set; }
    public DateTime CompleteAt { get; set; }
}   
