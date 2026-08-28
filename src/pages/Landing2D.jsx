import { useEffect, useRef, useState,useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);





const SKILLS = [
  {
    group: "AI / GENERATIVE AI",
    items: [
      "LLMs",
      "Generative AI",
      "AI Agent Development",
      "LLM Integration",
      "Prompt Engineering",
      "Structured Outputs",
      "Embeddings",
      "Multi-AI Orchestration",
    ],
  },

  {
    group: "FRONTEND",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },


  { 
    group: "3D & Graphics", 
    items: [
      "Three.js", 
      "React Three Fiber", 
      "Blender", 
      "GSAP", 
      "WebGL / GLSL"
    ] 
  },


  {
    group: "BACKEND",
    items: [
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "REST APIs",
    ],
  },

  {
    group: "DATABASES",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
  },

  {
    group: "APIs & INTEGRATIONS",
    items: [
      "Google Gemini API",
      "Gmail API",
      "Google Drive API",
      "Google OAuth 2.0",
      "Firebase",
      "Socket.IO",
    ],
  },

  {
    group: "TOOLS",
    items: [
      "Git",
      "GitHub",
      "Pydantic",
    ],
  },
];

const MARQUEE = ["REACT","THREE.JS","TYPESCRIPT","REAL-TIME SYSTEMS","REACT THREE FIBER","BLENDER","NODE.JS","MONGODB","SOCKET.IO","FULL-STACK","3D WEB","PERFORMANCE"];

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== "undefined" ? window.innerWidth <= breakpoint : false;
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

function RevealText({ text, as: Tag = "span", className = "", style = {} }) {
  const words = text.split(" ")
  return (
    <Tag
      className={`reveal-mask ${className}`}
      style={{
        display: "inline-block",
        ...style
      }}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{
            display: "inline-block",
            overflow: "hidden",
            paddingBottom: "0.12em",
            marginBottom: "-0.12em",
            verticalAlign: "bottom"
          }}
        >
          <span
            className="reveal-mask-char"
            style={{
              display: "inline-block", 
              willChange: "transform"
            }}
          >
            {word}
            {wi < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  )
}

// Grain
function Grain() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none", opacity: 0.038,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "180px 180px",
    }} />
  );
}

// Cursor
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const rPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = `${e.clientX}px`;
        dot.current.style.top = `${e.clientY}px`;
      }
    };

    //Magnetic expand ring on hover elements
    const onHoverEnter = () => {
      if (ring.current) {
        ring.current.style.transform = "translate(-50%,-50%) scale(1.6)";
        ring.current.style.borderColor = "#C8FF00";
        ring.current.style.backgroundColor = "rgba(200,255,0,0.08)";
      }
    };

    const onHoverLeave = () => {
      if (ring.current) {
        ring.current.style.transform = "translate(-50%,-50%) scale(1)";
        ring.current.style.borderColor = "rgba(200,255,0,0.45)";
        ring.current.style.backgroundColor = "transparent";
      }
    }

    window.addEventListener("mousemove", onMove);

    //dynamic listener 
    const hoverElements = document.querySelectorAll("[data-h], .reveal-char");
    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", onHoverEnter);
      el.addEventListener("mouseleave", onHoverLeave);
    })

    let raf;
    const tick = () => {
      rPos.current.x += (pos.current.x - rPos.current.x) * 0.11;
      rPos.current.y += (pos.current.y - rPos.current.y) * 0.11;

      if (ring.current) {
        ring.current.style.left = `${rPos.current.x}px`;
        ring.current.style.top = `${rPos.current.y}px`;
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      hoverElements.forEach(el => {
        el.removeEventListener("mouseenter", onHoverEnter);
        el.removeEventListener("mouseleave", onHoverLeave);
      })
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position:"fixed", width:5, height:5, background:"#F05A9D", borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9999 }} />
      <div ref={ring} style={{ position:"fixed", width:34, height:34, border:"1.5px solid #F05A9D", borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9998, transition:"transform 0.35s ease, border-color 0.3s, opacity 0.3s" }} />
    </>
  );
}

// Marquee
function Marquee({ rev = false }) {
  const items = [...MARQUEE, ...MARQUEE];
  const trackRef = useRef(null);

  return (
    <div style={{ overflow:"hidden", borderTop:"1px solid rgba(240,235,225,0.07)", borderBottom:"1px solid rgba(240,235,225,0.07)", padding:"13px 0", background:"rgba(200,255,0,0.015)" }}>
      <div ref={trackRef} style={{ display:"flex", width:"max-content", animation:`mq${rev?"R":""} 30s linear infinite` }}>
        {items.map((t,i) => (
          <span key={i} style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"0.9rem", letterSpacing:"0.22em", color: i%2===0 ? "rgba(240,235,225,0.22)" : "#F05A9D", marginRight:"3rem", whiteSpace:"nowrap" }}>
            {t} <span style={{ color:"rgba(240,235,225,0.08)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Nav
function Nav({ open, setOpen }) {
  const [sc, setSc] = useState(false);
  const links = ["Work", "Skills", "Experience", "Contact"];


  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>

      {/* NAVBAR */}
      <nav
        style={{
          position:"fixed",
          top:0,
          left:0,
          right:0,
          zIndex:500,
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          padding:"0 clamp(1.5rem,4vw,4rem)",
          height:64,
          background:sc ? "rgba(8,8,8,0.92)" : "transparent",
          backdropFilter:sc ? "blur(22px)" : "none",
          borderBottom:sc ? "1px solid rgba(240,235,225,0.05)" : "none",
          transition:"all 0.4s"
        }}
      >

        {/* LOGO */}
        <a
          href="#home"
          data-h
          style={{
            fontFamily:"'Bebas Neue',cursive",
            fontSize:"1.35rem",
            color:"#F0EBE1",
            textDecoration:"none",
            letterSpacing:"0.18em",
            zIndex:1001
          }}
        >
          UZRA<span style={{ color:"#F05A9D" }}>.</span>
        </a>

        {/* DESKTOP NAV */}
        <div
          className="desktop-nav"
          style={{
            display:"flex",
            gap:"2.5rem",
            alignItems:"center"
          }}
        >

          <a
            href="/about"
            style={{
              fontFamily:"'Fira Code',monospace",
              fontSize:"0.7rem",
              color:"rgba(240,235,225,0.4)",
              textDecoration:"none",
              letterSpacing:"0.08em"
            }}
          >
            About
          </a>

          {links.map(l => (
            <a
              key={l}
              href={`/#${l.toLowerCase()}`}
              data-h
              style={{
                fontFamily:"'Fira Code',monospace",
                fontSize:"0.7rem",
                color:"rgba(240,235,225,0.4)",
                textDecoration:"none",
                letterSpacing:"0.08em",
                transition:"color 0.2s"
              }}
              onMouseEnter={e => e.target.style.color="#F05A9D"}
              onMouseLeave={e => e.target.style.color="rgba(240,235,225,0.4)"}
            >
              {l}
            </a>
          ))}

          <a
            href="mailto:uzrakhan539@gmail.com"
            data-h
            style={{
              fontFamily:"'Fira Code',monospace",
              fontSize:"0.68rem",
              color:"#080808",
              background:"#F05A9D",
              padding:"8px 20px",
              borderRadius:3,
              textDecoration:"none",
              letterSpacing:"0.06em"
            }}
          >
            HIRE ME
          </a>

        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          style={{
            width:44,
            height:44,
            display:"none",
            background:"transparent",
            border:"none",
            position:"relative",
            zIndex:1001
          }}
        >

          <span
            style={{
              position:"absolute",
              left:"50%",
              top: open ? "50%" : "35%",
              width:22,
              height:1.5,
              background:"#F0EBE1",
              transform: open
                ? "translate(-50%,-50%) rotate(45deg)"
                : "translate(-50%,-50%)",
              transition:"all 0.3s ease"
            }}
          />

          <span
            style={{
              position:"absolute",
              left:"50%",
              top:"50%",
              width:22,
              height:1.5,
              background:"#F0EBE1",
              opacity: open ? 0 : 1,
              transform:"translate(-50%,-50%)",
              transition:"all 0.3s ease"
            }}
          />

          <span
            style={{
              position:"absolute",
              left:"50%",
              top: open ? "50%" : "65%",
              width:22,
              height:1.5,
              background:"#F0EBE1",
              transform: open
                ? "translate(-50%,-50%) rotate(-45deg)"
                : "translate(-50%,-50%)",
              transition:"all 0.3s ease"
            }}
          />

        </button>

      </nav>

      {/* MOBILE MENU */}
      <div
        style={{
          position:"fixed",
          inset:0,
          background:"rgba(8,8,8,0.98)",
          zIndex:999,
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
          gap:"2rem",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition:"opacity 0.35s ease"
        }}
      >
        <button
          onClick={() => setOpen(false)}
          style={{
            position:"absolute",
            top:"1.5rem",
            right:"1.5rem",
            background:"transparent",
            border:"1px solid rgba(240,235,225,0.12)",
            color:"#F0EBE1",
            width:52,
            height:52,
            borderRadius:"50%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            fontFamily:"'Fira Code',monospace",
            fontSize:"0.72rem",
            letterSpacing:"0.08em",
            transition:"all 0.25s ease"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#C8FF00";
            e.currentTarget.style.color = "#C8FF00";
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(240,235,225,0.12)";
            e.currentTarget.style.color = "#F0EBE1";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          ✕
        </button>
        <a
          href="/about"
          onClick={() => setOpen(false)}
          style={{
            fontFamily:"'Bebas Neue',cursive",
            fontSize:"3rem",
            letterSpacing:"0.08em",
            color:"#F0EBE1",
            textDecoration:"none"
          }}
        >
          ABOUT
        </a>

        {links.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setOpen(false)}
            style={{
              fontFamily:"'Bebas Neue',cursive",
              fontSize:"3rem",
              letterSpacing:"0.08em",
              color:"#F0EBE1",
              textDecoration:"none"
            }}
          >
            {l}
          </a>
        ))}

        <a
          href="mailto:uzrakhan539@gmail.com"
          onClick={() => setOpen(false)}
          style={{
            marginTop:"1rem",
            fontFamily:"'Fira Code',monospace",
            fontSize:"0.8rem",
            color:"#080808",
            background:"#F05A9D",
            padding:"14px 28px",
            borderRadius:4,
            textDecoration:"none",
            letterSpacing:"0.08em"
          }}
        >
          HIRE ME
        </a>

      </div>

    </>
  );
}

//magnetic button
function MagneticButton({
  children,href,variant = "primary",
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    const handleMove = (e) => {
      const rect = button.getBoundingClientRect();

      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(button, {
        x: x * 0.18,
        y: y * 0.18,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    };


    button.addEventListener("mousemove", handleMove);
    button.addEventListener("mouseleave", handleLeave);

    return () => {
      button.removeEventListener("mousemove", handleMove);
      button.removeEventListener("mouseleave", handleLeave);
    };

  },[]);

  const primary = variant === "primary";
  const pink = "#F05A9D";

  return (
    <a
      ref={ref}
      href={href}
      data-h
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Fira Code', monospace",
        fontSize: "0.73rem",
        letterSpacing: "0.1em",
        textDecoration: "none",
        padding: "14px 34px",
        borderRadius: 4,

        color: primary ? "#080808" : pink,
        background: primary
          ? pink
          : "rgba(240,90,157,0.06)",

        border: primary
          ? `1px solid ${pink}`
          : "1px solid rgba(240,90,157,0.32)",

        transition:
          "background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = primary
          ? "#F477AE"
          : "rgba(240,90,157,0.14)";

        e.currentTarget.style.boxShadow =
          "0 12px 35px rgba(240,90,157,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = primary
          ? pink
          : "rgba(240,90,157,0.06)";

        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </a>
  );
}

// Hero
function Hero() {
  
  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 clamp(1.5rem,4vw,4rem)", paddingBottom:"7rem", position:"relative", overflow:"hidden" }}>
      {/* Grid */}
      <div
        className="hero-grid"
        style={{
          position:"absolute",
          inset:0,
          backgroundImage:"linear-gradient(rgba(240,235,225,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(240,235,225,0.025) 1px,transparent 1px)",
          backgroundSize:"90px 90px",
          pointerEvents:"none"
        }}
      />
      {/* Glow */}
      <div
        className="hero-glow"
        style={{
          position:"absolute",
          top:"12%",
          right:"-8%",
          width:520,
          height:520,
          borderRadius:"50%",
          background:"radial-gradient(circle,rgba(240,90,157,0.10) 0%,transparent 65%)",
          pointerEvents:"none"
        }}
      />
 
      {/* Status bar */}
      <div className="hero-status" style={{ position:"absolute", top:84, left:"clamp(1.5rem,4vw,4rem)", right:"clamp(1.5rem,4vw,4rem)", display:"flex", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#C8FF00", animation:"pulse 2s ease infinite" }} />
          <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"rgba(240,235,225,0.3)", letterSpacing:"0.14em" }}>AVAILABLE FOR WORK</span>
        </div>
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.63rem", color:"rgba(240,235,225,0.18)", letterSpacing:"0.1em" }}>VARANASI, INDIA — 2026</span>
      </div>
 
      <div style={{ position:"relative", zIndex:1 }}>
        <p className="hero-role" style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.72rem", color:"#f05A9D", letterSpacing:"0.24em", marginBottom:"1.4rem"}}>
          FULL-STACK DEVELOPER
        </p>
 
        <h1 
          style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(5.5rem,15vw,15rem)", lineHeight:0.87, margin:0, marginBottom:"0.15rem", letterSpacing:"0.015em"}}
          >
            <span className="hero-word">
              {"UZRA".split("").map((char, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{
                    display: "inline-block",
                    color: "#F0EBE1"
                  }}
                >
                  {char}
                </span>
              ))}
            </span>


            <span className="hero-word" style={{ display: "block" }}>
              {"KHAN".split("").map((char, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{
                    display: "inline-block",
                    color: "#F05A9D",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
        </h1>
 
        <div className="hero-description" style={{ display:"flex", alignItems:"center", gap:"2rem", marginTop:"2.8rem", flexWrap:"wrap"}}>
          <div style={{ width:70, height:1, background:"linear-gradient(90deg,#F05A9D,transparent)" }} />
          <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.12rem)", color:"rgba(240,235,225,0.5)", maxWidth:480, lineHeight:1.75, margin:0 }}>
            I craft real-time systems, high-performance web apps & immersive 3D browser experiences — with a 99 Lighthouse score to prove it.
          </p>
        </div>
 
        {/* Stats */}
        <div className="hero-stats" style={{ display:"flex", gap:"3.5rem", marginTop:"3.5rem", flexWrap:"wrap"}}>
          {[{v:"<15ms",l:"API Latency"},{v:"99",l:"Lighthouse Score"},{v:"99.9%",l:"Session Uptime"},{v:"5+",l:"Projects Shipped"}].map(s => (
            <div key={s.l} style={{ borderLeft:"2px solid rgba(240,90,157,0.28)", paddingLeft:"1.2rem" }}>
              <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2.2rem", color:"#F05A9D", letterSpacing:"0.04em", lineHeight:1 }}>{s.v}</div>
              <div style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", color:"rgba(240,235,225,0.28)", letterSpacing:"0.12em", marginTop:"0.2rem" }}>{s.l}</div>
            </div>
          ))}
        </div>
 
        {/* CTAs */}
        <div className="hero-ctas" style={{ display:"flex", gap:"1rem", marginTop:"3rem", flexWrap:"wrap"}}>
          <MagneticButton
            href="#work"
            variant="primary"
          >
            VIEW WORK ↓
          </MagneticButton>
          <MagneticButton
            href="#contact"
            variant="secondary"
          >
            CONTACT ME
          </MagneticButton>

          <MagneticButton
            href="/3d-room"
            variant="secondary"
          >
            ENTER 3D EXPERIENCE ✦
          </MagneticButton>
        </div>
      </div>
 
      {/* Scroll indicator */}
      <div
        className="hero-scroll"
        style={{
          position:"absolute",
          right:"clamp(1.5rem,4vw,4rem)",
          bottom:"2.5rem",
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          gap:8,
          opacity:0.28
        }}
      >
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.58rem", letterSpacing:"0.22em", color:"#F0EBE1", writingMode:"vertical-rl" }}>SCROLL</span>
        <div style={{ width:1, height:52, background:"linear-gradient(to bottom,#F0EBE1,transparent)" }} />
      </div>
    </section>

  )
}

// Work
function Work() {
  const galleryRef = useRef(null);
  const trackRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();


  const projects = PORTFOLIO_DATA.projects;
  const total = projects.length;

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const track = trackRef.current;

    if (!gallery || !track ) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - gallery.clientWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",

        scrollTrigger: {
          trigger: gallery,

          // The CARDS viewport gets pinned,
          // NOT the entire Projects section.
          start: "top 64px",

          end: () => `+=${getDistance()}`,

          pin: true,
          scrub: 1,

          invalidateOnRefresh: true,
          anticipatePin: 1,
          markers: false,
        },
      });
    }, gallery);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="work"
      style={{
        position: "relative",
        background: "#080808",
        overflow: "visible",
        paddingTop: "3.5rem",
      }}
    >

      {/* =========================
          PROJECTS HEADING
          This scrolls normally.
      ========================== */}
      <div
        style={{
          position: "relative",
          marginLeft: "clamp(1.5rem, 4vw, 4rem)",
          marginRight: "clamp(1.5rem, 4vw, 4rem)",
          marginBottom: "4rem",
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: "0.68rem",
            color: "#F05A9D",
            letterSpacing: "0.22em",
            margin: "0 0 0.6rem",
          }}
        >
          02 / SELECTED WORK
        </p>

        <h2 style={{ margin: 0 }}>
          <RevealText
            text="PROJECTS"
            as="span"
            className="projects-title"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(4rem, 8vw, 8rem)",
              color: "#F0EBE1",
              letterSpacing: "0.04em",
              lineHeight: 0.9,
            }}
          />
        </h2>
      </div>


      {/* =========================
          PINNED PROJECT VIEWPORT
          ONLY THIS PART GETS PINNED.
      ========================== */}
      <div
        ref={galleryRef}
        style={{
          position: "relative",
          width: "100%",
          height: isMobile
            ? "calc(100svh - 64px)"
            : "calc(100vh - 64px)",
          overflow: "hidden",
          background: "#080808",
        }}
      >

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            top: "2rem",
            right: "clamp(1.5rem, 4vw, 4rem)",
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            zIndex: 20,
            opacity: 0.45,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: "0.58rem",
              color: "rgba(240,235,225,0.5)",
              letterSpacing: "0.14em",
            }}
          >
            SCROLL TO EXPLORE
          </span>

          <span
            style={{
              width: 26,
              height: 1,
              background: "rgba(240,235,225,0.5)",
            }}
          />
        </div>


        {/* =========================
            HORIZONTAL TRACK
        ========================== */}
        <div
          ref={trackRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            gap: "7vw",
            width: "max-content",
            height: "100%",
            paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
            paddingRight: "12vw",
            boxSizing: "border-box",
          }}
        >

          {projects.map((p, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <article
                key={p.id}
                className="project-slide"
                onClick={() => navigate(`/project/${p.id}`)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: isMobile ? "calc(100vw - 32px)" : "min(76vw, 980px)",
                  height: isMobile
                    ? "55vh"
                    : "min(76vh, 610px)",
                  flexShrink: 0,
                  position: "relative",
                  cursor: "pointer",
                  padding: isMobile ? "1rem" : "1.6rem",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",

                  border: isHovered
                    ? "1px solid rgba(240,90,157,0.45)"
                    : "1px solid rgba(240,235,225,0.09)",

                  background: isHovered
                    ? "rgba(240,90,157,0.035)"
                    : "rgba(240,235,225,0.018)",

                  transition:
                    "border-color 0.35s ease, background 0.35s ease, transform 0.35s ease",

                  transform: isHovered
                    ? "translateY(-8px)"
                    : "translateY(0)",
                }}
              >
                {/* Ghost number */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "4rem",
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: isMobile ? "5rem" : "clamp(8rem, 15vw, 12rem)",
                    color: "rgba(240,235,225,0.025)",
                    lineHeight: 0.8,
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* TOP META */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.9rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.65rem",
                      color: "#F05A9D",
                      letterSpacing: "0.12em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </span>

                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: "rgba(240,235,225,0.08)",
                    }}
                  />

                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.6rem",
                      color: "#F05A9D",
                      background: "rgba(240,90,157,0.07)",
                      border: "1px solid rgba(240,90,157,0.25)",
                      borderRadius: 3,
                      padding: "6px 11px",
                      letterSpacing: "0.1em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.category}
                  </span>
                </div>

                {/* TITLE */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "clamp(2.8rem, 5vw, 5rem)",
                      color: "#F0EBE1",
                      lineHeight: 0.9,
                      letterSpacing: "0.035em",
                      margin: 0,
                    }}
                  >
                    {p.title}
                  </h3>

                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.6rem",
                      color: "rgba(240,235,225,0.28)",
                      letterSpacing: "0.12em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.year}
                  </span>
                </div>

                {/* MAIN CONTENT */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "1.45fr 0.8fr",

                    gridTemplateRows: isMobile
                      ? "auto 1fr"
                      : undefined,

                    gap: isMobile ? "0.9rem" : "1.4rem",

                    flex: 1,
                    minHeight: 0,
                  }}
                >

                  {/* VIDEO */}
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      bottom: 2,
                      borderRadius: 5,
                      border: "1px solid rgba(240,235,225,0.08)",
                      background: "#111",
                      height: isMobile ? "80%" : "90%",
                      width: isMobile ? "100%" : "90%",
                      aspectRatio: isMobile ? "16 / 9" : undefined,
                    }}
                  >
                    {p.videoUrl ? (
                      <video
                        src={p.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",

                          opacity: isHovered ? 1 : 0.78,

                          transform: isHovered
                            ? "scale(1.025)"
                            : "scale(1)",

                          transition:
                            "opacity 0.4s ease, transform 0.6s ease",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Fira Code', monospace",
                          fontSize: "0.65rem",
                          color: "rgba(240,235,225,0.25)",
                          letterSpacing: "0.12em",
                        }}
                      >
                        PROJECT PREVIEW
                      </div>
                    )}


                    {/* LIVE DEMO */}
                    <span
                      style={{
                        position: "absolute",
                        top: "0.8rem",
                        left: "0.8rem",
                        fontFamily: "'Fira Code', monospace",
                        fontSize: isMobile ? "0.3rem" : "0.5rem",
                        color: "#F0EBE1",
                        background: "rgba(8,8,8,0.72)",
                        border: "1px solid rgba(240,235,225,0.15)",
                        padding: "5px 8px",
                        borderRadius: 3,
                        letterSpacing: "0.12em",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      LIVE DEMO
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      minWidth: 0,
                      padding: "0 0 0 1.2rem",
                      borderLeft: "1px solid rgba(240,235,225,0.08)",
                      transform: "translateY(-20px)",
                      gap: "1.2rem"
                    }}
                  >

                    {/* Category / summary */}
                    <div>
                      <div
                        style={{
                          fontFamily: "'Fira Code', monospace",
                          fontSize: "0.55rem",
                          color: "#F05A9D",
                          letterSpacing: "0.15em",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {p.category?.toUpperCase()}
                      </div>

                      <p
                        style={{
                          fontFamily: "'Cabinet Grotesk', sans-serif",
                          fontSize: "0.70rem",
                          color: "rgba(240,235,225,0.5)",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {p.summary}
                      </p>
                    </div>

                    {/* TECH STACK */}
                    <div>
                      <div
                        style={{
                          fontFamily: "'Fira Code', monospace",
                          fontSize: "0.52rem",
                          color: "rgba(240,235,225,0.25)",
                          letterSpacing: "0.13em",
                          marginBottom: "0.7rem",
                        }}
                      >
                        BUILT WITH
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.4rem",
                        }}
                      >
                        {p.tech.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            style={{
                              fontFamily: "'Fira Code', monospace",
                              fontSize: "0.45rem",
                              color: "rgba(240,235,225,0.42)",
                              border:
                                "1px solid rgba(240,235,225,0.1)",
                              padding: "5px 7px",
                              borderRadius: 3,
                              letterSpacing: "0.03em",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    

                  </div>
                </div>

                {/* FOOTER */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 3,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginTop: "1rem",
                    paddingTop: "0.8rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.55rem",
                      color: isHovered
                        ? "#F05A9D"
                        : "rgba(240,235,225,0.28)",
                      letterSpacing: "0.12em",
                      transition: "color 0.3s ease",
                    }}
                  >
                    VIEW PROJECT ↗
                  </span>
                </div>
              </article>
            );
          })}

        </div>


        

      </div>
    </section>
  );
}

// Skills — magnetic tilt cards with scroll-triggered reveal
function SkillCard({ skill, is3D, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 600,
      });

      if (glow) {
        gsap.to(glow, {
          x: x - 60,
          y: y - 60,
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      });
      if (glow) {
        gsap.to(glow, { opacity: 0, duration: 0.3 });
      }
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const accent = is3D ? "#C8FF00" : "#F05A9D";

  return (
    <div
      ref={cardRef}
      className="skill-card"
      data-h
      style={{
        position: "relative",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        fontFamily: "'Fira Code',monospace",
        fontSize: "0.8rem",
        letterSpacing: "0.04em",
        color: "#F0EBE1",
        background: "rgba(240,235,225,0.03)",
        border: "1px solid rgba(240,235,225,0.09)",
        borderRadius: 6,
        padding: "16px 20px",
        cursor: "default",
        willChange: "transform",
      }}
    >
      {/* Cursor-follow glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          pointerEvents: "none",
          opacity: 0,
          top: 0,
          left: 0,
        }}
      />
      {/* Ghost index */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 10,
          top: 6,
          fontFamily: "'Bebas Neue',cursive",
          fontSize: "2.2rem",
          color: "rgba(240,235,225,0.03)",
          pointerEvents: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 8px ${accent}`,
            flexShrink: 0,
          }}
        />
        <span>{skill}</span>
      </div>

      {/* Bottom accent line that grows on hover */}
      <div
        className="skill-card-line"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 2,
          width: "0%",
          background: accent,
          transition: "width 0.35s ease",
        }}
      />

      <style>{`
        .skill-card:hover {
          border-color: ${accent}66 !important;
          background: ${accent}0d !important;
        }
        .skill-card:hover .skill-card-line {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

function Skills() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skill cards reveal
      gsap.fromTo(
        ".skill-card",
        {
          opacity: 0,
          yPercent: 30,
          scale: 0.96,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          opacity: 1,
          yPercent: 0,
          scale: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.65,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Category labels reveal
      gsap.fromTo(
        ".skill-group-label",
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        padding: "8rem clamp(1.5rem, 4vw, 4rem)",
        background: "rgba(240,235,225,0.018)",
        borderTop: "1px solid rgba(240,235,225,0.06)",
        borderBottom: "1px solid rgba(240,235,225,0.06)",
        position: "relative",

        // IMPORTANT:
        // Do not add overflow:hidden / auto / clip here.
        overflow: "visible",
      }}
    >
      {/* =========================
          BACKGROUND WORD
      ========================== */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-2rem",
          right: "-1rem",
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(6rem, 14vw, 14rem)",
          color: "rgba(240,235,225,0.02)",
          letterSpacing: "0.04em",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        SKILLS
      </div>

      {/* =========================
          TWO COLUMN LAYOUT
      ========================== */}
      <div
        style={{
          display: isMobile ? "block" : "grid",

          gridTemplateColumns: isMobile
            ? undefined
            : "minmax(240px, 0.8fr) minmax(0, 2fr)",

          gap: isMobile ? "3rem" : "7rem",

          alignItems: "start",

          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ==================================================
            LEFT COLUMN — STICKY / PINNED
        ================================================== */}
        <div
          className="skills-intro"
          style={{
            position: isMobile ? "relative" : "sticky",

            // Leave room for your fixed navbar
            top: isMobile ? "auto" : "120px",

            alignSelf: "start",

            height: "fit-content",

            zIndex: 5,
          }}
        >
          {/* Section number */}
          <p
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: "0.68rem",
              color: "#F05A9D",
              letterSpacing: "0.22em",
              margin: "0 0 0.5rem",
            }}
          >
            03 / SKILLS
          </p>

          {/* Main heading */}
          <h2
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(3.5rem, 5.5vw, 5.5rem)",
              color: "#F0EBE1",
              margin: 0,
              letterSpacing: "0.04em",
              lineHeight: 0.95,
            }}
          >
            TECH
            <br />
            ARSENAL
          </h2>

          {/* Pink accent */}
          <div
            style={{
              width: 44,
              height: 3,
              background: "#F05A9D",
              margin: "1.5rem 0",
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              color: "rgba(240,235,225,0.38)",
              fontSize: "0.88rem",
              lineHeight: 1.72,
              maxWidth: 260,
              margin: 0,
            }}
          >
            From intelligent systems and APIs to high-performance interfaces
            and immersive 3D experiences.
          </p>

          {/* Scroll indicator */}
          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginTop: "3rem",
                opacity: 0.35,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 1,
                  background: "#F05A9D",
                }}
              />

              <span
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "0.55rem",
                  color: "#F0EBE1",
                  letterSpacing: "0.12em",
                }}
              >
                SCROLL
              </span>
            </div>
          )}
        </div>

        {/* ==================================================
            RIGHT COLUMN — NORMAL PAGE SCROLL
        ================================================== */}
        <div
          className="skills-list"
          style={{
            display: "flex",
            flexDirection: "column",

            // Space between skill categories
            gap: "4.5rem",

            minWidth: 0,

            // IMPORTANT:
            // No overflowY here.
            // The page itself scrolls.
            overflow: "visible",
          }}
        >
          {SKILLS.map((group, groupIndex) => (
            <div
              key={group.group}
              className="skill-group"
            >
              {/* =========================
                  CATEGORY HEADER
              ========================== */}
              <div
                className="skill-group-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.4rem",
                }}
              >
                {/* Category name */}
                <span
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "1.25rem",
                    letterSpacing: "0.14em",
                    color: "#F05A9D",
                    whiteSpace: "nowrap",
                  }}
                >
                  {group.group}
                </span>

                {/* Divider */}
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(240,235,225,0.07)",
                  }}
                />

                {/* Category number */}
                <span
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "0.5rem",
                    color: "rgba(240,235,225,0.18)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
              </div>

              {/* =========================
                  SKILL CARDS
              ========================== */}
              <div
                style={{
                  display: "grid",

                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(auto-fill, minmax(180px, 1fr))",

                  gap: "0.85rem",
                }}
              >
                {group.items.map((skill, i) => {
                  const is3D = [
                    "Three.js",
                    "React Three Fiber",
                    "Blender",
                    "WebGL / GLSL",
                  ].includes(skill);

                  return (
                    <SkillCard
                      key={skill}
                      skill={skill}
                      is3D={is3D}
                      index={i}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Experience() {
  return (
    <section id="experience" style={{ padding:"8rem clamp(1.5rem,4vw,4rem)" }}>
      <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.68rem", color:"#F05A9D", letterSpacing:"0.22em", marginBottom:"0.5rem" }}>04 / EXPERIENCE</p>
      <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(3rem,6vw,5.5rem)", color:"#F0EBE1", margin:0, letterSpacing:"0.04em", lineHeight:1, marginBottom:"5rem" }}>HISTORY</h2>
 
      {/**Internship */}
      <div 
        style={{ 
          display:"grid", 
          gridTemplateColumns: 
            window.innerWidth <= 900
              ? "1fr"
              : "180px 1fr",
          gap: window.innerWidth <= 900
            ? "2rem"
            : "4rem",
          paddingBottom:"4.5rem", 
          borderBottom:"1px solid rgba(240,235,225,0.07)", marginBottom:"4.5rem" 
          }}
        >
        <div>
          <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"rgba(240,235,225,0.28)", letterSpacing:"0.1em", margin:0, lineHeight:1.7 }}>JUNE 2026<br/>JULY 2026</p>
          <div style={{ width:28, height:2, background:"#F05A9D", marginTop:"1rem" }} />
        </div>
        <div>
          <h3 
            style={{ 
              fontFamily:"'Bebas Neue',cursive", 
              fontSize:
                window.innerWidth <= 900
                  ? "1.55rem"
                  : "2.1rem", 
              color:"#F0EBE1", 
              margin:0, 
              letterSpacing:"0.06em" 
              }}>
              FRONTEND DEVELOPER INTERN
            </h3>
          <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", color:"#F05A9D", fontSize:"0.85rem", margin:"0.3rem 0 1.8rem", letterSpacing:"0.05em" }}>
            PitchMatter Holdings Inc · Remote
          </p>
          <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
            {[
                "Conducted comprehensive QA testing across the Zynk.ing platform, identifying functional, UI/UX, and edge-case issues with prioritized bug reports and reproduction steps.",
                "Designed high-fidelity Figma interfaces for Expert Dashboard modules including Session Types, Availability, Earnings & Rewards, and Tax & Invoicing.",
                "Created detailed developer handoff documentation covering design systems, component specifications, responsive layouts, accessibility guidelines, and implementation notes.",
                "Collaborated with UI/UX designers to refine product workflows and propose usability improvements for key platform features.",
                "Contributed to product planning through UX analysis, feature recommendations, and structured documentation for frontend implementation.",
            ].map(pt => (
              <li 
                key={pt} 
                style={{ 
                  fontFamily:"'Cabinet Grotesk',sans-serif", 
                  color:"rgba(240,235,225,0.52)", 
                  fontSize:
                    window.innerWidth <= 900
                      ? "0.82rem"
                      : "0.92rem",
                  lineHeight:
                    window.innerWidth <= 900
                      ? 1.9
                      : 1.72,
                  paddingLeft:"1.2rem", 
                  position:"relative" 
                }}
              >
                <span style={{ position:"absolute", left:0, color:"#C8FF00", fontSize:"0.68rem" }}>▹</span>{pt}
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* Freelance */}
      <div 
        style={{ 
          display:"grid", 
          gridTemplateColumns: 
            window.innerWidth <= 900
              ? "1fr"
              : "180px 1fr",
          gap: window.innerWidth <= 900
            ? "2rem"
            : "4rem",
          paddingBottom:"4.5rem", 
          borderBottom:"1px solid rgba(240,235,225,0.07)", marginBottom:"4.5rem" 
          }}
        >
        <div>
          <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"rgba(240,235,225,0.28)", letterSpacing:"0.1em", margin:0, lineHeight:1.7 }}>MARCH 2026<br/>APRIL 2026</p>
          <div style={{ width:28, height:2, background:"#F05A9D", marginTop:"1rem" }} />
        </div>
        <div>
          <h3 
            style={{ 
              fontFamily:"'Bebas Neue',cursive", 
              fontSize:
                window.innerWidth <= 900
                  ? "1.55rem"
                  : "2.1rem", 
              color:"#F0EBE1", 
              margin:0, 
              letterSpacing:"0.06em" 
              }}>
              FREELANCE FULL-STACK DEVELOPER
            </h3>
          <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", color:"#F05A9D", fontSize:"0.85rem", margin:"0.3rem 0 1.8rem", letterSpacing:"0.05em" }}>
            Self-Employed · Remote
          </p>
          <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
            {[
                "Built core frontend architecture for an NTA-style NEET/JEE mock test platform using React, TypeScript, Tailwind CSS, and Supabase.",
                "Developed responsive exam workflows including timer logic, question palette navigation, and real-time test-state handling.",
                "Architected scalable foundations for analytics dashboards, leaderboard systems, and question management interfaces.",
                "Implemented modern component-driven UI systems inspired by production EdTech platforms.",
                "Collaborated directly with the client on milestone planning, product specifications, and platform architecture.",
            ].map(pt => (
              <li 
                key={pt} 
                style={{ 
                  fontFamily:"'Cabinet Grotesk',sans-serif", 
                  color:"rgba(240,235,225,0.52)", 
                  fontSize:
                    window.innerWidth <= 900
                      ? "0.82rem"
                      : "0.92rem",
                  lineHeight:
                    window.innerWidth <= 900
                      ? 1.9
                      : 1.72,
                  paddingLeft:"1.2rem", 
                  position:"relative" 
                }}
              >
                <span style={{ position:"absolute", left:0, color:"#C8FF00", fontSize:"0.68rem" }}>▹</span>{pt}
              </li>
            ))}
          </ul>
        </div>
      </div>

      
 
      {/* Education */}
      <div 
        style={{ 
          display:"grid", 
          gridTemplateColumns:
            window.innerWidth <= 900
              ? "1fr"
              : "180px 1fr",

          gap:
            window.innerWidth <= 900
              ? "2rem"
              : "4rem",
        }}
      >
        <div>
          <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"rgba(240,235,225,0.28)", letterSpacing:"0.1em", margin:0, lineHeight:1.7 }}>2019<br/>2024</p>
          <div style={{ width:28, height:2, background:"rgba(200,255,0,0.38)", marginTop:"1rem" }} />
        </div>
        <div>
          <h3 
            style={{ 
              fontFamily:"'Bebas Neue',cursive", 
              fontSize:
                window.innerWidth <= 900
                  ? "1.55rem"
                  : "2.1rem", 
              color:"#F0EBE1", 
              margin:0, 
              letterSpacing:"0.06em" 
              }}
          >
              EDUCATION
          </h3>
          <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", color:"rgba(240,235,225,0.38)", fontSize:"0.85rem", margin:"0.3rem 0 1.8rem" }}>Mahatma Gandhi Kashi Vidyapith, Varanasi</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
            {[{d:"M.Sc. Physics",y:"2022 – 2024"},{d:"B.Sc. Science",y:"2019 – 2022"}].map(e => (
              <div key={e.d} style={{ display:"flex", gap:"2.5rem", alignItems:"center" }}>
                <span style={{ fontFamily:"'Cabinet Grotesk',sans-serif", color:"#F0EBE1", fontSize:"1rem", fontWeight:500 }}>{e.d}</span>
                <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.63rem", color:"rgba(240,235,225,0.24)", letterSpacing:"0.08em" }}>{e.y}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function Contact() {
  return (
    <section id="contact" style={{ padding:"8rem clamp(1.5rem,4vw,4rem)", borderTop:"1px solid rgba(240,235,225,0.06)", position:"relative", overflow:"hidden" }}>
      {/* Ghost text */}
      <div style={{ position:"absolute", bottom:"-3rem", left:"-1rem", fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(5rem,18vw,18rem)", color:"rgba(240,235,225,0.022)", letterSpacing:"0.04em", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>
        CONTACT
      </div>
      <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.68rem", color:"#C8FF00", letterSpacing:"0.22em", marginBottom:"0.5rem" }}>05 / CONTACT</p>
      <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(3.5rem,9vw,9rem)", color:"#F0EBE1", margin:0, letterSpacing:"0.02em", lineHeight:0.92, marginBottom:"3.5rem" }}>
        LET'S MAKE<br/><span style={{ color:"#F05A9D" }}>SOMETHING</span><br/>GREAT.
      </h2>
 
      <a href="mailto:uzrakhan539@gmail.com" data-h style={{ display:"inline-block", fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(1.3rem,2.5vw,2.1rem)", color:"#F0EBE1", textDecoration:"none", letterSpacing:"0.07em", borderBottom:"2px solid #C8FF00", paddingBottom:5, transition:"color 0.2s", marginBottom:"3.5rem" }}
        onMouseEnter={e=>(e.target).style.color="#C8FF00"}
        onMouseLeave={e=>(e.target).style.color="#F0EBE1"}>
        uzrakhan539@gmail.com ↗
      </a>
 
      <div style={{ display:"flex", gap:"2.5rem", flexWrap:"wrap" }}>
        {[{label:"GitHub",href:"https://github.com/Uzrakhan"},{label:"LinkedIn",href:"https://linkedin.com/in/uzra-khan-40b472272"},{label:"Portfolio",href:"#"}].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" data-h style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.7rem", color:"rgba(240,235,225,0.28)", textDecoration:"none", letterSpacing:"0.14em", transition:"color 0.2s" }}
            onMouseEnter={e=>(e.target).style.color="#C8FF00"}
            onMouseLeave={e=>(e.target).style.color="rgba(240,235,225,0.28)"}>
            {l.label} ↗
          </a>
        ))}
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer style={{ padding:"1.4rem clamp(1.5rem,4vw,4rem)", borderTop:"1px solid rgba(240,235,225,0.05)", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem" }}>
      <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.62rem", color:"rgba(240,235,225,0.14)", letterSpacing:"0.1em" }}>© 2025 UZRA KHAN</span>
      <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.62rem", color:"rgba(240,235,225,0.14)", letterSpacing:"0.1em" }}>DESIGNED & CODED WITH INTENTION</span>
    </footer>
  );
}



// Root
export default function Portfolio() {
  const [open, setOpen] = useState(false);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    });

    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Mask Slide-Up character entry execution
     tl.fromTo(".hero-char", 
      {
        opacity: 0,
        scale: 0.6,
        rotationZ: () => gsap.utils.random(-20,20),
        yPercent: 20
      },
      {
        opacity: 1,
        scale: 1,
        rotationZ: 0,
        yPercent: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: "power4.out",
      },
      0.3
     )

     // 1. TOP STATUS
      tl.fromTo(
        ".hero-status",
        {
          opacity: 0,
          y: -15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0
      );


      // 2. ROLE
      tl.fromTo(
        ".hero-role",
        {
          opacity: 0,
          y: 20,
          letterSpacing: "0.45em",
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.24em",
          duration: 0.8,
          ease: "power3.out",
        },
        0.18
      );


      // 3. NAME — CODROPS EFFECT 1
      tl.fromTo(
        ".hero-char",
        {
          opacity: 0,
          scale: 0.6,
          rotationZ: () => gsap.utils.random(-20, 20),
          yPercent: 20,
        },
        {
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          yPercent: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
        },
        0.3
      );


      // 4. DESCRIPTION
      tl.fromTo(
        ".hero-description",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0.85
      );


      // 5. STATS
      tl.fromTo(
        ".hero-stats",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        1.05
      );


      // 6. BUTTONS
      tl.fromTo(
        ".hero-ctas",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        1.25
      );

      // 7. BACKGROUND GRID
      tl.fromTo(
        ".hero-grid",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        0
      );


      // 8. PINK GLOW
      tl.fromTo(
        ".hero-glow",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
        },
        0.1
      );


      // 9. SCROLL INDICATOR
      tl.fromTo(
        ".hero-scroll",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 0.28,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        1.6
      );


      // Fade-in subtitle tracking indicator simultaneously 
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      );  
    });

    gsap.fromTo(
      ".projects-char",
      {
        opacity: 0,
        yPercent: 110,
        rotateZ: 4,
        scaleY: 1.4,
      },
      {
        opacity: 1,
        yPercent: 0,
        rotateZ: 0,
        scaleY: 1,
        duration: 0.9,
        stagger: 0.045,
        ease: "power4.out",

        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      ctx.revert()
      lenis.destroy()
      gsap.ticker.remove(lenis.ref)
    }
  }, [open]);


  // Clean, high-performance Character Wrapping Mechanism
  const splitPhrase = (phrase) => {
    return phrase.split(" ").map((word, wIdx) => (
      <span 
        key={wIdx} 
        className="inline-block overflow-hidden whitespace-nowrap pr-[0.28em] align-bottom"
      >
        {word.split("").map((char,cIdx) => (
          <span 
            key={cIdx} 
            className="reveal-char inline-block will-change-transform"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            {char}
          </span>
        ))}
      </span>
    ))
  }

  const splitWords = (text) => {
    return text.split(/\s+/).map((word, index) => (
      <span
        key={index}
        className="bio-word inline-block text-[#F0EBE1]/[0.14]"
      >
        {word}
      </span>
    ));
  };

  return (
    <>

      <style>{`
        html,
        body,
        #root {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        body {
          overflow-y: auto;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        /* =========================
          MARQUEE
        ========================== */

        @keyframes mq {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes mqR {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap" rel="stylesheet" />
 
 
      <div 
        style={{ 
          background: "#080808",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "100%",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        <Grain />
        <Cursor />
        <Nav open={open} setOpen={setOpen}/>
        <main>
          <Hero />
          <Marquee />
          <Work />
          <Marquee rev />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}