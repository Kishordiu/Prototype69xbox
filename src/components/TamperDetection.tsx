import { useEffect, useState } from 'react';
import { AlertTriangle, Lock, WifiOff, Bell } from 'lucide-react';

interface TamperDetectionProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function TamperDetection({ isActive, onComplete }: TamperDetectionProps) {
  const [stage, setStage] = useState(0);

  const stages = [
    { title: 'Physical Tamper Detected', icon: AlertTriangle, color: 'text-red-500' },
    { title: 'HSM Locking Cryptographic Keys', icon: Lock, color: 'text-yellow-500' },
    { title: 'Disconnecting from Network', icon: WifiOff, color: 'text-orange-500' },
    { title: 'Alert Sent to Server', icon: Bell, color: 'text-blue-500' },
  ];

  useEffect(() => {
    if (!isActive) {
      setStage(0);
      return;
    }

    const interval = setInterval(() => {
      setStage(prev => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
          Tamper Detection Response
        </h2>

        <div className="relative bg-gray-900/70 rounded-3xl border-2 border-red-500/30 p-8 backdrop-blur-md">
          <div className="mb-8 flex justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl animate-pulse" />
              <div className="absolute inset-2 bg-gray-900 rounded-3xl flex items-center justify-center">
                <AlertTriangle className="w-24 h-24 text-red-500 animate-bounce" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {stages.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === stage;
              const isCompleted = index < stage;

              return (
                <div
                  key={index}
                  className={`
                    flex items-center gap-4 p-4 rounded-xl transition-all duration-500
                    ${isActive ? 'bg-red-500/20 scale-105' :
                      isCompleted ? 'bg-green-500/10' : 'bg-gray-800/30'}
                  `}
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: isActive ? '0 0 30px rgba(239, 68, 68, 0.3)' : 'none',
                  }}
                >
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${isActive ? 'bg-red-500 animate-pulse' :
                        isCompleted ? 'bg-green-500' : 'bg-gray-700'}
                    `}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <p className={`text-xl font-bold flex-1 ${isActive ? item.color : 'text-gray-400'}`}>
                    {item.title}
                  </p>

                  {isActive && (
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-ping delay-75" />
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-ping delay-150" />
                    </div>
                  )}

                  {isCompleted && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">✓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {stage === stages.length - 1 && (
            <div className="mt-8 p-6 bg-red-500/20 rounded-xl border border-red-500 text-center">
              <p className="text-2xl font-bold text-red-400">⚠ Tamper Detected – Device Secured</p>
              <p className="text-gray-300 mt-2">Device is now in lockdown mode</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
