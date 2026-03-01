import { motion } from "framer-motion";

const skills = [
  {
    title: "FRONTEND_ENGINEERING",
    items: [
      { name: "React.js", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    title: "BACKEND_SYSTEMS",
    items: [
      { name: "Node.js", level: 82 },
      { name: "Express", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "Socket.io", level: 84 },
    ],
  },
  {
    title: "PROBLEM_SOLVING",
    items: [
      { name: "Data Structures", level: 88 },
      { name: "Algorithmic Thinking", level: 86 },
      { name: "Debugging Depth", level: 92 },
    ],
  },
];

export default function SkillsOverlay({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[1000] bg-[#050816] text-cyan-200 overflow-y-auto px-6 py-16 font-mono"
    >
      {/* Neural grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_center,#00ffff_1px,transparent_1px)] [background-size:30px_30px]" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-lg hover:text-cyan-400"
      >
        EXIT
      </button>

      <div className="max-w-[900px] mx-auto">
        <h1 className="text-4xl text-cyan-400 mb-14 tracking-widest">
          SKILL_INTELLIGENCE_SYSTEM
        </h1>

        {skills.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="mb-14"
          >
            <h2 className="text-xl text-cyan-400 mb-6 tracking-widest">
              {section.title}
            </h2>

            <div className="space-y-5">
              {section.items.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>{skill.name}</span>
                    <span className="text-cyan-400">
                      {skill.level > 90
                        ? "Expert"
                        : skill.level > 80
                        ? "Advanced"
                        : "Proficient"}
                    </span>
                  </div>

                  <div className="h-[6px] bg-cyan-900/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-cyan-400 shadow-[0_0_12px_#00ffff]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Research section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-cyan-400/70"
        >
          <p>
            Current Focus → Real-time architectures, scalable UI systems, and
            performance-driven frontend engineering.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}