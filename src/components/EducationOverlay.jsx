import { motion } from "framer-motion";

export default function EducationOverlay({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[1000] bg-[#0a192f]/98 backdrop-blur-2xl overflow-y-auto font-sans selection:bg-[#00ffff]/30"
    >
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />

      <button 
        onClick={onClose} 
        className="fixed top-6 right-6 md:top-10 md:right-10 px-5 py-2 border border-[#ff00ff] text-[#ff00ff] text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#ff00ff] hover:text-white hover:shadow-[0_0_20px_#ff00ff] transition-all duration-300 z-[1100]"
      >
        Close_System
      </button>

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <header className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
            <span className="text-[#00ffff] drop-shadow-[0_0_10px_#00ffff]">&gt;</span>
            Education
            <span className="w-8 h-12 md:w-12 md:h-16 bg-[#00ffff] animate-pulse inline-block shadow-[0_0_15px_#00ffff]" />
          </h1>
          <p className="text-[#00ffff]/50 font-mono text-xs mt-4 tracking-[0.5em] uppercase">Academic_Records_Terminal_v3.0</p>
        </header>

        {/* Updated Grid: 3 Columns for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Master's Card (Cyan) */}
          <section className="group p-8 bg-white/[0.02] border border-white/10 rounded-3xl hover:border-[#00ffff]/40 transition-all duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[9px] font-bold tracking-widest text-[#00ffff] border border-[#00ffff]/30 rounded-full bg-[#00ffff]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffff] animate-pulse" />
              POST_GRADUATE
            </div>
            <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-[#00ffff] transition-colors">Master’s in Physics</h2>
            <p className="text-slate-400 font-mono text-xs mb-6 text-balance">University Name • 2024</p>
            <div className="h-px w-full bg-gradient-to-r from-[#00ffff]/50 to-transparent mb-6" />
            <p className="text-slate-300 leading-relaxed text-sm font-light">
              Advanced theoretical systems and mathematical modeling. Specialized in Quantum Mechanics and Computational Physics.
            </p>
          </section>

          {/* 2. BSc Card (Amber/Gold) - NEW */}
          <section className="group p-8 bg-white/[0.02] border border-white/10 rounded-3xl hover:border-[#f59e0b]/40 transition-all duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[9px] font-bold tracking-widest text-[#f59e0b] border border-[#f59e0b]/30 rounded-full bg-[#f59e0b]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
              UNDERGRADUATE
            </div>
            <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-[#f59e0b] transition-colors">BSc in Maths & Physics</h2>
            <p className="text-slate-400 font-mono text-xs mb-6">University Name • 2022</p>
            <div className="h-px w-full bg-gradient-to-r from-[#f59e0b]/50 to-transparent mb-6" />
            <p className="text-slate-300 leading-relaxed text-sm font-light">
              Foundation in Calculus, Linear Algebra, and Classical Mechanics. Developed core analytical skills for complex system architecture.
            </p>
          </section>

          {/* 3. Programming Card (Purple) */}
          <section className="group p-8 bg-white/[0.02] border border-white/10 rounded-3xl hover:border-[#a855f7]/40 transition-all duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[9px] font-bold tracking-widest text-[#a855f7] border border-[#a855f7]/30 rounded-full bg-[#a855f7]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
              SKILLS_CERTIFIED
            </div>
            <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-[#a855f7] transition-colors">Competitive Programming</h2>
            <p className="text-slate-400 font-mono text-xs mb-6 italic">HackerRank Proficiency</p>
            <div className="h-px w-full bg-gradient-to-r from-[#a855f7]/50 to-transparent mb-6" />
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2"><span className="text-[#a855f7]">▶</span> Problem Solving [Gold]</li>
              <li className="flex items-center gap-2"><span className="text-[#a855f7]">▶</span> JavaScript Logic</li>
              <li className="flex items-center gap-2"><span className="text-[#a855f7]">▶</span> Algorithm Design</li>
            </ul>
          </section>

        </div>

        {/* Certifications Row (Full Width) */}
        <div className="mt-8 p-8 bg-white/[0.01] border border-white/5 rounded-3xl">
          <h3 className="text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase mb-6 text-center">External_Certifications</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Advanced TypeScript", "MERN Stack", "Three.js & WebGL", "Physics Engines"].map((cert) => (
              <span key={cert} className="px-4 py-2 bg-white/5 rounded-lg text-xs text-slate-400 border border-white/5 hover:border-[#00ffff]/30 hover:text-white transition-all">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}