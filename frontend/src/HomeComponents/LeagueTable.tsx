 

import {ArrowUp, ArrowDown, Minus } from 'lucide-react';
const LeagueTable = () => {


    const predictions = [
    { pos: 1, team: 'Liverpool', played: 20, won: 14, drawn: 5, lost: 1, gd: 25, points: 47, form: [1, 1, 0, 1, 1] },
    { pos: 2, team: 'Arsenal', played: 20, won: 13, drawn: 6, lost: 1, gd: 22, points: 45, form: [0, 1, 1, 0, 1] },
    { pos: 3, team: 'Chelsea', played: 20, won: 12, drawn: 5, lost: 3, gd: 18, points: 41, form: [1, 1, -1, 1, 1]},
    { pos: 4, team: 'Man City', played: 20, won: 11, drawn: 6, lost: 3, gd: 16, points: 39, form: [1, 0, 1, 1, -1]},
    { pos: 5, team: 'Newcastle', played: 20, won: 11, drawn: 5, lost: 4, gd: 14, points: 38, form: [1, -1, 1, 0, 1] },
    { pos: 6, team: 'Aston Villa', played: 20, won: 10, drawn: 6, lost: 4, gd: 10, points: 36, form: [0, 1, 0, 1, -1] },
    { pos: 7, team: 'Man United', played: 20, won: 10, drawn: 5, lost: 5, gd: 8, points: 35, form: [-1, 1, 1, 0, 1] },
    { pos: 8, team: 'Tottenham', played: 20, won: 9, drawn: 6, lost: 5, gd: 5, points: 33, form: [0, -1, 1, 1, 0] },
  ];

    const getFormIcon = (result : number) => {
    if (result === 1) return <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-xs font-bold">W</div>;
    if (result === 0) return <div className="w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center text-white text-xs font-bold">D</div>;
    return <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-gray-400 text-xs font-bold">L</div>;
  };

 

  return (
 
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
  )
}

export default LeagueTable