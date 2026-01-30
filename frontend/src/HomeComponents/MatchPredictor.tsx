import React, { useState } from 'react';
import axios from 'axios';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
}

interface Prediction {
  homeScore: number;
  awayScore: number;
  confidence: number;
  homeWinChance?: number;
  awayWinChance?: number;
  drawChance?: number;
}

const MatchPredictor = () => {
  const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const matches: Match[] = [
    { id: '1', homeTeam: 'Arsenal', awayTeam: 'Liverpool', date: '2026-01-29', time: '19:45', venue: 'Emirates Stadium' },
    { id: '2', homeTeam: 'Manchester City', awayTeam: 'Chelsea', date: '2026-01-30', time: '20:00', venue: 'Etihad Stadium' },
    { id: '3', homeTeam: 'Tottenham', awayTeam: 'Newcastle', date: '2026-01-31', time: '18:30', venue: 'Tottenham Hotspur Stadium' },
    { id: '4', homeTeam: 'Manchester United', awayTeam: 'Brighton', date: '2026-02-01', time: '15:00', venue: 'Old Trafford' },
    { id: '5', homeTeam: 'Aston Villa', awayTeam: 'West Ham', date: '2026-02-01', time: '17:30', venue: 'Villa Park' }
  ];

  const generatePredictionPoissson = async () => {
    setIsAnimating(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post('http://localhost:5000/api/predict', {
        homeTeam: 'Leeds',
        awayTeam: 'Arsenal'
      });

      const data = response.data;
    
      const scores = data.scorePrediction.split(' - ');
      
      // highest probability as the "Confidence" metric
      const highestProb = Math.max(data.homeWinChance, data.awayWinChance, data.drawChance);

      setPrediction({
        homeScore: parseInt(scores[0]),
        awayScore: parseInt(scores[1]),
        confidence: highestProb,
        homeWinChance: data.homeWinChance,
        awayWinChance: data.awayWinChance,
        drawChance: data.drawChance
      });

    } catch (err) {
      console.error("API Error:", err);
      setError("Model data not available for this matchup. Check if backend is running.");
    } finally {
      // delay like real api response loading
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const nextMatch = () => {
    if (currentMatchIndex < matches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
      setPrediction(null);
      setError(null);
    }
  };

  const previousMatch = () => {
    if (currentMatchIndex > 0) {
      setCurrentMatchIndex(currentMatchIndex - 1);
      setPrediction(null);
      setError(null);
    }
  };

  const currentMatch = matches[currentMatchIndex];

  return (
    <div className="max-w-4xl mx-auto p-4">
   
      <div className="mb-12 text-center">
        <div className="text-xs tracking-widest text-gray-500 mb-4 font-semibold uppercase">
          AI-POWERED ANALYTICS
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
          PREMIER LEAGUE
        </h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          MATCH PREDICTOR
        </h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 text-red-400 rounded-xl text-center text-sm">
          {error}
        </div>
      )}

 
      <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm tracking-wider text-gray-400 font-semibold uppercase">
            {currentMatchIndex === 0 ? 'Featured Match' : `Upcoming Match ${currentMatchIndex + 1}`}
          </div>
          <div className="text-sm text-gray-500 font-mono">
            {currentMatchIndex + 1} / {matches.length}
          </div>
        </div>

     
        <div className="mb-6">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-2 text-white">
                {currentMatch.homeTeam}
              </div>
              <div className="text-xs text-gray-500 tracking-wider uppercase">Home</div>
            </div>
            <div className="text-2xl text-zinc-700 font-black">VS</div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-2 text-white">
                {currentMatch.awayTeam}
              </div>
              <div className="text-xs text-gray-500 tracking-wider uppercase">Away</div>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800/50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500 text-[10px] uppercase mb-1 font-bold">Date & Time</div>
                <div className="text-white font-semibold">
                  {new Date(currentMatch.date).toLocaleDateString('en-GB', { 
                    weekday: 'short', month: 'short', day: 'numeric' 
                  })} • {currentMatch.time}
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-[10px] uppercase mb-1 font-bold">Venue</div>
                <div className="text-white font-semibold truncate">{currentMatch.venue}</div>
              </div>
            </div>
          </div>
        </div>

   
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex gap-2">
            <button
              onClick={previousMatch}
              disabled={currentMatchIndex === 0 || isAnimating}
              className="px-6 py-4 bg-zinc-950 text-white border border-zinc-800 rounded-xl hover:bg-zinc-800 disabled:opacity-30 transition-all"
            >
              ←
            </button>
            <button
              onClick={nextMatch}
              disabled={currentMatchIndex === matches.length - 1 || isAnimating}
              className="px-6 py-4 bg-zinc-950 text-white border border-zinc-800 rounded-xl hover:bg-zinc-800 disabled:opacity-30 transition-all"
            >
              →
            </button>
          </div>
          
          <button
            onClick={generatePredictionPoissson}
            disabled={isAnimating}
            className={`flex-1 p-4 text-sm font-black tracking-widest uppercase rounded-xl transition-all duration-300 ${
              !isAnimating
                ? 'bg-white text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                : 'bg-zinc-800 text-zinc-500 cursor-wait animate-pulse'
            }`}
          >
            {isAnimating ? 'RUNNING POISSON MODEL...' : '⚡ PREDICT'}
          </button>
        </div>
      </div>

    
      {prediction && !isAnimating && (
        <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center mb-6">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Poisson Regression Analysis
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-black text-white tabular-nums">
                {prediction.homeScore}
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Predicted Home</div>
            </div>
            
            <div className="text-4xl font-light text-zinc-800">-</div>
            
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-black text-white tabular-nums">
                {prediction.awayScore}
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Predicted Away</div>
            </div>
          </div>

        
          <div className="grid grid-cols-3 gap-4 mb-8">
             <div className="text-center p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[9px] text-gray-500 uppercase mb-1">Win</div>
                <div className="text-sm font-bold text-white">{prediction.homeWinChance}%</div>
             </div>
             <div className="text-center p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[9px] text-gray-500 uppercase mb-1">Draw</div>
                <div className="text-sm font-bold text-white">{prediction.drawChance}%</div>
             </div>
             <div className="text-center p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-[9px] text-gray-500 uppercase mb-1">Away</div>
                <div className="text-sm font-bold text-white">{prediction.awayWinChance}%</div>
             </div>
          </div>

     
          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs tracking-widest text-gray-500 uppercase font-bold">Model Confidence</span>
              <span className="text-xl font-black text-white">{prediction.confidence}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${prediction.confidence}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchPredictor;