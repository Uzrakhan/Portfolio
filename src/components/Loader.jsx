import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence,useMotionValue, useSpring, useTransform  } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onStart }) {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);
  const [ready, setReady] = useState(false);

  const progressMV = useMotionValue(0);
  const smooth = useSpring(progressMV, {
    stiffness: 25,
    damping: 18,
    mass: 1.8
  })

  /*
  useEffect(() => {
    let raf;

    const update = () => {
      setSmooth(prev => {
        const diff = progress - prev
        return prev + diff * 0.06
      });

      raf = requestAnimationFrame(update)
    };

    update();
    return () => cancelAnimationFrame(raf)
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setReady(true), 700);
      return () => clearTimeout(t);
    }
  },[progress])
  */
 

 useEffect(() => {
    if (progress < 100) {
      progressMV.set(progress * 0.92); // slows early phase
    } else {
      progressMV.set(100);
    }
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setReady(true), 700); // GPU warmup
      return () => clearTimeout(t);
    }
  }, [progress]);

  const percent = useTransform(smooth, v => Math.round(v));
  const scale = useTransform(smooth, v => v / 100);
  const glow = useTransform(smooth, [85, 100], [0.4, 1]);

  const handleStart = () => {
    if (typeof onStart === 'function') onStart();
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <div className="grain-overlay"/>
          <motion.div
  className="absolute inset-0 bg-cyan-400/10 pointer-events-none"
  initial={{ opacity: 0 }}
  animate={ready ? { opacity: [0, 0.25, 0] } : {}}
  transition={{ duration: 1.4 }}
/>
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(14px)",
              scale: 1.05,
              transition: { duration: 1.2, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070f1f] text-white overflow-hidden"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/** Background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <motion.h1 
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ 
                  opacity: 0.06,
                  scale: [1.05, 1.08, 1.05],
                 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-[18vw] font-bold tracking-tighter blur-[1.2px] opacity-60"
                style={{
                  background: "linear-gradient(90deg,#a855f7,#22d3ee,#a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                PORTFOLIO
              </motion.h1>
            </div>

            {/** Top branding bar */}
            <div className="absolute top-0 w-full p-10 md:p-16 flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] tracking-[0.5em] uppercase opacity-40">Full-Stack Developer</span>
                <span className="text-[9px] tracking-[0.5em] uppercase opacity-40">Edition 2026</span>
              </div>
              <div className="text-[9px] tracking-[0.5em] uppercase opacity-40">
                Currently Available
              </div>
            </div>

            <motion.div
              className="absolute w-[420px] h-[160px] bg-violet-500/30 blur-[120px] rounded-full"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/** Main content area - Added mt-20 to nudge it down */}
            <div className="relative z-10 flex flex-col items-center mt-20">
              {/* Name */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ 
                    y: 80,
                    opacity: 0,
                    filter: "blur(12px)",
                    scale: 1.04
                  }}
                  animate={{ 
                    y: 0, 
                    opacity: 1, 
                    filter: "blur(0px)", 
                    scale: 1 
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.9,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-7xl md:text-9xl font-light italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Uzra Khan
                </motion.h1>
              </div>

              {/** Elegant thin progress bar */}
              <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mt-6 mb-12">
                <motion.div 
                  className="absolute inset-0 bg-white"
                  style={{ scaleX: scale, originX: 0 }}
                />
              </div>

              {/** Interaction button */}
              <AnimatePresence>
                {ready && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                  >
                    <motion.button
                        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStart}
                        className="group relative flex flex-col items-center cursor-pointer px-10 py-4"
                    >
                      {/* glow */}
                      <div className="absolute inset-0 bg-violet-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />

                      <span className="text-[10px] uppercase tracking-[1em] font-medium mb-2 ml-[1em]">
                        Enter Experience
                      </span>

                      {/* sweep underline */}
                      <div className="relative w-10 h-[1px] bg-white/40 overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-cyan-300"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/** Counter (Bottom Left) */}
            <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16">
              <div className="flex items-baseline gap-4">
                <motion.span className="text-4xl md:text-5xl font-light tabular-nums" style={{ letterSpacing: "-0.05em" }}>
                  {percent}
                </motion.span>
                <span className="text-[9px] uppercase tracking-[0.3em] opacity-40">
                  Percent Loaded
                </span>
              </div>
            </div>

            {/** Corner decors */}
            <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16 text-right opacity-20 text-[9px] tracking-[0.3em] uppercase leading-relaxed">
              Built with React & <br /> Three Fiber
            </div>
          </motion.div>
        </>
        
      )}
    </AnimatePresence>
  );
}