import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { PORTFOLIO_DATA } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

// smooth scroll feel
ScrollTrigger.defaults({
  scrub: 1,
});




const SKILLS = [
  { group: "Frontend", items: ["React", "TypeScript", "JavaScript ES6+", "Tailwind CSS", "Framer Motion"] },
  { group: "3D & Graphics", items: ["Three.js", "React Three Fiber", "Blender", "GSAP", "WebGL / GLSL"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "Socket.io", "MongoDB", "PostgreSQL"] },
  { group: "Tools & Auth", items: ["Firebase", "Supabase", "Git / GitHub", "Jest", "Vite", "Vercel", "Cloudflare"] },
];

const MARQUEE = ["REACT","THREE.JS","TYPESCRIPT","REAL-TIME SYSTEMS","REACT THREE FIBER","BLENDER","NODE.JS","MONGODB","SOCKET.IO","FULL-STACK","3D WEB","PERFORMANCE"];


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

    window.addEventListener("mousemove", onMove);

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
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position:"fixed", width:5, height:5, background:"#C8FF00", borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9999 }} />
      <div ref={ring} style={{ position:"fixed", width:34, height:34, border:"1.5px solid rgba(200,255,0,0.45)", borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9998, transition:"transform 0.35s ease, border-color 0.3s, opacity 0.3s" }} />
    </>
  );
}

// Marquee
function Marquee({ rev = false }) {
  const items = [...MARQUEE, ...MARQUEE];

  return (
    <div style={{ overflow:"hidden", borderTop:"1px solid rgba(240,235,225,0.07)", borderBottom:"1px solid rgba(240,235,225,0.07)", padding:"13px 0", background:"rgba(200,255,0,0.015)" }}>
      <div style={{ display:"flex", width:"max-content", animation:`mq${rev?"R":""} 30s linear infinite` }}>
        {items.map((t,i) => (
          <span key={i} style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"0.9rem", letterSpacing:"0.22em", color: i%2===0 ? "rgba(240,235,225,0.22)" : "#C8FF00", marginRight:"3rem", whiteSpace:"nowrap" }}>
            {t} <span style={{ color:"rgba(240,235,225,0.08)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Nav
function Nav() {

  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);

    window.addEventListener("scroll", fn);

    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

  }, [open]);

  const links = ["Work", "Skills", "Experience", "Contact"];

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
          UZRA<span style={{ color:"#C8FF00" }}>.</span>
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
              href={`#${l.toLowerCase()}`}
              data-h
              style={{
                fontFamily:"'Fira Code',monospace",
                fontSize:"0.7rem",
                color:"rgba(240,235,225,0.4)",
                textDecoration:"none",
                letterSpacing:"0.08em",
                transition:"color 0.2s"
              }}
              onMouseEnter={e => e.target.style.color="#C8FF00"}
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
              background:"#C8FF00",
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
            background:"#C8FF00",
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

// Hero
function Hero() {
  const [g, setG] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setG(true);
      setTimeout(() => setG(false), 110);
    }, 4500);
    return () => clearInterval(id);
  }, []);


  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 clamp(1.5rem,4vw,4rem)", paddingBottom:"7rem", position:"relative", overflow:"hidden" }}>
      {/* Grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(240,235,225,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(240,235,225,0.025) 1px,transparent 1px)", backgroundSize:"90px 90px", pointerEvents:"none" }} />
      {/* Glow */}
      <div style={{ position:"absolute", top:"12%", right:"-8%", width:520, height:520, borderRadius:"50%", background:"radial-gradient(circle,rgba(200,255,0,0.07) 0%,transparent 65%)", pointerEvents:"none" }} />
 
      {/* Status bar */}
      <div style={{ position:"absolute", top:84, left:"clamp(1.5rem,4vw,4rem)", right:"clamp(1.5rem,4vw,4rem)", display:"flex", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#C8FF00", animation:"pulse 2s ease infinite" }} />
          <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"rgba(240,235,225,0.3)", letterSpacing:"0.14em" }}>AVAILABLE FOR WORK</span>
        </div>
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.63rem", color:"rgba(240,235,225,0.18)", letterSpacing:"0.1em" }}>VARANASI, INDIA — 2025</span>
      </div>
 
      <div style={{ position:"relative", zIndex:1 }}>
        <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.72rem", color:"#C8FF00", letterSpacing:"0.24em", marginBottom:"1.4rem", animation:"fadeUp 0.6s ease both" }}>
          FRONTEND-FOCUSED FULL-STACK DEVELOPER
        </p>
 
        <h1 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(5.5rem,15vw,15rem)", lineHeight:0.87, margin:0, marginBottom:"0.15rem", letterSpacing:"0.015em", animation:"fadeUp 0.7s 0.1s ease both" }}>
          <span  style={{ display:"block", color: g ? "transparent" : "#F0EBE1", textShadow: g ? "3px 0 #C8FF00, -3px 0 #ff3366" : "none", transition:"color 0.04s,text-shadow 0.04s" }}>UZRA</span>
          <span  style={{ display:"block", color:"#C8FF00", textShadow: g ? "-3px 0 #F0EBE1, 3px 0 #ff3366" : "none", transition:"text-shadow 0.04s" }}>KHAN</span>
        </h1>
 
        <div style={{ display:"flex", alignItems:"center", gap:"2rem", marginTop:"2.8rem", flexWrap:"wrap", animation:"fadeUp 0.7s 0.22s ease both" }}>
          <div style={{ width:70, height:1, background:"linear-gradient(90deg,#C8FF00,transparent)" }} />
          <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"clamp(0.95rem,1.4vw,1.12rem)", color:"rgba(240,235,225,0.5)", maxWidth:480, lineHeight:1.75, margin:0 }}>
            I craft real-time systems, high-performance web apps & immersive 3D browser experiences — with a 99 Lighthouse score to prove it.
          </p>
        </div>
 
        {/* Stats */}
        <div style={{ display:"flex", gap:"3.5rem", marginTop:"3.5rem", flexWrap:"wrap", animation:"fadeUp 0.7s 0.35s ease both" }}>
          {[{v:"<15ms",l:"API Latency"},{v:"99",l:"Lighthouse Score"},{v:"99.9%",l:"Session Uptime"},{v:"5+",l:"Projects Shipped"}].map(s => (
            <div key={s.l} style={{ borderLeft:"2px solid rgba(200,255,0,0.28)", paddingLeft:"1.2rem" }}>
              <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2.2rem", color:"#C8FF00", letterSpacing:"0.04em", lineHeight:1 }}>{s.v}</div>
              <div style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", color:"rgba(240,235,225,0.28)", letterSpacing:"0.12em", marginTop:"0.2rem" }}>{s.l}</div>
            </div>
          ))}
        </div>
 
        {/* CTAs */}
        <div style={{ display:"flex", gap:"1rem", marginTop:"3rem", flexWrap:"wrap", animation:"fadeUp 0.7s 0.48s ease both" }}>
          <a href="#work" data-h style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.73rem", letterSpacing:"0.1em", color:"#080808", background:"#C8FF00", padding:"14px 34px", borderRadius:4, textDecoration:"none", transition:"transform 0.2s,box-shadow 0.2s", boxShadow:"0 0 0 rgba(200,255,0,0)" }}
            onMouseEnter={e => { (e.target).style.transform="translateY(-3px)"; (e.target).style.boxShadow="0 12px 30px rgba(200,255,0,0.3)"; }}
            onMouseLeave={e => { (e.target).style.transform="translateY(0)"; (e.target).style.boxShadow="0 0 0 rgba(200,255,0,0)"; }}>
            VIEW WORK ↓
          </a>
          <a href="#contact" data-h style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.73rem", letterSpacing:"0.1em", color:"rgba(240,235,225,0.65)", background:"transparent", padding:"14px 34px", border:"1px solid rgba(240,235,225,0.14)", borderRadius:4, textDecoration:"none", transition:"all 0.2s" }}
            onMouseEnter={e => { (e.target).style.borderColor="rgba(200,255,0,0.5)"; (e.target).style.color="#C8FF00"; }}
            onMouseLeave={e => { (e.target).style.borderColor="rgba(240,235,225,0.14)"; (e.target).style.color="rgba(240,235,225,0.65)"; }}>
            CONTACT ME
          </a>
          <a
            href="/3d-room"
            data-h
            style={{
              fontFamily:"'Fira Code',monospace",
              fontSize:"0.73rem",
              letterSpacing:"0.1em",
              color:"#C8FF00",
              background:"rgba(200,255,0,0.06)",
              padding:"14px 34px",
              border:"1px solid rgba(200,255,0,0.3)",
              borderRadius:4,
              textDecoration:"none",
              transition:"all 0.25s"
            }}
            onMouseEnter={e => {
              e.target.style.background = "#C8FF00";
              e.target.style.color = "#080808";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={e => {
              e.target.style.background = "rgba(200,255,0,0.06)";
              e.target.style.color = "#C8FF00";
              e.target.style.transform = "translateY(0)";
            }}
          >
            ENTER 3D EXPERIENCE ✦
          </a>
        </div>
      </div>
 
      {/* Scroll indicator */}
      <div style={{ position:"absolute", right:"clamp(1.5rem,4vw,4rem)", bottom:"2.5rem", display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:0.28 }}>
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.58rem", letterSpacing:"0.22em", color:"#F0EBE1", writingMode:"vertical-rl" }}>SCROLL</span>
        <div style={{ width:1, height:52, background:"linear-gradient(to bottom,#F0EBE1,transparent)" }} />
      </div>
    </section>

  )
}

// Work
function Work() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  return (
    <section id="work" style={{ padding:"8rem clamp(1.5rem,4vw,4rem)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", flexWrap:"wrap", gap:"1rem" }}>
        <div>
          <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.68rem", color:"#C8FF00", letterSpacing:"0.22em", margin:0, marginBottom:"0.5rem" }}>02 / SELECTED WORK</p>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(3rem,6vw,5.5rem)", color:"#F0EBE1", margin:0, letterSpacing:"0.04em", lineHeight:1 }}>PROJECTS</h2>
        </div>
        <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", color:"rgba(240,235,225,0.32)", fontSize:"0.9rem", maxWidth:320, lineHeight:1.65 }}>
          Each project is a problem solved, a system optimised, an experience crafted.
        </p>
      </div>
 
      <div style={{ borderTop:"1px solid rgba(240,235,225,0.07)" }}>
        {PORTFOLIO_DATA.projects.map((p, i) => {
          const isA = active === i;
          return (
            <div key={p.id} onClick={() => navigate(`/project/${p.id}`)} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
              style={{ borderBottom:"1px solid rgba(240,235,225,0.07)",cursor:"pointer" ,padding:`2.8rem 0`, paddingLeft: isA ? "0.8rem" : 0, background: isA ? "rgba(200,255,0,0.022)" : "transparent", transition:"all 0.35s ease" }}>
              <div style={{ display:"grid", gridTemplateColumns:"3.5rem 1fr auto", gap:"2.5rem", alignItems:"start" }}>
                <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.75rem", color: isA ? "#C8FF00" : "rgba(240,235,225,0.18)", letterSpacing:"0.1em", paddingTop:"0.4rem", transition:"color 0.3s" }}>
                  {String(i+1).padStart(2,"0")}
                </span>
                <div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:"1.5rem", marginBottom:"0.9rem", flexWrap:"wrap" }}>
                    <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(1.9rem,4vw,3.2rem)", color:"#F0EBE1", margin:0, letterSpacing:"0.05em" }}>{p.title}</h3>
                    <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.62rem", color:"#C8FF00", background:"rgba(200,255,0,0.09)", border:"1px solid rgba(200,255,0,0.22)", borderRadius:3, padding:"3px 10px", letterSpacing:"0.12em" }}>{p.category}</span>
                  </div>
                  <p 
                    style={{ 
                      fontFamily:"'Cabinet Grotesk',sans-serif", 
                      color:"rgba(240,235,225,0.48)", 
                      fontSize:
                        window.innerWidth <= 900
                          ? "0.82rem"
                          : "0.92rem", 
                      lineHeight:1.72, 
                      maxWidth:580, 
                      margin:0, 
                      marginBottom:"1.4rem" }}
                    >
                      {p.description}
                  </p>


                  <div
                    style={{
                      marginBottom:"1.5rem",
                      border:"1px solid rgba(240,235,225,0.08)",
                      overflow:"hidden",
                      borderRadius:"12px"
                    }}
                  >
                    <video
                      src={p.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width:"100%",
                        display:"block",
                        opacity:isA ? 1 : 0.72,
                        transition:"opacity 0.3s ease"
                      }}
                    />
                  </div>

                  {/* Metrics */}
                  <div style={{ display:"flex", gap:"2.5rem", flexWrap:"wrap", marginBottom:"1.2rem" }}>
                    {p.metrics.map(m => (
                      <div key={m.label}>
                        <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.6rem", color:"#C8FF00", letterSpacing:"0.04em", lineHeight:1 }}>{m.value}</div>
                        <div style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.58rem", color:"rgba(240,235,225,0.22)", letterSpacing:"0.1em" }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
 
                  {/* Tech */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                    {p.tech.map(t => {
                      const is3D = ["Three.js","React Three Fiber","Blender"].includes(t);
                      return (
                        <span key={t} style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", color: is3D?"#C8FF00":"rgba(240,235,225,0.32)", background: is3D?"rgba(200,255,0,0.08)":"rgba(240,235,225,0.04)", border:`1px solid ${is3D?"rgba(200,255,0,0.2)":"rgba(240,235,225,0.08)"}`, borderRadius:3, padding:"3px 9px", letterSpacing:"0.04em" }}>
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
 
                {/* Links */}
                <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem", paddingTop:"0.5rem" }}>
                  {p.live && <a href={p.live} data-h style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.64rem", color: isA?"#C8FF00":"rgba(240,235,225,0.28)", textDecoration:"none", letterSpacing:"0.1em", transition:"color 0.3s" }}>LIVE ↗</a>}
                  {p.github && <a href={p.github} data-h style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.64rem", color:"rgba(240,235,225,0.22)", textDecoration:"none", letterSpacing:"0.1em", transition:"color 0.2s" }} onMouseEnter={e=>(e.target).style.color="rgba(240,235,225,0.6)"} onMouseLeave={e=>(e.target).style.color="rgba(240,235,225,0.22)"}>CODE ⌥</a>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Skills
function Skills() {
  return (
    <section id="skills" style={{ padding:"8rem clamp(1.5rem,4vw,4rem)", background:"rgba(240,235,225,0.018)", borderTop:"1px solid rgba(240,235,225,0.06)", borderBottom:"1px solid rgba(240,235,225,0.06)" }}>
      <div 
        style={{ 
          display: "grid",
          gridTemplateColumns: 
            window.innerWidth <= 900
              ? "1fr"
              : "minmax(220px, 1fr) 2fr",

          gap: window.innerWidth <= 900
            ? "3rem"
            : "6rem",
          
          alignItems: "start"
         }}
      >
        <div
          style={{
            position: 
              window.innerWidth <= 900
                ? "relative"
                : "sticky",
            
            top: window.innerWidth <= 900
              ? "auto"
              : 100
          }}
        >
          <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.68rem", color:"#C8FF00", letterSpacing:"0.22em", margin:0, marginBottom:"0.5rem" }}>03 / SKILLS</p>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(3rem,5vw,5rem)", color:"#F0EBE1", margin:0, letterSpacing:"0.04em", lineHeight:1.05 }}>TECH<br/>ARSENAL</h2>
          <div style={{ width:44, height:3, background:"#C8FF00", margin:"1.4rem 0" }} />
          <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", color:"rgba(240,235,225,0.38)", fontSize:"0.88rem", lineHeight:1.72, maxWidth:240 }}>
            From WebGL shaders to REST APIs — the full stack, plus the 3D dimension.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"3rem" }}>
          {SKILLS.map(group => (
            <div key={group.group}>
              <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.2rem" }}>
                <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.2rem", letterSpacing:"0.14em", color:"#C8FF00" }}>{group.group}</span>
                <div style={{ flex:1, height:1, background:"rgba(240,235,225,0.06)" }} />
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem" }}>
                {group.items.map(skill => {
                  const is3D = ["Three.js","React Three Fiber","Blender","WebGL / GLSL"].includes(skill);
                  return (
                    <span key={skill} data-h style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.76rem", letterSpacing:"0.05em", color: is3D?"#C8FF00":"#F0EBE1", background: is3D?"rgba(200,255,0,0.08)":"rgba(240,235,225,0.04)", border:`1px solid ${is3D?"rgba(200,255,0,0.28)":"rgba(240,235,225,0.09)"}`, borderRadius:4, padding:"8px 18px", transition:"all 0.22s", cursor:"default" }}
                      onMouseEnter={e => { const el = e.currentTarget; el.style.background="rgba(200,255,0,0.12)"; el.style.borderColor="rgba(200,255,0,0.4)"; el.style.color="#C8FF00"; }}
                      onMouseLeave={e => { const el = e.currentTarget; el.style.background=is3D?"rgba(200,255,0,0.08)":"rgba(240,235,225,0.04)"; el.style.borderColor=is3D?"rgba(200,255,0,0.28)":"rgba(240,235,225,0.09)"; el.style.color=is3D?"#C8FF00":"#F0EBE1"; }}>
                      {skill}
                    </span>
                  )
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
      <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.68rem", color:"#C8FF00", letterSpacing:"0.22em", marginBottom:"0.5rem" }}>04 / EXPERIENCE</p>
      <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(3rem,6vw,5.5rem)", color:"#F0EBE1", margin:0, letterSpacing:"0.04em", lineHeight:1, marginBottom:"5rem" }}>HISTORY</h2>
 
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
          <div style={{ width:28, height:2, background:"#C8FF00", marginTop:"1rem" }} />
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
          <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", color:"#C8FF00", fontSize:"0.85rem", margin:"0.3rem 0 1.8rem", letterSpacing:"0.05em" }}>
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
        LET'S MAKE<br/><span style={{ color:"#C8FF00" }}>SOMETHING</span><br/>GREAT.
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
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap" rel="stylesheet" />
 
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;cursor:none}
        body{background:#080808;color:#F0EBE1;overflow-x:hidden}
        a,button{cursor:none}
 
        @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes mqR{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        @keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(200,255,0,0.35)}60%{opacity:.7;box-shadow:0 0 0 7px rgba(200,255,0,0)}}
 
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#080808}
        ::-webkit-scrollbar-thumb{background:#C8FF00;border-radius:2px}
 
        @media(max-width:900px){
          html,a,button{cursor:auto}
        }
        @media(max-width:680px){
          nav > div:last-child > a:not(:last-child){display:none}
        }
      `}</style>
 
      <div style={{ background:"#080808", minHeight:"100vh" }}>
        <Grain />
        <Cursor />
        <Nav />
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