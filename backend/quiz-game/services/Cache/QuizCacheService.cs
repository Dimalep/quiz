using System.Diagnostics;
using System.Text.Json;
using services.DTOs;

namespace services.Cache;

public class QuizCacheService(HttpClient _httpClient)
{
    private readonly Dictionary<int, Quiz> _quizzes = new();

    public async Task<Quiz?> GetOrLoad(int quizId)
    {
        if (_quizzes.TryGetValue(quizId, out var cachedQuiz))
        {
            Console.WriteLine($"CACHE HIT {quizId}");
            return cachedQuiz;
        }

        Console.WriteLine($"CACHE MISS {quizId} → loading...");

        var response = await _httpClient
            .GetAsync($"http://localhost:5051/api/quizzes/{quizId}");

        if (!response.IsSuccessStatusCode)
            throw new Exception("Failed to fetch quiz snapshot");

        var json = await response.Content.ReadAsStringAsync();
        var quiz = JsonSerializer.Deserialize<Quiz>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        if (quiz == null)
            throw new Exception($"Quiz {quizId} not found");

        _quizzes[quiz.Id] = quiz;
        
        ShowQuizzesIds();
        
        return quiz;
    }
    
    public async Task<Quiz?> GetQuizFromQuizServiceById(int quizId)
    {
        // Get the full quiz
        var response = await _httpClient
            .GetAsync($"http://localhost:5051/api/quizzes/{quizId}");
            
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("Failed to fetch quiz snapshot");
        }
            
        var json = await response.Content.ReadAsStringAsync();

        var quiz = JsonSerializer.Deserialize<Quiz>(json);

        if (quiz == null)
            throw new Exception($"Quiz by id: {quizId} not found");
            
        // Set quiz in-memory Dictionary
        Set(quiz.Id, quiz);

        //Check
        ShowQuizzesIds();
        
        return quiz;
    }
    
    public void ShowQuizzesIds()
    {
        Console.WriteLine("---Quizzes---");
        foreach (var quiz in _quizzes)
        {
            Console.WriteLine(quiz.Key);
        }
    }
    
    public void Set(int quizId, Quiz quiz)
    {
        _quizzes[quizId] = quiz;
    }

    public Quiz? Get(int quizId)
    {
        _quizzes.TryGetValue(quizId, out var quiz);
        return quiz;
    }
    
    public bool Exists(int quizId)
    {
        return _quizzes.ContainsKey(quizId);
    }

    public void Remove(int quizId)
    {
        _quizzes.Remove(quizId);
    }
}