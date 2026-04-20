using System.Text;
using System.Text.Json.Serialization;
using presentation.hubs;
using services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using services.Cache;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:5103");

#region jwt

var key = Encoding.UTF8.GetBytes("H8p7OHRGBI8SadRMX5OKSzv5TxQYkEaI03a2VaZagZ2");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

builder.Services.AddAuthentication();

#endregion

#region gRPC client
string? quizGrpcAddress = builder.Configuration["QuizCreationGrpc:Address"];
if (quizGrpcAddress == null)
{
    throw new ArgumentNullException(nameof(quizGrpcAddress));
}
#endregion

#region CORS
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
#endregion

builder.Services.AddSignalR()
    .AddJsonProtocol(options =>
    {
        options.PayloadSerializerOptions.DefaultIgnoreCondition =
            JsonIgnoreCondition.WhenWritingNull;

        options.PayloadSerializerOptions.Converters.Add(
            new JsonStringEnumConverter());
    });

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;

        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter());
    });

builder.Services.AddServices(
    quizGrpcAddress, 
    builder.Configuration.GetConnectionString("DefaultConnection")
);

builder.Services.AddHttpClient<QuizCacheService>(client =>
{
    client.BaseAddress = new Uri("http://localhost:5051");
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

#region CORS
app.UseCors("AllowFrontend");
#endregion

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHub<QuizHub>("/quizHub");
app.MapControllers();

app.UseHttpsRedirection();

app.Run();