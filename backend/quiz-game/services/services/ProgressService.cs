using database;
using domains.domains;
using Microsoft.EntityFrameworkCore;
using services.Cache;
using services.DTOs;
using services.grpc;
using services.interfaces;

namespace services.services;

public class ProgressService(DatabaseContext _dbContext, QuizGrpcServiceClient quizGrpcServiceClient, QuizCacheService quizCacheService) : IProgressService
{
    // The player starts his game *new
    public async Task<CurrentPlayerProgress> PlayerStarted(int playerId, string sessionKey)
    {
        // find game
        var game = await _dbContext.Games
            .FirstOrDefaultAsync(g => g.sessionKey == sessionKey);

        if (game == null)
            throw new Exception($"Cannot find game by session key {sessionKey}");

        var playerProgress = await _dbContext.Progresses
            .Include(pr => pr.Player)
            .FirstOrDefaultAsync(pr => pr.GameId == game.Id && pr.PlayerId == playerId);

        if (playerProgress == null)
            throw new Exception($"Not found player progress by game id {game.Id} and by player id {playerId}");
        
        // Set status in_game
        playerProgress.Status = ProgressStatus.in_game;

        await _dbContext.SaveChangesAsync();
        
        // Load first question
        var currentQuiz = await quizCacheService.GetOrLoad(game.QuizId);
        if (currentQuiz == null)
            throw new Exception($"Cannot find quiz by quiz id {game.QuizId}");
        
        var firstQuestion = currentQuiz.Questions.First();
        
        // Return
        return new CurrentPlayerProgress
        {
            Question = firstQuestion,
            Progress = playerProgress,
        };
    }
    
    // Deleted
    // // The player starts his game *old
    // public async Task<Progress> Start(int playerId, string sessionKey)
    // {
    //     var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.sessionKey == sessionKey);
    //     if (game == null)
    //         throw new ArgumentException("Game is null");
    //     
    //     var progress = await _dbContext.Progresses
    //         .Include(p => p.Player)
    //         .FirstOrDefaultAsync(p => p.GameId == game.Id && p.PlayerId == playerId);
    //     
    //     if (progress == null)
    //         throw new ArgumentException("Progress not found");
    //
    //     progress.Status = ProgressStatus.in_game;
    //     
    //     await _dbContext.SaveChangesAsync();
    //     return progress;
    // }

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

    public async Task<ToAnswerProgressResponse> ToAnswer(ToAnswerProgressRequest toAnswerProgressRequest)
    {
        Question? nextQuestion = null;

        // Get quiz from cache
        var quiz = await quizCacheService.GetOrLoad(toAnswerProgressRequest.QuizId);
        if (quiz == null)
            throw new Exception($"Quiz by id {toAnswerProgressRequest.QuizId} not found");
        
        // find question
        var question = quiz.Questions
            .FirstOrDefault(q => q.Id == toAnswerProgressRequest.QuestionId);
        
        if (question == null)
            throw new Exception($"Question by id {toAnswerProgressRequest.QuestionId} not found");

        // find answers 
        var answerIds = toAnswerProgressRequest.AnswersIds.ToHashSet();

        var playerAnswers = question.Answers
            .Where(a => answerIds.Contains(a.Id))
            .ToList();
        
        // find current player progress
        var progress = await _dbContext.Progresses
            .Include(p => p.Player)
            .ThenInclude(p => p.Game)
            .FirstOrDefaultAsync(p => p.PlayerId == toAnswerProgressRequest.PlayerId && p.GameId == toAnswerProgressRequest.GameId);

        if (progress == null)
            throw new Exception(
                $"Error to answer. Progress by player id {toAnswerProgressRequest.PlayerId} and game id {toAnswerProgressRequest.GameId} not found");

        // forming question result
        var answers = playerAnswers
            .Select(a => new AnswerResult
            {
                AnswerId = a.Id,
                AnswerIndex = a.Index,
                AnswerText = a.Text,
                IsCorrect = a.IsCorrect
            }).ToList();

        var questionResult = new QuestionResult
        {
            Index = progress.QuizResult.Questions.Any()
                ? progress.QuizResult.Questions.Max(q => q.Index) + 1
                : 1,
            Answers = answers,
            Complexity = question.Complexity,
            QuestionId = question.Id,
            QuestionIndex = question.Index,
            QuestionText = question.Text
        };
        
        var existsQuestionResult = progress.QuizResult
            .Questions
            .FirstOrDefault(q => q.QuestionId == toAnswerProgressRequest.QuestionId);

        if (existsQuestionResult != null)
        {
            existsQuestionResult.Answers = answers;

            // count question where all answers correct 
            progress.QuizResult.QuantityCorrectAnswers = progress.QuizResult.Questions
                .Count(q => q.Answers.All(a => a.IsCorrect));

            await _dbContext.SaveChangesAsync();

             var nextAnsweredQuizResult = progress.QuizResult.Questions
                .FirstOrDefault(q => q.Index == existsQuestionResult.Index + 1);

            if (nextAnsweredQuizResult != null)
            {
                nextQuestion = quiz.Questions
                    .FirstOrDefault(q => q.Id == nextAnsweredQuizResult.QuestionId);

                if(nextQuestion != null)
                {
                    return new ToAnswerProgressResponse
                    {
                        Question = nextQuestion,
                        Progress = progress,
                    };
                }
            } 
        }
        else
        {
            progress.QuizResult.Questions.Add(questionResult);
        }
        
        // count question where all answers correct 
        var quantityCorrectAnswers = progress.QuizResult.Questions
            .Count(q => q.Answers.All(a => a.IsCorrect));

        progress.QuizResult.QuantityCorrectAnswers = quantityCorrectAnswers;
        
        await _dbContext.SaveChangesAsync();

        // forming next question
        // not forming next question if quiz for player is finished
        if (progress.QuizResult.IsFinished)
        {
            return new ToAnswerProgressResponse
            {
                Question = null,
                Progress = progress
            }; 
        }

        // current question is correct?
        var isCorrectCurrentQuestion = playerAnswers.All(a => a.IsCorrect);

        // find all remained questions
        // my answered questions
        var answeredIds = progress.QuizResult.Questions
            .Select(q => q.QuestionId)
            .ToHashSet();

        // all remained questions
        var remainedQuestions = quiz.Questions
            .Where(q => !answeredIds.Contains(q.Id))
            .ToList();


        if (!remainedQuestions.Any())
        {

            progress.QuizResult.IsFinished = true;
            await _dbContext.SaveChangesAsync();

            return new ToAnswerProgressResponse
            {
                Question = null,
                Progress = progress
            };
        }

        var currentComplexity = question.Complexity;

        if (isCorrectCurrentQuestion)
        {
            // вверх
            nextQuestion = remainedQuestions
                .Where(q => q.Complexity > currentComplexity)
                .OrderBy(q => q.Complexity)
                .FirstOrDefault();

            if (nextQuestion == null)
            {
                nextQuestion = remainedQuestions
                    .Where(q => q.Complexity == currentComplexity)
                    .OrderBy(q => q.Complexity)
                    .FirstOrDefault();

                if (nextQuestion == null) 
                { 
                    progress.QuizResult.IsFinished = true;
                    await _dbContext.SaveChangesAsync();
                }

                return new ToAnswerProgressResponse
                {
                    Question = nextQuestion,
                    Progress = progress
                };
            }
        }
        else
        {
            // вниз
            nextQuestion = remainedQuestions
                .Where(q => q.Complexity < currentComplexity)
                .OrderByDescending(q => q.Complexity)
                .FirstOrDefault();

            // если вниз нет → равный
            if (nextQuestion == null)
            {
                nextQuestion = remainedQuestions
                    .Where(q => q.Complexity == currentComplexity)
                    .FirstOrDefault();
            }

            // если равного нет → вверх
            if (nextQuestion == null)
            {
                nextQuestion = remainedQuestions
                    .Where(q => q.Complexity > currentComplexity)
                    .OrderBy(q => q.Complexity)
                    .FirstOrDefault();
            }

            // если вообще ничего нет
            if (nextQuestion == null)
            {
                progress.QuizResult.IsFinished = true;
                await _dbContext.SaveChangesAsync();

                return new ToAnswerProgressResponse
                {
                    Question = null,
                    Progress = progress
                };
            }
        }

        return new ToAnswerProgressResponse
        {
            Question = nextQuestion,
            Progress = progress,
        };
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

        // var quiz = await quizGrpcServiceClient.GetQuizByIdAsync(game.QuizId);
        var quiz = await quizCacheService.GetOrLoad(game.QuizId);
        if (quiz == null)
            throw new Exception($"Error create progress. Not found quiz by id {game.QuizId}");
        
        var playerProgress = new Progress
        {
            PlayerId = playerId,
            Player = player,
            GameId = game.Id,
            Status = ProgressStatus.waiting,
            QuantityQuestions = quiz.QuantityQuestions,
            QuizResult = new PlayerQuizResult
            {
                QuizId = quiz.Id,
            }
        };

        var addedPlayerProgress = await _dbContext.AddAsync(playerProgress);
        await _dbContext.SaveChangesAsync();

        return addedPlayerProgress.Entity;
    }
    
    
}