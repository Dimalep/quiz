using database;
using domains.domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.grpc;
using services.interfaces;

namespace services.services;

public class ProgressService(DatabaseContext _dbContext) : IProgressService
{
    public async Task<Progress> Start(int playerId, string sessionKey)
    {
        var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.Key == sessionKey);
        if (game == null)
            throw new ArgumentException("Game is null");
        
        var progress = await _dbContext.PlayerProgresses
            .Include(p => p.Player)
            .FirstOrDefaultAsync(p => p.SessionId == game.Id && p.PlayerId == playerId);
        if (progress == null)
            throw new ArgumentException("Progress not found");

        progress.Status = ProgressStatus.in_game;
        
        await _dbContext.SaveChangesAsync();
        return progress;
    }

    public async Task<Progress> Finish(int playerId, string sessionKey)
    {
        var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.Key == sessionKey);
        if (game == null)
            throw new ArgumentException("Game is null");
        
        var progress = await _dbContext.PlayerProgresses
            .Include(p => p.Player)
            .FirstOrDefaultAsync(p => p.SessionId == game.Id && p.PlayerId == playerId);
        if (progress == null)
            throw new ArgumentException("Progress not found");

        progress.Status = ProgressStatus.completed;
        await _dbContext.SaveChangesAsync();
        
        return progress;
    }

    public async Task<Progress> AddAnswer(string sessionKey, QuestionResult answer, int progressId)
    {
        var updatingProgress = await _dbContext.PlayerProgresses
            .FirstOrDefaultAsync(p => p.Id == progressId);

        if (updatingProgress == null)
            throw new ArgumentException("Progress not found");
        
        updatingProgress.QuizResult.Questions.Add(answer);
        updatingProgress.QuizResult.QuantityCorrectAnswers =
            updatingProgress.QuizResult.Questions.Count(q => q.IsCorrect);

        await _dbContext.SaveChangesAsync();
        return updatingProgress;
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

    public async Task<Progress?> GetBySessionKeyAndPlayerId(string sessionKey, int playerId)
    {
        var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.Key == sessionKey);
        if (game == null)
            throw new ArgumentException("Game is null");
        
        var progress = await _dbContext.PlayerProgresses
            .Include(p => p.Player)
            .FirstOrDefaultAsync(p => p.SessionId == game.Id && p.PlayerId == playerId);
        
        return progress;
    }

    public async Task<Progress> CreateProgress(int playerId, string sessionKey)
    {
        var existsProgress = await  GetBySessionKeyAndPlayerId(sessionKey, playerId);
        if (existsProgress != null)
            return existsProgress;
        
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
            StartAt = DateTime.UtcNow,
            Status = ProgressStatus.waiting,
        };

        var addedPlayerProgress = await _dbContext.AddAsync(playerProgress);
        await _dbContext.SaveChangesAsync();

        return addedPlayerProgress.Entity;
    }
    
    
}