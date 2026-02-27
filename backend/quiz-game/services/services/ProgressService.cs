using database;
using domains.domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.grpc;
using services.interfaces;

namespace services.services;

public class ProgressService(
    DatabaseContext _dbContext,
    QuizGrpcServiceClient _quizGrpc ) : IProgressService
{   
    public async Task<ProgressDTO> AddAnswer(string sessionKey, QuestionResult answer, int progressId)
    {
        var updatingProgress = await _dbContext.PlayerProgresses
            .FirstOrDefaultAsync(p => p.Id == progressId);

        if (updatingProgress == null)
            throw new ArgumentException("Progress not found");

        updatingProgress.QuizResult.Questions.Add(answer);
        //updatingProgress.QuizResult.
        throw new NotImplementedException();
    }

    public async Task<Progress> UpdateProgress(Progress progress)
    {
        var updatingProgress = await _dbContext.PlayerProgresses
            .FirstOrDefaultAsync(p => p.Id == progress.Id);

        if (updatingProgress != null)
        {
            _dbContext.Entry(updatingProgress).CurrentValues.SetValues(progress);
            await _dbContext.SaveChangesAsync();
            return updatingProgress;
        }

        throw new ArgumentException("Progress not found");
    }

    public async Task<Progress> AddPlayerProgress(int playerId, string sessionKey)
    {
        var player = await _dbContext.Players.FirstOrDefaultAsync(p => p.Id == playerId);
        if (player == null)
            throw new ArgumentNullException("Not found player by playerId");

        var quizSession = await _dbContext.Games.FirstOrDefaultAsync(qs => qs.Key == sessionKey);
        if (quizSession == null)
            throw new ArgumentNullException("Not found quiz session by sessionId");
        
        var playerProgress = new Progress
        {
            PlayerId = playerId,
            SessionId = quizSession.Id,
            StartAt = DateTime.UtcNow
        };

        var addedPlayerProgress = await _dbContext.AddAsync(playerProgress);
        await _dbContext.SaveChangesAsync();

        return addedPlayerProgress.Entity;
    }
}