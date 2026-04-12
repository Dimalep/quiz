using database;
using domains.domains;
using Microsoft.EntityFrameworkCore;
using services.DTOs;
using services.grpc;
using services.interfaces;

namespace services.services;

public class ProgressService(DatabaseContext _dbContext, QuizGrpcServiceClient quizGrpcServiceClient) : IProgressService
{
    public async Task<Progress> Start(int playerId, string sessionKey)
    {
        var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.sessionKey == sessionKey);
        if (game == null)
            throw new ArgumentException("Game is null");
        
        var progress = await _dbContext.Progresses
            .Include(p => p.Player)
            .FirstOrDefaultAsync(p => p.GameId == game.Id && p.PlayerId == playerId);
        
        if (progress == null)
            throw new ArgumentException("Progress not found");

        progress.Status = ProgressStatus.in_game;
        
        await _dbContext.SaveChangesAsync();
        return progress;
    }

    public async Task<Progress> Finish(int playerId, string sessionKey)
    {
        var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.sessionKey == sessionKey);
        if (game == null)
            throw new ArgumentException("Game is null");
        
        var progress = await _dbContext.Progresses
            .Include(p => p.Player)
            .FirstOrDefaultAsync(p => p.GameId == game.Id && p.PlayerId == playerId);
        if (progress == null)
            throw new ArgumentException("Progress not found");

        progress.Status = ProgressStatus.completed;
        await _dbContext.SaveChangesAsync();
        
        return progress;
    }

    public async Task<ICollection<Progress>> Restart(int gameId)
    {
        var progresses = await _dbContext.Progresses
            .Include(p => p.Player)
            .Where(p => p.GameId == gameId)
            .ToListAsync();
            
        foreach (var progress in progresses)
        {
            progress.Status = ProgressStatus.waiting;
        }

        await _dbContext.SaveChangesAsync();
        
        return progresses;
    }

    public async Task<Progress> AddAnswer(string sessionKey, QuestionResult answer, int playerId)
    {   
        var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.sessionKey == sessionKey);
        if (game == null)
            throw new ArgumentNullException("Not found game by session key");

        var quiz = await quizGrpcServiceClient.GetQuizByIdAsync(game.QuizId);
        
        var progress = await _dbContext.Progresses
            .Include(p => p.Player)
            .ThenInclude(p => p.Game)
            .FirstOrDefaultAsync(p => p.PlayerId == playerId && p.GameId == game.Id);
 
        if (progress == null)
            throw new ArgumentException("Progress not found");
        
        var existing = progress.QuizResult.Questions.FirstOrDefault(q => q.QuestionIndex == answer.QuestionIndex);
        if (existing != null)
        {
            existing.Answers = answer.Answers;
        }
        else
        {
            progress.QuizResult.Questions.Add(answer);
            progress.QuantityCompletedQuestions = +1;
        }

        int countCorrectAnswers = progress.QuizResult.Questions
            .Count(q => q.Answers.All(a => a.IsCorrect));

        progress.QuizResult.QuantityCorrectAnswers = countCorrectAnswers;
        
        //?
        progress.CurrentQuestionIndex 
            = quiz.QuantityQuestions > progress.CurrentQuestionIndex ? progress.CurrentQuestionIndex + 1 : progress.CurrentQuestionIndex;
        //
        
        await _dbContext.SaveChangesAsync();
        
        return progress;
    }

    public async Task<Progress?> GetById(int progressId)
    {
        var progress = await _dbContext.Progresses
            .Include(p => p.Game)
            .Include(p => p.Player)
            .FirstOrDefaultAsync(p => p.Id == progressId);
        
        Console.WriteLine($"Current progress id: {progress.Id}");
        
        return progress;
    }

    public Task<Progress?> GetProgressByPlayerIdAndGameId(int playerId, int gameId)
    {
        return _dbContext.Progresses
            .FirstOrDefaultAsync(p => p.PlayerId == playerId && p.GameId == gameId);
    }

    public async Task<ICollection<ProgressForAdmin>> GetProgressesBySessionKey(string sessionKey)
    {
        var progresses = await _dbContext.Progresses
            .Include(p => p.Game)
            .Where(p => p.Game.sessionKey == sessionKey)
            .Select(p => new ProgressForAdmin
            {
                CurrentQuestionIndex = p.CurrentQuestionIndex,
                Player = new PlayerDTO
                {
                    Id = p.Player.Id,
                    Nickname = p.Player.Nickname,
                    Role = p.Player.Role
                },
                Status = p.Status,
                QuantityRemainedQuestions = p.QuantityCompletedQuestions,
                QuantityCorrectAnswers = p.QuizResult.QuantityCorrectAnswers
            })
            .ToListAsync();

        return progresses;
    }

    public async Task<Progress> UpdateProgress(Progress progress)
    {
        var updatingProgress = await _dbContext.Progresses
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
        var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.sessionKey == sessionKey);
        if (game == null)
            throw new ArgumentException("Game is null");
        
        var progress = await _dbContext.Progresses
            .Include(p => p.Player)
            .FirstOrDefaultAsync(p => p.GameId == game.Id && p.PlayerId == playerId);
        
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

        var game = await _dbContext.Games.FirstOrDefaultAsync(qs => qs.sessionKey == sessionKey);
        if (game == null)
            throw new ArgumentNullException("Not found quiz session by sessionId");

        var quiz = await quizGrpcServiceClient.GetQuizByIdAsync(game.QuizId);
        
        var playerProgress = new Progress
        {
            PlayerId = playerId,
            Player = player,
            GameId = game.Id,
            Status = ProgressStatus.waiting,
            QuantityQuestions = quiz.QuantityQuestions,
        };

        var addedPlayerProgress = await _dbContext.AddAsync(playerProgress);
        await _dbContext.SaveChangesAsync();

        return addedPlayerProgress.Entity;
    }
    
    
}