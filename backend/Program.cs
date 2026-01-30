using System.Text.Json;
using DotNetEnv;

Env.Load();

string apiKey = Environment.GetEnvironmentVariable("API_KEY");

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSingleton<PredictionService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

// Setup HttpClient 
var httpClient = new HttpClient { BaseAddress = new Uri("https://api.football-data.org/v4/") };
httpClient.DefaultRequestHeaders.Add("X-Auth-Token", apiKey); 

////  Premier League Table
app.MapGet("/api/table", async () =>
{
    var response = await httpClient.GetAsync("competitions/PL/standings?season=2025");
    response.EnsureSuccessStatusCode();

    var json = await response.Content.ReadAsStringAsync();
    using var doc = JsonDocument.Parse(json);

    var tableArray = doc.RootElement
        .GetProperty("standings")[0]
        .GetProperty("table");

    var table = tableArray.EnumerateArray()
        .Select(t => new 
        {
            Position = t.GetProperty("position").GetInt32(),
            Team = t.GetProperty("team").GetProperty("shortName").GetString(),
            Played = t.GetProperty("playedGames").GetInt32(),
            Won = t.GetProperty("won").GetInt32(),
            Drawn = t.GetProperty("draw").GetInt32(),
            Lost = t.GetProperty("lost").GetInt32(),
            GoalDifference = t.GetProperty("goalDifference").GetInt32(),
            Points = t.GetProperty("points").GetInt32(),
            Form = t.GetProperty("form").GetString() 
        })
        .ToList();

    return Results.Ok(table);
});

app.MapGet("/api/topscorers", async () =>
{
    var response = await httpClient.GetAsync("competitions/PL/scorers");
    response.EnsureSuccessStatusCode();

    var json = await response.Content.ReadAsStringAsync();
    using var doc = JsonDocument.Parse(json);

    var scorersArray = doc.RootElement.GetProperty("scorers");

    var scorers = scorersArray.EnumerateArray()
        .Select((s, index) => new 
        {
            Rank = index + 1,
            Player = s.GetProperty("player").GetProperty("name").GetString(),
            Team = s.GetProperty("team").GetProperty("name").GetString(),
            Goals = s.GetProperty("goals").GetInt32(),
            
            Assists = s.TryGetProperty("assists", out var assistProp) && assistProp.ValueKind == JsonValueKind.Number 
                      ? assistProp.GetInt32() : 0,
            
            Matches = s.TryGetProperty("playedMatches", out var matchProp) && matchProp.ValueKind == JsonValueKind.Number 
                      ? matchProp.GetInt32() : 0
        })
        .ToList();

    return Results.Ok(scorers);
});

app.MapPost("/api/predict", (PredictionRequest request, PredictionService predictor) =>
{
    var result = predictor.GetPrediction(request.HomeTeam, request.AwayTeam);
    
    return result is not null 
        ? Results.Ok(result) 
        : Results.NotFound(new { error = "Prediction data not available for this match." });
});

app.Run();

public record PredictionRequest(string HomeTeam, string AwayTeam);