using Microsoft.OpenApi.Models;
using presentation.grpc;
using services;

var builder = WebApplication.CreateBuilder(args);

#region gRPC
builder.Services.AddGrpc();
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenLocalhost(5050, listenOptions =>
    {
        listenOptions.Protocols = Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http2;
    });
});
#endregion

#region CORS
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowFrontend", policy => {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
#endregion

builder.Services.AddServices(builder.Configuration.GetConnectionString("DefaultConnection"));
builder.Services.AddControllers();

#region Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Quiz-creation service", Version = "v1" });
});
#endregion

var app = builder.Build();

#region gRPC
app.MapGrpcService<QuizGrpcService>();
#endregion

#region CORS
app.UseCors("AllowFrontend");
#endregion

#region Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Quiz-creation service"));
}
#endregion

//app.UseHttpsRedirection();
app.MapControllers();
app.Run();
