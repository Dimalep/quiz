using Microsoft.OpenApi.Models;
using services;

var builder = WebApplication.CreateBuilder(args);

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
