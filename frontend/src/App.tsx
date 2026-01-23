import { useState } from 'react'
import './App.css'
import { TrendingUp, Trophy, Target, ArrowUp, ArrowDown, Minus } from 'lucide-react';
function App() {

  const [activeTab, setActiveTab] = useState('table');

  const predictions = [
    { pos: 1, team: 'Liverpool', played: 20, won: 14, drawn: 5, lost: 1, gd: 25, points: 47, form: [1, 1, 0, 1, 1], trend: 'up' },
    { pos: 2, team: 'Arsenal', played: 20, won: 13, drawn: 6, lost: 1, gd: 22, points: 45, form: [0, 1, 1, 0, 1], trend: 'same' },
    { pos: 3, team: 'Chelsea', played: 20, won: 12, drawn: 5, lost: 3, gd: 18, points: 41, form: [1, 1, -1, 1, 1], trend: 'up' },
    { pos: 4, team: 'Man City', played: 20, won: 11, drawn: 6, lost: 3, gd: 16, points: 39, form: [1, 0, 1, 1, -1], trend: 'down' },
    { pos: 5, team: 'Newcastle', played: 20, won: 11, drawn: 5, lost: 4, gd: 14, points: 38, form: [1, -1, 1, 0, 1], trend: 'up' },
    { pos: 6, team: 'Aston Villa', played: 20, won: 10, drawn: 6, lost: 4, gd: 10, points: 36, form: [0, 1, 0, 1, -1], trend: 'same' },
    { pos: 7, team: 'Man United', played: 20, won: 10, drawn: 5, lost: 5, gd: 8, points: 35, form: [-1, 1, 1, 0, 1], trend: 'up' },
    { pos: 8, team: 'Tottenham', played: 20, won: 9, drawn: 6, lost: 5, gd: 5, points: 33, form: [0, -1, 1, 1, 0], trend: 'same' },
  ];

  const topScorers = [
    { name: 'Erling Haaland', team: 'Man City', goals: 18 },
    { name: 'Mohamed Salah', team: 'Liverpool', goals: 16 },
    { name: 'Cole Palmer', team: 'Chelsea', goals: 14 },
    { name: 'Alexander Isak', team: 'Newcastle', goals: 12 },
  ];

  const getFormIcon = (result : number) => {
    if (result === 1) return <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-xs font-bold">W</div>;
    if (result === 0) return <div className="w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center text-white text-xs font-bold">D</div>;
    return <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-gray-400 text-xs font-bold">L</div>;
  };

  const getTrendIcon = (trend : string) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-white" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-gray-500" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Trophy className="w-20 h-20 text-gray-200 opacity-90" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white tracking-tight">
              Premier League 2024/25
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light">
              AI-Powered Predictions & Live Standings
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-zinc-900 rounded-lg px-6 py-3 border border-zinc-800">
                <div className="text-3xl font-bold text-white">87%</div>
                <div className="text-sm text-gray-500">Accuracy Rate</div>
              </div>
              <div className="bg-zinc-900 rounded-lg px-6 py-3 border border-zinc-800">
                <div className="text-3xl font-bold text-white">20</div>
                <div className="text-sm text-gray-500">Matches Predicted</div>
              </div>
              <div className="bg-zinc-900 rounded-lg px-6 py-3 border border-zinc-800">
                <div className="text-3xl font-bold text-white">Live</div>
                <div className="text-sm text-gray-500">Updated Daily</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'table'
                ? 'bg-white text-black shadow-lg scale-105'
                : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            <TrendingUp className="inline w-5 h-5 mr-2" />
            Predicted Table
          </button>
          <button
            onClick={() => setActiveTab('scorers')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'scorers'
                ? 'bg-white text-black shadow-lg scale-105'
                : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            <Target className="inline w-5 h-5 mr-2" />
            Top Scorers
          </button>
        </div>

        {/* League Table */}
        {activeTab === 'table' && (
          <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-950 border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-400">Pos</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-400">Team</th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-gray-400 hidden sm:table-cell">P</th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-gray-400 hidden md:table-cell">W</th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-gray-400 hidden md:table-cell">D</th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-gray-400 hidden md:table-cell">L</th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-gray-400 hidden lg:table-cell">GD</th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-gray-400">Pts</th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-gray-400 hidden lg:table-cell">Form</th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-gray-400 hidden sm:table-cell">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((team, idx) => (
                    <tr
                      key={team.team}
                      className={`border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors ${
                        idx < 4 ? 'bg-zinc-800/30' : idx > 16 ? 'bg-zinc-800/30' : ''
                      }`}
                    >
                      <td className="px-4 py-4 font-bold text-lg text-gray-300">{team.pos}</td>
                      <td className="px-4 py-4 font-semibold text-white">{team.team}</td>
                      <td className="px-4 py-4 text-center hidden sm:table-cell text-gray-400">{team.played}</td>
                      <td className="px-4 py-4 text-center hidden md:table-cell text-gray-400">{team.won}</td>
                      <td className="px-4 py-4 text-center hidden md:table-cell text-gray-400">{team.drawn}</td>
                      <td className="px-4 py-4 text-center hidden md:table-cell text-gray-400">{team.lost}</td>
                      <td className="px-4 py-4 text-center hidden lg:table-cell">
                        <span className={team.gd > 0 ? 'text-gray-300' : team.gd < 0 ? 'text-gray-500' : 'text-gray-400'}>
                          {team.gd > 0 ? '+' : ''}{team.gd}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-xl text-white">{team.points}</td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <div className="flex gap-1 justify-center">
                          {team.form.map((result, i) => (
                            <div key={i}>{getFormIcon(result)}</div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center hidden sm:table-cell">
                        {getTrendIcon(team.trend)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-zinc-950 border-t border-zinc-800">
              <div className="flex gap-6 text-sm flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-zinc-700 rounded"></div>
                  <span className="text-gray-400">Champions League</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-zinc-700 rounded"></div>
                  <span className="text-gray-400">Relegation</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Scorers */}
        {activeTab === 'scorers' && (
          <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Golden Boot Race</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {topScorers.map((scorer, idx) => (
                <div
                  key={scorer.name}
                  className="bg-zinc-950 rounded-xl p-6 border border-zinc-800 hover:scale-105 transition-transform hover:border-zinc-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-4xl font-bold text-gray-400 mb-1">#{idx + 1}</div>
                      <div className="text-2xl font-bold mb-1 text-white">{scorer.name}</div>
                      <div className="text-gray-500">{scorer.team}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-extrabold text-white">{scorer.goals}</div>
                      <div className="text-sm text-gray-500">Goals</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 text-white">Get Weekly Predictions</h2>
            <p className="text-xl text-gray-400 mb-8 font-light">
              Join thousands of fans receiving AI-powered match predictions
            </p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>


  )
}

export default App
