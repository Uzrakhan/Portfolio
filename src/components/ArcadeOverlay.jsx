import { useState, useEffect } from "react";

export default function ArcadeOverlay({ onClose }) {
  const [bootStage, setBootStage] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i <= 3) setBootStage(i);
      else clearInterval(interval);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">

      {/* Arcade Frame */}
      <div className="relative w-[900px] h-[675px] max-w-[95vw] max-h-[85vh] bg-[#120018] rounded-xl border-4 border-pink-500 shadow-[0_0_60px_#ec4899] overflow-hidden">


        {/* Neon Top Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-pink-500 blur-sm"></div>

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.08)_50%,transparent_50%)] bg-[length:100%_4px]"></div>

        {/* Exit Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-pink-400 font-['Press_Start_2P'] text-xs hover:text-cyan-400 transition"
        >
          EXIT
        </button>

        {/**animated grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-pink-600/20 to-transparent"></div>

            <div className="absolute bottom-0 w-full h-full animate-gridMove opacity-40"
                style={{
                    backgroundImage: `
                    linear-gradient(to right, rgba(0,255,255,0.4) 1px, transparent 1px),
                    linear-gradient(to top, rgba(0,255,255,0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px"
                }}
            />

        </div>

        {/* Content */}
        <div className="
          w-full h-full
          flex flex-col items-center justify-center
          font-['Press_Start_2P']
          text-center
          px-8
        ">

          {/* Boot Sequence */}
          {bootStage === 1 && (
            <p className="text-cyan-400 animate-pulse">
              BOOTING ARCADE MODE...
            </p>
          )}

          {bootStage === 2 && (
            <p className="text-pink-400 animate-pulse">
              LOADING PLAYER PROFILE...
            </p>
          )}

          {bootStage >= 3 && (
            <>
              <p className="text-2xl text-pink-500 drop-shadow-[0_0_10px_#ec4899] neon-flicker arcade-chromatic">
                PLAYER: UZRA KHAN
              </p>

              <div className="mt-8 space-y-4 text-sm text-cyan-400">
                <p>CLASS: FRONTEND STRATEGIST</p>
                <p>LEVEL: 03</p>
                <p>XP: REAL-TIME SYSTEMS</p>
                <p>PLAYSTYLE: PERFORMANCE FIRST</p>
                <p>SPECIAL: UI ARCHITECTURE</p>
                <p>QUEST: SCALABLE WEB APPS</p>
              </div>

              <p className="mt-10 text-xs text-pink-300 opacity-70">
                PRESS EXIT TO RETURN
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
