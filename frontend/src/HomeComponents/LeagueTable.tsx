  import  axios  from "axios";
import { useEffect, useState } from "react";

type tableType = {
    position :number,
    team : string ,
    played : number ,
    won : number ,
    drawn : number ,
    lost : number ,
    goalDifference : number ,
    points : number ,
    form : string,

}
const LeagueTable = () => {

 
    const [tableTeam , setTableTeam] = useState<tableType[]>([]);
     const getTable = async() => {
      try {
        const response = await axios.get('http://localhost:5000/api/table');
        setTableTeam(response.data);
        console.log(response.data);
      } catch (error) {``
        console.error(error);
      }
    }
    
    useEffect(()=>{
    getTable();
    },[])

 

 
 

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
                  {tableTeam.map((team, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors ${
                        idx < 4 ? 'bg-zinc-800/30' : idx > 16 ? 'bg-zinc-800/30' : ''
                      }`}
                    >
                      <td className="px-4 py-4 font-bold text-lg text-gray-300">{team.position}</td>
                      <td className="px-4 py-4 font-semibold text-white">{team.team}</td>
                      <td className="px-4 py-4 text-center hidden sm:table-cell text-gray-400">{team.played}</td>
                      <td className="px-4 py-4 text-center hidden md:table-cell text-gray-400">{team.won}</td>
                      <td className="px-4 py-4 text-center hidden md:table-cell text-gray-400">{team.drawn}</td>
                      <td className="px-4 py-4 text-center hidden md:table-cell text-gray-400">{team.lost}</td>
                      <td className="px-4 py-4 text-center hidden lg:table-cell">
                        <span className={team.goalDifference > 0 ? 'text-gray-300' : team.goalDifference < 0 ? 'text-gray-500' : 'text-gray-400'}>
                          {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-xl text-white">{team.points}</td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <div className="flex gap-1 justify-center">
                            
                          { /*team.form.map((result, i) => (
                            <div key={i}>{getFormIcon(result)}</div>
                          )) */}
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