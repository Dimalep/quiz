//using domains.domains;
//using services.DTOs;
//using services.interfaces;
//using System.Net.Http.Headers;
//using System.Text;
//using System.Text.Json;

//namespace services.services
//{
//    public class QuizGeneratorService : IQuizGeneratorService
//    {
//        private readonly HttpClient httpClient;

//        public QuizGeneratorService(HttpClient httpClient)
//        {
//            this.httpClient = httpClient;
//        }

//        private readonly string BASE_URL = "https://openrouter.ai/api/v1";

//        private readonly string API_KEY = "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";

//        private readonly string generateQuizByThemaPrompt = "Сгенерируй квиз на указанную тему.\r\n\r\nВерни ТОЛЬКО валидный JSON без текста и пояснений.\r\n\r\nФормат строго:\r\n\r\n{\r\n  \"userId\": 1,\r\n  \"title\": \"string\",\r\n  \"description\": \"string\",\r\n  \"quantityQuestions\": 3,\r\n  \"questions\": [\r\n    {\r\n      \"index\": 1,\r\n      \"text\": \"string\",\r\n      \"type\": \"buttons\",\r\n      \"complexity\": 1,\r\n      \"answers\": [\r\n        {\r\n          \"index\": 1,\r\n          \"text\": \"string\",\r\n          \"isCorrect\": true\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}\r\n\r\nПравила:\r\n- минимум 4 ответа на вопрос\r\n- только один правильный ответ\r\n- без изображений\r\n- index начинается с 1\r\n- quantityQuestions соответствует длине questions";

//        public async Task<Quiz> GenerateQuizByThema(string topic)
//        {
//            httpClient.DefaultRequestHeaders.Authorization =
//                new AuthenticationHeaderValue("Bearer", API_KEY);

//            var requestBody = new
//            {
//                model = "deepseek/deepseek-chat",
//                messages = new[]
//                {
//                    new {
//                        role = "user",
//                        content = $"{generateQuizByThemaPrompt}\n\nТема: {topic}"
//                    }
//                }
//            };

//            var json = JsonSerializer.Serialize(requestBody);

//            var response = await httpClient.PostAsync(
//                $"{BASE_URL}/chat/completions",
//                new StringContent(json, Encoding.UTF8, "application/json")
//            );

//            var result = await response.Content.ReadAsStringAsync();

//            //достаём content
//            using var doc = JsonDocument.Parse(result);

//            var content = doc.RootElement
//                .GetProperty("choices")[0]
//                .GetProperty("message")
//                .GetProperty("content")
//                .GetString();

//            if (string.IsNullOrEmpty(content))
//                throw new Exception("AI returned empty response");

//            //чистим JSON (на случай мусора)
//            var cleanJson = ExtractJson(content);

//            //парсим в DTO
//            var aiQuiz = JsonSerializer.Deserialize<AiQuizDto>(cleanJson,
//                new JsonSerializerOptions
//                {
//                    PropertyNameCaseInsensitive = true
//                });

//            if (aiQuiz == null)
//                throw new Exception("Failed to deserialize AI quiz");

//            //маппим в доменную модель
//            var quiz = new Quiz
//            {
//                UserId = aiQuiz.UserId,
//                Title = aiQuiz.Title,
//                Description = aiQuiz.Description,
//                QuantityQuestions = aiQuiz.Questions.Count,
//                Questions = aiQuiz.Questions.Select(q => new Question
//                {
//                    Id = Guid.NewGuid().ToString(),
//                    Index = q.Index,
//                    Text = q.Text,
//                    Type = q.Type,
//                    Complexity = q.Complexity,
//                    Answers = q.Answers.Select(a => new Answer
//                    {
//                        Id = Guid.NewGuid().ToString(),
//                        Index = a.Index,
//                        Text = a.Text,
//                        IsCorrect = a.IsCorrect
//                    }).ToList()
//                }).ToList()
//            };

//            return quiz;
//        }

//        private string ExtractJson(string input)
//        {
//            var start = input.IndexOf('{');
//            var end = input.LastIndexOf('}');

//            if (start == -1 || end == -1)
//                return input;

//            return input.Substring(start, end - start + 1);
//        }
//    }
//}
