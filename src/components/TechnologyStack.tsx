import { Cpu, Shield, Lock, Zap, Network, Server, Monitor } from 'lucide-react';

export default function TechnologyStack() {
  const technologies = [
    {
      icon: Cpu,
      name: 'ESP32 Secure IoT Device',
      description: 'Hardware-based security with embedded cryptographic capabilities',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      name: 'Hardware Security Module (HSM)',
      description: 'Tamper-resistant hardware for secure key storage and operations',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Lock,
      name: 'TLS / mTLS Encryption',
      description: 'Mutual authentication and end-to-end encryption for all communications',
      gradient: 'from-teal-500 to-emerald-500',
    },
    {
      icon: Zap,
      name: 'Secure Boot',
      description: 'Cryptographic verification of firmware integrity during device startup',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: Network,
      name: 'Zero Trust Architecture',
      description: 'Never trust, always verify - continuous authentication and authorization',
      gradient: 'from-green-500 to-lime-500',
    },
    {
      icon: Server,
      name: 'Backend Security Server',
      description: 'Centralized security policy enforcement and threat detection',
      gradient: 'from-lime-500 to-yellow-500',
    },
    {
      icon: Monitor,
      name: 'Web Dashboard Monitoring',
      description: 'Real-time visibility into device health, security events, and analytics',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Technology Stack
        </h2>
        <p className="text-xl text-center text-gray-400 mb-16">
          Enterprise-grade security built on cutting-edge technologies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-gray-700 bg-gray-900/50 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all duration-300" />

                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {tech.name}
                </h3>

                <p className="text-gray-400 leading-relaxed relative z-10">
                  {tech.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
