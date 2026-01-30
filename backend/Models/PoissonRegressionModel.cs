    // 1 _ Calculate the "League Baselines"
    // 2 _ Calculate "Team Strengths"
    // 3 _ Find the Expected Goals (λ)
    // 4 _ The Poisson Calculation




public class PredictionService
{
    // PL League Averages (The Baselines)
    private const double AvgHomeGoals = 1.52;
    private const double AvgAwayGoals = 1.25;

 
    private readonly List<MatchData> _matchDatabase = new()
    {
        new MatchData { 
            HomeTeam = "Leeds", 
            AwayTeam = "Arsenal", 
            HomeAttack = 1.10, 
            HomeDefense = 1.18, 
            AwayAttack = 1.27, 
            AwayDefense = 0.82 
        }
    };

    public PredictionResponse? GetPrediction(string home, string away)
    {
        // check if the frontend ask if the matchprediction data exist in bckend
        var match = _matchDatabase.FirstOrDefault(m => 
            m.HomeTeam.Equals(home, StringComparison.OrdinalIgnoreCase) && 
            m.AwayTeam.Equals(away, StringComparison.OrdinalIgnoreCase));

        if (match == null) return null;  // return later prediction is not available

        // Expected Goals (λ)
        double homeLambda = match.HomeAttack * match.AwayDefense * AvgHomeGoals;
        double awayLambda = match.AwayAttack * match.HomeDefense * AvgAwayGoals;

        // Step 4: Poisson Matrix (0-5 goals)
        double homeWin = 0, draw = 0, awayWin = 0;
        for (int h = 0; h <= 5; h++) {
            for (int a = 0; a <= 5; a++) {
                double prob = PoissonProbability(h, homeLambda) * PoissonProbability(a, awayLambda);
                if (h > a) homeWin += prob;
                else if (h == a) draw += prob;
                else awayWin += prob;
            }
        }

        return new PredictionResponse {
            Matchup = $"{match.HomeTeam} vs {match.AwayTeam}",
            HomeWinChance = Math.Round(homeWin * 100, 1),
            DrawChance = Math.Round(draw * 100, 1),
            AwayWinChance = Math.Round(awayWin * 100, 1),
            ScorePrediction = $"{Math.Round(homeLambda)} - {Math.Round(awayLambda)}"
        };
    }

    private double PoissonProbability(int k, double lambda) =>
        (Math.Pow(lambda, k) * Math.Exp(-lambda)) / Factorial(k);

    private double Factorial(int k) {
        double res = 1;
        for (int i = 1; i <= k; i++) res *= i;
        return res;
    }
}


public class MatchData {
    public string HomeTeam { get; set; } = "";
    public string AwayTeam { get; set; } = "";
    public double HomeAttack { get; set; }
    public double HomeDefense { get; set; }
    public double AwayAttack { get; set; }
    public double AwayDefense { get; set; }
}

public class PredictionResponse {
    public string Matchup { get; set; } = "";
    public double HomeWinChance { get; set; }
    public double DrawChance { get; set; }
    public double AwayWinChance { get; set; }
    public string ScorePrediction { get; set; } = "";
}