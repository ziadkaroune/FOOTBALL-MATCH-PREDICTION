import { useState } from 'react'
import './App.css'
import { TrendingUp, Target} from 'lucide-react';
import HeroSection from './HomeComponents/HeroSection'
import LeagueTable from './HomeComponents/LeagueTable'
import TopScorer from './HomeComponents/TopScorer';
import MatchPredictor from './HomeComponents/MatchPredictor'
function App() {

  const [activeTab, setActiveTab] = useState('Predict');
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroSection />

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
            League Table
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

            <button
            onClick={() => setActiveTab('Predict')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'Predict'
                ? 'bg-white text-black shadow-lg scale-105'
                : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            <Target className="inline w-5 h-5 mr-2" />
            Predict Next Match
          </button>
        </div>

         {/* PL table tab*/}
        {activeTab === 'table' && <LeagueTable />}
        
        {/* top Scorers  tab*/}
        {activeTab === 'scorers' && <TopScorer/>}

        {/* matchPredictor tab */}
        {activeTab === 'Predict' && <MatchPredictor />}
      </div>
    </div>


  )
}

export default App
