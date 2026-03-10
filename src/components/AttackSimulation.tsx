import { useEffect, useState } from 'react';
import { AlertTriangle, Shield, XCircle } from 'lucide-react';

interface AttackSimulationProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function AttackSimulation({ isActive, onComplete }: AttackSimulationProps) {
  const [phase, setPhase] = useState<'attack' | 'detecting' | 'blocked'>('attack');
  const [attacks, setAttacks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (!isActive) {
      setPhase('attack');
      setAttacks([]);
      return;
    }

    const attackInterval = setInterval(() => {
      setAttacks(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20,
        },
      ]);
    }, 300);

    setTimeout(() => {
      clearInterval(attackInterval);
      setPhase('detecting');
    }, 2000);

    setTimeout(() => {
      setPhase('blocked');
      setAttacks([]);
    }, 3500);

    setTimeout(() => {
      onComplete();
    }, 6000);

    return () => clearInterval(attackInterval);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-6xl px-8 relative">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
          {phase === 'attack' && 'Cyber Attack Detected'}
          {phase === 'detecting' && 'Zero Trust Analysis Active'}
          {phase === 'blocked' && 'Threat Neutralized'}
        </h2>

        <div className="relative h-96 bg-gray-900/50 rounded-3xl border-2 border-red-500/30 p-8 backdrop-blur-md overflow-hidden">
          {phase === 'attack' && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse" />

              {attacks.map(attack => (
                <div
                  key={attack.id}
                  className="absolute animate-ping"
                  style={{
                    left: `${attack.x}%`,
                    top: `${attack.y}%`,
                  }}
                >
                  <div className="w-4 h-4 bg-red-500 rounded-full" />
                  <div className="absolute inset-0 w-12 h-12 -m-4 border-2 border-red-500 rounded-full animate-pulse" />
                </div>
              ))}

              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-red-500/20 px-6 py-3 rounded-full border border-red-500">
                <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
                <span className="text-red-400 font-bold">Malicious Packets Incoming</span>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </>
          )}

          {phase === 'detecting' && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 animate-pulse" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 border-4 border-yellow-500 rounded-full animate-ping" />
                  <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="w-24 h-24 text-yellow-400 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
                <p className="text-yellow-400 text-xl font-bold mb-2">Analyzing Threat Pattern</p>
                <div className="flex gap-2 justify-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-75" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            </>
          )}

          {phase === 'blocked' && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 w-64 h-64 -m-32 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
                  <Shield className="w-48 h-48 text-green-400 relative z-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <XCircle className="w-32 h-32 text-red-500 animate-ping" />
                  </div>
                </div>
              </div>

              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
                <div className="bg-green-500/20 px-8 py-4 rounded-full border-2 border-green-500 backdrop-blur-md">
                  <p className="text-green-400 text-2xl font-bold">
                    ✓ Threat Detected – Device Blocked
                  </p>
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center space-y-2">
                <p className="text-gray-300 text-lg">Malicious device isolated</p>
                <p className="text-gray-400">Connection terminated • Alert sent to security team</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
