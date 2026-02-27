using System.Text.Json.Serialization;
using presentation.hubs;
using services;

var builder = WebApplication.CreateBuilder(args);

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
        options.PayloadSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddServices(
    quizGrpcAddress, 
    builder.Configuration.GetConnectionString("DefaultConnection")
);

var app = builder.Build();

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