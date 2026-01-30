# Football IA Prediction

A full full-stack app that predicts football match outcomes using a Poisson regression model and fetches Premier League data from the football-data.org API.


```bash
git clone https://github.com/ziadkaroune/FOOTBALL-MATCH-PREDICTION
```


Contents
- `backend/` — .NET minimal API that provides league table, top scorers, and match prediction endpoints.
- `frontend/` — React + Vite frontend that displays tables, top scorers and a match predictor UI.

Quick start

Prerequisites: .NET 9 SDK, Node.js 18+, and an API key from https://www.football-data.org/.


Run backend

```bash
cd backend
# create a .env file with your API key
echo "API_KEY=your_api_key_here" > .env
dotnet run
```

Run frontend

```bash
cd frontend
npm install
npm run dev
```

or after you setup your api key 

```bash
bash run.sh
```
Where to look
- Backend entry: [backend/Program.cs](backend/Program.cs#L1)
- Prediction logic: [backend/Models/PoissonRegressionModel.cs](backend/Models/PoissonRegressionModel.cs#L1)
- Frontend app: [frontend/src/main.tsx](frontend/src/main.tsx#L1)


