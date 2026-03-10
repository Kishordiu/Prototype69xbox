import { useEffect, useState } from 'react';
import { Shield, Key, Lock, CheckCircle } from 'lucide-react';

interface SecuritySimulationProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function SecuritySimulation({ isActive, onComplete }: SecuritySimulationProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Device Boot',
      description: 'Secure Boot verifies firmware integrity',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Device Identity Creation',
      description: 'Generating cryptographic identity and certificate',
      icon: Key,
      color: 'from-cyan-500 to-teal-500',
    },
    {
      title: 'Secure Authentication',
      description: 'Establishing encrypted connection to secure gateway',
      icon: Lock,
      color: 'from-teal-500 to-emerald-500',
    },
    {
      title: 'Zero Trust Verification',
      description: 'Backend verifies device identity, firmware, and behavior',
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-500',
    },
  ];

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      return;
    }

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Security Initialization
        </h2>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={index}
                className={`
                  relative p-6 rounded-2xl border transition-all duration-500
                  ${isActive ? 'border-cyan-400 bg-cyan-500/10 scale-105' :
                    isCompleted ? 'border-green-400/50 bg-green-500/5' :
                    'border-gray-700 bg-gray-900/30'}
                `}
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: isActive ? '0 0 40px rgba(34, 211, 238, 0.3)' : 'none',
                }}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center
                      transition-all duration-500
                      ${isActive ? `bg-gradient-to-br ${step.color} animate-pulse` :
                        isCompleted ? 'bg-green-500' : 'bg-gray-700'}
                    `}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>

                  {isCompleted && (
                    <CheckCircle className="w-12 h-12 text-green-400 animate-bounce" />
                  )}

                  {isActive && (
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping delay-75" />
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping delay-150" />
                    </div>
                  )}
                </div>

                {isActive && (
                  <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 animate-pulse"
                         style={{ width: '100%' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {currentStep === steps.length - 1 && (
          <div className="mt-8 text-center">
            <div className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse">
              <p className="text-2xl font-bold text-white">✓ Device Secured & Connected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
