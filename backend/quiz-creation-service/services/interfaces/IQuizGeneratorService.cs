using domains.domains;

namespace services.interfaces
{
    public interface IQuizGeneratorService
    {
        public Task<Quiz> GenerateQuizByThema(string thema);
    }
}
