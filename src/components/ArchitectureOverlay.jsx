import { motion } from "framer-motion";

export default function ArchitectureOverlay({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#020617]/95 backdrop-blur-xl p-4"
    >
      {/* Animated blueprint grid background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)`, size: '40px 40px', backgroundSize: '40px 40px' }}
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-6xl h-[80vh] rounded-2xl border border-cyan-500/30 bg-black/40 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex"
      >
        {/* Left Side: Title Section */}
        <div className="w-1/3 p-12 flex flex-col justify-center border-r border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-transparent">
          <h1 className="text-5xl font-bold text-cyan-400 tracking-tighter leading-none mb-4">
            SYSTEM<br />ARCHITECTURE
          </h1>
          <div className="w-12 h-[2px] bg-cyan-500/50" />
        </div>

        {/* Right Side: Scrollable Content */}
        <div className="w-2/3 p-12 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArchitectureCard
              title="3D EXPERIENCE LAYER"
              text="React Three Fiber powers the immersive room environment. Scene composition is modularized to prevent render coupling."
            />
            <ArchitectureCard
              title="CAMERA ORCHESTRATION"
              text="GSAP-driven camera transitions create spatial storytelling while keeping navigation predictable."
            />
            <ArchitectureCard
              title="OVERLAY UI ENGINE"
              text="All heavy UI lives outside the 3D canvas. This avoids expensive scene re-renders and improves responsiveness."
            />
            <ArchitectureCard
              title="PERFORMANCE STRATEGY"
              text="Lazy-loaded models, bloom threshold tuning, and overlay-driven detail rendering keep GPU cost controlled."
            />
            <ArchitectureCard
              title="INTERACTION DESIGN"
              text="Each object represents a cognitive memory node — laptop (identity), arcade (playfulness), bookshelf (growth)."
            />
            <ArchitectureCard
              title="SCALABILITY THINKING"
              text="The scene supports feature expansion without structural rewrites by isolating overlays from environment logic."
            />
          </div>
        </div>

        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-cyan-400/60 hover:text-cyan-200 transition-all hover:rotate-90"
        >
          <span className="text-3xl font-light">✕</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

function ArchitectureCard({ title, text }) {
  return (
    <div className="group border border-cyan-500/20 rounded-xl p-6 bg-slate-900/40 hover:bg-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300">
      <h3 className="text-cyan-400 text-[10px] uppercase font-bold tracking-[0.2em] mb-3 opacity-80 group-hover:opacity-100">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
        {text}
      </p>
    </div>
  );
}