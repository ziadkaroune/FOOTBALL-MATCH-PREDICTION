# Backend — Football IA Prediction

This is the .NET minimal API backend for Football IA Prediction. It fetches Premier League data from football-data.org and exposes a simple match prediction endpoint using a Poisson regression model.

Prerequisites

- .NET 9 SDK
- An API key from https://www.football-data.org/ (set as `API_KEY`)

Setup

1. Create a `.env` file in the `backend/` folder containing your API key:

```bash
cd backend
echo "API_KEY=your_api_key_here" > .env
```

2. Run the backend:

```bash
dotnet run
```

Notes

- The app loads env variables via `DotNetEnv` (see [backend/Program.cs](Program.cs#L1)).
- The backend configures CORS to allow the frontend origin at `http://localhost:5173`.

Endpoints

- GET `/api/table`
  - Returns the Premier League standings (position, team, played, won, drawn, lost, goal difference, points, form).
  - Example:

```bash
curl http://localhost:5000/api/table
```

- GET `/api/topscorers`
  - Returns top scorers with `Rank`, `Player`, `Team`, `Goals`, `Assists`, `Matches`.

```bash
curl http://localhost:5000/api/topscorers
```

- POST `/api/predict`
  - Request JSON: `{ "HomeTeam": "Leeds", "AwayTeam": "Arsenal" }`
  - Response: `PredictionResponse` with `Matchup`, `HomeWinChance`, `DrawChance`, `AwayWinChance`, `ScorePrediction`.

Example POST using `curl`:

```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"HomeTeam":"Leeds","AwayTeam":"Arsenal"}'
```

Prediction logic

- The prediction engine is implemented in [backend/Models/PoissonRegressionModel.cs](Models/PoissonRegressionModel.cs#L1).
- It computes league baselines, team attack/defense strengths, expected goals (λ) and uses a Poisson distribution to estimate match outcome probabilities.

Model classes

- `LeagueTableTeam` — defined in [backend/Models/LeagueTableTeam.cs](Models/LeagueTableTeam.cs#L1)
- `TopScorer` — defined in [backend/Models/TopScorer.cs](Models/TopScorer.cs#L1)
- `PredictionResponse`, `MatchData` — defined in [backend/Models/PoissonRegressionModel.cs](Models/PoissonRegressionModel.cs#L1)

If you want, I can add OpenAPI/Swagger support, example responses, or automated tests next.
