import { Shield, Users } from 'lucide-react';

export default function TeamSection() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-cyan-500/30 p-12 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Code Strikers
              </h2>
            </div>

            <div className="flex items-center justify-center gap-3 mb-8">
              <Users className="w-6 h-6 text-cyan-400" />
              <p className="text-2xl text-cyan-400 font-semibold">
                Zero Trust IoT Security Architecture
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
              <p className="text-gray-300 text-lg leading-relaxed text-center">
                Code Strikers is a development team focused on building secure IoT systems using Zero Trust security principles and hardware-level protection. Our mission is to create self-defending IoT devices that protect against hijacking, botnets, DDoS attacks, and unauthorized access through enterprise-grade security architecture.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cyan-500/10 rounded-xl p-6 border border-cyan-500/30 text-center">
                <p className="text-3xl font-bold text-cyan-400 mb-2">100%</p>
                <p className="text-gray-400">Hardware Security</p>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30 text-center">
                <p className="text-3xl font-bold text-blue-400 mb-2">Zero Trust</p>
                <p className="text-gray-400">Architecture</p>
              </div>

              <div className="bg-teal-500/10 rounded-xl p-6 border border-teal-500/30 text-center">
                <p className="text-3xl font-bold text-teal-400 mb-2">Real-time</p>
                <p className="text-gray-400">Threat Detection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
