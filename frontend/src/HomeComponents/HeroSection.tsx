 
 
import {Trophy} from 'lucide-react';
 

const HeroSection = () => {

    const title : string = "IXO BEST PL MATCHES PREDICTOR";
    const subtitle : string = " AI-Powered Predictions & Live Standings"
    const Accuracy_rate :number = 86; 
    
  return (
         <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">

                <div className="flex justify-center mb-6">
                <Trophy className="w-20 h-20 text-gray-200 opacity-90" />
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white tracking-tight">
                        {title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light">
                        {subtitle}
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                <div className="bg-zinc-900 rounded-lg px-6 py-3 border border-zinc-800">
                    <div className="text-3xl font-bold text-white">{Accuracy_rate}%</div>
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
  )
}

export default HeroSection