import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';


export default function ProjectsOverlay({ onClose }) {
    const { projects } = PORTFOLIO_DATA;
    const [selectedProject, setSelectedProject] = useState(null)
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);



    const navigate = useNavigate();
    const [mode, setMode] = useState("home");
    const terminalRef = useRef(null);


    const systemLines = [
        "Uzra@portfolio:~$ system-info",
        "",
        "Name: Uzra Khan",
        "Role: Frontend-Focused Full-Stack Developer",
        "Core Stack: React | TypeScript | Node | MongoDB",
        "",
        "System Status: All Services Operational",
        "",

        "Performance Metrics:",
        "• API Latency: 14ms",
        "• Lighthouse Score: 99",
        "• Session Uptime: 99.9%",
        "• Concurrent Users: 5+",
        "",
        "Available Commands:",
        "> projects",
        "> performance",
        "> skills",
        "> exit"
    ];
    const [activeLines, setActiveLines] = useState(systemLines);


    useEffect(() => {
        if (mode === "home") {
            setActiveLines(systemLines);
        }

        if (mode === "projects") {
            setActiveLines([
                "Uzra@portfolio:~$ projects",
                "",
                ...projects.map((p, i) => `${i + 1}. ${p.title}`),
                "",
                "> back"
            ]);
        }

        if(mode === "performance") {
            setActiveLines([
                "Uzra@portfolio:~$ performance",
                "",
                "System Performance Metrics:",
                "",
                "• API Latency: 14ms",
                "• Lighthouse Score: 99",
                "• Session Uptime: 99.9%",
                "• Concurrent Users Supported: 5+",
                "",
                "> back"
            ]);
        }

        if(mode === "skills") {
            setActiveLines([
                "Uzra@portfolio:~$ skills",
                "",
                "Core Technologies:",
                "",
                "• React",
                "• TypeScript",
                "• Node.js",
                "• MongoDB",
                "• Socket.io",
                "• Tailwind CSS",
                "",
                "> back"
            ])
        }

        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);

    }, [mode]);


    //main typing engine
    useEffect(() => {

        if(currentLineIndex >= activeLines.length) return;

        const currentLine = activeLines[currentLineIndex];

        const timeout = setTimeout(() => {

            //if still typing characters
            if(currentCharIndex < currentLine.length) {

                const updatedLines = [...displayedLines];
                updatedLines[currentLineIndex] =
                    (updatedLines[currentLineIndex] || "") +
                    currentLine[currentCharIndex];

                setDisplayedLines(updatedLines)
                setCurrentCharIndex(prev => prev + 1)
            } else {
                //movve to next line
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0)
            }
        },20);

        return () => clearTimeout(timeout)
    },[currentCharIndex, currentLineIndex, activeLines])


    useEffect(() => {
        if(terminalRef.current) {
            terminalRef.current.scrollTop = 0;
        }
    }, [mode]);



    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md'>
            <div ref={terminalRef} className="relative w-[80%] h-[80%] bg-[#0d1117] text-green-400 font-mono rounded-2xl shadow-[0_0_40px_rgba(0,255,100,0.25)] p-8 overflow-y-auto">
                
                <button 
                    onClick={onClose}
                    className='absolute top-4 right-6 text-green-400 hover:text-green-300 text-xl'
                >
                    ESC
                </button>

                {(mode === "home" || mode === "projects" || mode === "performance" || mode === "skills") && (
                    <>
                        {displayedLines.map((line,index) => (
                            <p
                                key={index}
                                className={`${
                                    typeof line === "string" &&
                                    (
                                        line.startsWith(">") || 
                                        (mode === "projects" && /^\d+\./.test(line))
                                    )
                                        ? "cursor-pointer hover:text-green-300"
                                        : ""
                                }`}
                                onClick={() => {
                                    if (line === "> projects") setMode("projects");
                                    if (line === "> performance") setMode("performance");
                                    if (line === "> skills") setMode("skills");
                                    if (line === "> exit") onClose();
                                    if (line === "> back") setMode("home")

                                    //clicking numbered project
                                    if(mode === "projects" && /^\d+\./.test(line)) {
                                        const index = parseInt(line.split(".")[0],10) - 1;
                                        setSelectedProject(projects[index]);
                                        setMode("projectDetail");
                                    }
                                }}
                            >
                                {line}
                            </p>
                        ))}

                        <span className='cursor-blink'>▌</span>
                        
                    </>
                )}



                {mode === "projectDetail" && selectedProject && (
                    <>
                        <p className='mb-6'>
                            Uzra@portfolio:~$ open {selectedProject.slug}
                        </p>

                        <div className='columns-1 md:columns-2 gap-10'>
                            {/**left side text */}
                            <div className='pr-4 space-y-6'>

                                <div className='break-inside-avoid mb-8'>
                                    <p className='text-green-300 font-semibold mb-2'>Summary</p>
                                    <p>{selectedProject.summary}</p>
                                </div>

                                <div className='flex flex-col justify-start items-center'>
                                    <img 
                                        src={selectedProject.image}
                                        alt="Project Screenshot"
                                        className="rounded-lg mb-6 border border-green-400 shadow-lg"
                                    />

                                    <video
                                        src={selectedProject.videoUrl}
                                        autoPlay
                                        muted
                                        loop
                                        controls
                                        className="rounded-lg border border-green-400 shadow-lg"
                                    />
                                </div>


                                <div className='break-inside-avoid mb-8'>
                                    <p className='text-green-300 font-semibold mb-2'>
                                        Problem Statement
                                    </p>
                                    <p>{selectedProject.description}</p>
                                </div>

                                <div className='break-inside-avoid mb-8'>
                                    <p className='text-green-300 font-semibold mb-2'>
                                        Architecture & Approach
                                    </p>
                                    <div 
                                        dangerouslySetInnerHTML={{
                                        __html: selectedProject.approach,
                                        }}
                                    />
                                </div>

                                {/**tech stack */}
                                <div className='break-inside-avoid mb-8'>
                                    <p className='text-green-300 font-semibold mb-2'> 
                                        Tech Stack
                                    </p>
                                    <div className='flex flex-wrap gap-2'>
                                        {selectedProject.techStack.map((tech,i) => (
                                            <span
                                                key={i}
                                                className='px-3 py-1 border border-green-400 rounded-md text-sm'
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>


                                {/*outcome */}
                                <div className='break-inside-avoid mb-8'>
                                    <p className="text-green-300 font-semibold mb-2">
                                        Outcome & Learnings
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {selectedProject.outcome.map((item, i) => (
                                        <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/**key decisios */}
                                <div>
  <p className="text-green-300 font-semibold mb-2">
    Key Technical Decisions
  </p>
  <div className="space-y-3">
    {Object.entries(selectedProject.techDecisions).map(
      ([tech, reason], i) => (
        <div key={i}>
          <p className="font-semibold">{tech}</p>
          <p className="text-green-200 text-sm">{reason}</p>
        </div>
      )
    )}
  </div>
                                </div>

                                
                                <div className="break-inside-avoid mb-8 pt-4 space-x-6">
                                    <a
                                        href={selectedProject.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-green-300"
                                    >
                                        [ View Live ]
                                    </a>

                                    <a
                                        href={selectedProject.sourceLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-green-300"
                                    >
                                        [ GitHub ]
                                    </a>
                                </div>


                                <p
                                    onClick={() => setMode("projects")}
                                    className="mt-6 cursor-pointer hover:text-green-300"
                                >
                                    ← Back
                                </p>
                            </div>

                            {/**rigth side media */}
                            

                        </div>
                    </>
                )}



            </div>
        </div>
    )
    
}

