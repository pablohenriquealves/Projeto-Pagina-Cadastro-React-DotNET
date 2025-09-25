using Microsoft.EntityFrameworkCore;
using CadastroApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options =>
{
options.AddPolicy("AllowReactApp",
builder => builder
.WithOrigins("http://localhost:3000")
.AllowAnyMethod()
.AllowAnyHeader()
.AllowAnyOrigin()
    );
}
);





var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();



app.Run();
