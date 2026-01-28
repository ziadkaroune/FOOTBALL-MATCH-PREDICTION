 import  axios  from "axios";
import { useEffect, useState } from "react";
 

type  TopScorer ={
  rank: number;
  player: string;
  team: string;
  goals: number;
  assists: number;
  matches: number;
}

function TopScorer() {
const [dataScorrer , setDataScorrer] = useState<TopScorer[]>([]);
 const getTopScorer = async() => {
  try {
    /// top scorer call from backend
    const response = await axios.get('http://localhost:5000/api/topscorers');
    setDataScorrer(response.data.slice(0 , 9));
    console.log(response.data);
  } catch (error) {``
    console.error(error);
  }
}

useEffect(()=>{
getTopScorer();
},[])

  return (
  <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Golden Boot Race</h2>
        
            <div className="grid gap-6 md:grid-cols-2">
              {dataScorrer?.map((scorer) => (
                <div
                  key={scorer.player}
                  className="bg-zinc-950 rounded-xl p-6 border border-zinc-800 hover:scale-105 transition-transform hover:border-zinc-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-4xl font-bold text-gray-400 mb-1">#{scorer.rank}</div>
                      <div className="text-2xl font-bold mb-1 text-white">{scorer.player}</div>
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
  )
}

export default TopScorer
