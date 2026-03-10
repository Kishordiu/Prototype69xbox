import { useState } from 'react';
import { Shield, Play, Zap, AlertTriangle } from 'lucide-react';
import GlobeBackground from './components/GlobeBackground';
import SecuritySimulation from './components/SecuritySimulation';
import AttackSimulation from './components/AttackSimulation';
import TamperDetection from './components/TamperDetection';
import TechnologyStack from './components/TechnologyStack';
import NetworkVisualization from './components/NetworkVisualization';
import TeamSection from './components/TeamSection';

function App() {
  const [activeSimulation, setActiveSimulation] = useState<'none' | 'security' | 'attack' | 'tamper'>('none');

  const handleSimulationComplete = () => {
    setTimeout(() => setActiveSimulation('none'), 500);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <GlobeBackground />

      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-8 py-20">
          <div className="max-w-6xl w-full">
            <div className="text-center space-y-8">
              <div className="inline-block animate-float">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
                  <Shield className="w-32 h-32 text-cyan-400 relative z-10 mx-auto" />
                </div>
              </div>

              <h1
                className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                style={{
                  textShadow: '0 0 80px rgba(34, 211, 238, 0.3)',
                }}
              >
                Zero Trust IoT
                <br />
                Security Architecture
              </h1>

              <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Self-Defending IoT Devices for a Secure Connected World
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <button
                  onClick={() => setActiveSimulation('security')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center gap-3"
                >
                  <Play className="w-6 h-6 group-hover:animate-pulse" />
                  START SECURITY SIMULATION
                </button>

                <button
                  onClick={() => setActiveSimulation('attack')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/50 flex items-center gap-3"
                >
                  <Zap className="w-6 h-6 group-hover:animate-pulse" />
                  SIMULATE CYBER ATTACK
                </button>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => setActiveSimulation('tamper')}
                  className="group relative px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full font-bold text-base transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/50 flex items-center gap-2 mx-auto"
                >
                  <AlertTriangle className="w-5 h-5 group-hover:animate-pulse" />
                  TAMPER DETECTION DEMO
                </button>
              </div>

              <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">99.9%</div>
                  <div className="text-gray-400">Threat Detection Rate</div>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300">
                  <div className="text-4xl font-bold text-blue-400 mb-2">&lt; 10ms</div>
                  <div className="text-gray-400">Response Time</div>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300">
                  <div className="text-4xl font-bold text-purple-400 mb-2">Zero Trust</div>
                  <div className="text-gray-400">Architecture</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TechnologyStack />
        <NetworkVisualization />
        <TeamSection />

        <footer className="py-12 text-center text-gray-500 border-t border-gray-800">
          <p className="text-lg">
            Zero Trust IoT Security Architecture - Powered by Code Strikers
          </p>
          <p className="text-sm mt-2">
            Enterprise-grade security for the connected world
          </p>
        </footer>
      </div>

      <SecuritySimulation
        isActive={activeSimulation === 'security'}
        onComplete={handleSimulationComplete}
      />

      <AttackSimulation
        isActive={activeSimulation === 'attack'}
        onComplete={handleSimulationComplete}
      />

      <TamperDetection
        isActive={activeSimulation === 'tamper'}
        onComplete={handleSimulationComplete}
      />
    </div>
  );
}

export default App;
