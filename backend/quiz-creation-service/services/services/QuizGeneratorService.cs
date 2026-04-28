using domains.domains;
using services.DTOs;
using services.interfaces;
using System.Text;
using System.Text.Json;

namespace services.services
{
    public class QuizGeneratorService(HttpClient httpClient) : IQuizGeneratorService
    {
        private readonly string generateQuizByThemaPrompt =
            @"Сгенерируй квиз в формате JSON.

            Верни ТОЛЬКО JSON без текста и объяснений.

            Требования:
            - 4 вопроса
            - 4 варианта ответа на каждый вопрос
            - 1 правильный ответ
            - без изображений
            - index начинается с 1

            Формат:
            {
              ""userId"": 1,
              ""title"": ""string"",
              ""description"": ""string"",
              ""quantityQuestions"": 4,
              ""questions"": [
                {
                  ""index"": 1,
                  ""text"": ""string"",
                  ""type"": ""buttons"",
                  ""complexity"": 1,
                  ""answers"": [
                    {
                      ""index"": 1,
                      ""text"": ""string"",
                      ""isCorrect"": true
                    }
                  ]
                }
              ]
            }

            Ответ должен быть строго валидным JSON.
            Не используй markdown.
            Сгенерируй короткие вопросы (до 80 символов)";


        public async Task<Quiz> GenerateQuizByThema(string topic)
        {
            var requestBody = new
            {
                model = "deepseek/deepseek-chat",
                messages = new[]
                {
                    new {
                        role = "user",
                        content = $"{generateQuizByThemaPrompt}\n\nТема: {topic}"
                    }
                }
            };

            var json = JsonSerializer.Serialize(requestBody);

            var response = await httpClient.PostAsync(
                "/api/v1/chat/completions",
                new StringContent(json, Encoding.UTF8, "application/json")
            );

            var result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"OpenRouter error: {error}");
            }

            //достаём content
            using var doc = JsonDocument.Parse(result);

            var content = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            if (string.IsNullOrEmpty(content))
                throw new Exception("AI returned empty response");

            //чистим JSON (на случай мусора)
            var cleanJson = ExtractJson(content);

            //парсим в DTO
            var aiQuiz = JsonSerializer.Deserialize<AiQuizDto>(cleanJson,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

            if (aiQuiz == null)
                throw new Exception("Failed to deserialize AI quiz");

            //маппим в доменную модель
            var quiz = new Quiz
            {
                UserId = aiQuiz.UserId,
                Title = aiQuiz.Title,
                Description = aiQuiz.Description,
                QuantityQuestions = aiQuiz.Questions.Count,
                Questions = aiQuiz.Questions.Select(q => new Question
                {
                    Id = Guid.NewGuid().ToString(),
                    Index = q.Index,
                    Text = q.Text,
                    Type = q.Type,
                    Complexity = q.Complexity,
                    Answers = q.Answers.Select(a => new Answer
                    {
                        Id = Guid.NewGuid().ToString(),
                        Index = a.Index,
                        Text = a.Text,
                        IsCorrect = a.IsCorrect
                    }).ToList()
                }).ToList()
            };

            return quiz;
        }

        private string ExtractJson(string input)
        {
            var start = input.IndexOf('{');
            var end = input.LastIndexOf('}');

            if (start == -1 || end == -1)
                return input;

            return input.Substring(start, end - start + 1);
        }
    }
}
