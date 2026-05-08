import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

// ── Grain overlay (matches Landing2D) ──────────────────────────────────────
function Grain() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none", opacity: 0.038,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "180px 180px",
    }} />
  );
}

// ── Cursor (matches Landing2D) ─────────────────────────────────────────────
function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x: -200, y: -200 });
  const rPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = `${e.clientX}px`;
        dot.current.style.top  = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove);
    let raf;
    const tick = () => {
      rPos.current.x += (pos.current.x - rPos.current.x) * 0.11;
      rPos.current.y += (pos.current.y - rPos.current.y) * 0.11;
      if (ring.current) {
        ring.current.style.left = `${rPos.current.x}px`;
        ring.current.style.top  = `${rPos.current.y}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot}  style={{ position:"fixed", width:5, height:5, background:"#C8FF00", borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9999 }} />
      <div ref={ring} style={{ position:"fixed", width:34, height:34, border:"1.5px solid rgba(200,255,0,0.45)", borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9998 }} />
    </>
  );
}

// ── Nav (matches Landing2D) ────────────────────────────────────────────────
function Nav({ onBack }) {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:500, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 clamp(1.5rem,4vw,4rem)", height:64, background:sc?"rgba(8,8,8,0.92)":"transparent", backdropFilter:sc?"blur(22px)":"none", borderBottom:sc?"1px solid rgba(240,235,225,0.05)":"none", transition:"all 0.4s" }}>
      <a href="/" style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.35rem", color:"#F0EBE1", textDecoration:"none", letterSpacing:"0.18em" }}>
        UZRA<span style={{ color:"#C8FF00" }}>.</span>
      </a>
      <button onClick={onBack} style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.68rem", color:"rgba(240,235,225,0.4)", background:"transparent", border:"1px solid rgba(240,235,225,0.12)", borderRadius:3, padding:"8px 20px", cursor:"none", letterSpacing:"0.1em", transition:"all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(200,255,0,0.5)"; e.currentTarget.style.color="#C8FF00"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(240,235,225,0.12)"; e.currentTarget.style.color="rgba(240,235,225,0.4)"; }}>
        ← ALL WORK
      </button>
    </nav>
  );
}

// ── Animated counter ───────────────────────────────────────────────────────
function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setVal(target); return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(num * ease));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target); // restore original with symbol
    };
    requestAnimationFrame(tick);
  }, [target]);
  return val;
}

function MetricCard({ metric, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      border: "1px solid rgba(240,235,225,0.08)",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ${index * 0.1}s ease, transform 0.6s ${index * 0.1}s ease`,
    }}>
      {/* corner accent */}
      <div style={{ position:"absolute", top:0, left:0, width:28, height:28, borderTop:"2px solid #C8FF00", borderLeft:"2px solid #C8FF00" }} />
      <div style={{ position:"absolute", bottom:0, right:0, width:28, height:28, borderBottom:"2px solid rgba(200,255,0,0.25)", borderRight:"2px solid rgba(200,255,0,0.25)" }} />
      <div 
        style={{ 
          fontFamily:"'Bebas Neue',cursive", 
          fontSize:
            window.innerWidth <= 900
              ? "2rem"
              : "2.8rem",
          color:"#C8FF00", 
          letterSpacing:"0.04em", 
          lineHeight:1, 
          marginBottom:"0.4rem" 
        }}
      >
        {metric.value}
      </div>
      <div style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.58rem", color:"rgba(240,235,225,0.3)", letterSpacing:"0.18em", textTransform:"uppercase" }}>
        {metric.label}
      </div>
    </div>
  );
}

// ── Fade-in section wrapper ────────────────────────────────────────────────
function FadeSection({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Section label ──────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"#C8FF00", letterSpacing:"0.25em", marginBottom:"1rem", textTransform:"uppercase" }}>
      {children}
    </p>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(2rem,4vw,3.5rem)", color:"#F0EBE1", margin:0, marginBottom:"2.5rem", letterSpacing:"0.05em", lineHeight:1 }}>
      {children}
    </h2>
  );
}

// ── Tech Decision card ─────────────────────────────────────────────────────
function TechDecisionCard({ tech, reason, index }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ padding:"1.6rem 2rem", border:`1px solid ${hover ? "rgba(200,255,0,0.35)" : "rgba(240,235,225,0.07)"}`, background: hover ? "rgba(200,255,0,0.03)" : "transparent", transition:"all 0.3s ease", position:"relative" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"0.7rem" }}>
        <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.15rem", color: hover ? "#C8FF00" : "#F0EBE1", letterSpacing:"0.08em", transition:"color 0.3s" }}>{tech}</span>
        <div style={{ flex:1, height:1, background: hover ? "rgba(200,255,0,0.3)" : "rgba(240,235,225,0.06)", transition:"background 0.3s" }} />
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", color:"rgba(200,255,0,0.5)", opacity: hover ? 1 : 0, transition:"opacity 0.3s" }}>WHY?</span>
      </div>
      <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"0.9rem", color:"rgba(240,235,225,0.48)", lineHeight:1.72, margin:0 }}>{reason}</p>
    </div>
  );
}

// ── Highlight card ─────────────────────────────────────────────────────────
function HighlightCard({ text, index }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ border:`1px solid ${hover ? "rgba(200,255,0,0.35)" : "rgba(240,235,225,0.07)"}`, padding:"1.5rem 1.8rem", display:"flex", alignItems:"flex-start", gap:"1rem", background: hover ? "rgba(200,255,0,0.028)" : "transparent", transition:"all 0.3s ease" }}>
      <span style={{ color:"#C8FF00", fontSize:"0.9rem", marginTop:"0.1rem", flexShrink:0 }}>✦</span>
      <span style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"0.95rem", color: hover ? "rgba(240,235,225,0.9)" : "rgba(240,235,225,0.6)", lineHeight:1.65, transition:"color 0.3s" }}>{text}</span>
    </div>
  );
}

// ── Video player ───────────────────────────────────────────────────────────
function VideoPlayer({ src }) {
  const [playing, setPlaying] = useState(true);
  const ref = useRef(null);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  };

  return (
    <div style={{ position:"relative", borderRadius:2, overflow:"hidden", border:"1px solid rgba(240,235,225,0.08)", background:"#000" }}>
      {/* top bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, zIndex:10, display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.8rem 1rem", background:"linear-gradient(to bottom,rgba(8,8,8,0.7),transparent)" }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:"#C8FF00", animation:"pulse 2s ease infinite" }} />
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", color:"rgba(240,235,225,0.4)", letterSpacing:"0.14em" }}>LIVE DEMO</span>
      </div>
      <video ref={ref} src={src} autoPlay muted loop playsInline style={{ width:"100%", display:"block" }} />
      {/* play/pause overlay */}
      <button onClick={toggle} style={{ position:"absolute", bottom:"1rem", right:"1rem", background:"rgba(8,8,8,0.7)", border:"1px solid rgba(240,235,225,0.15)", borderRadius:3, padding:"6px 14px", color:"#C8FF00", fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", letterSpacing:"0.1em", cursor:"none", backdropFilter:"blur(8px)" }}>
        {playing ? "⏸ PAUSE" : "▶ PLAY"}
      </button>
    </div>
  );
}

// ── Adjacent project navigation ────────────────────────────────────────────
function ProjectNav({ currentId, navigate }) {
  const projects = PORTFOLIO_DATA.projects;
  const idx   = projects.findIndex(p => p.id === currentId);
  const prev  = projects[idx - 1];
  const next  = projects[idx + 1];

  return (
    <div 
      style={{ 
        display:"grid", 
        gridTemplateColumns:
          window.innerWidth <= 900
            ? "1fr"
            : "1fr 1fr",
        gap:"1px", 
        borderTop:"1px solid rgba(240,235,225,0.07)", 
        marginTop:"6rem" 
      }}
    >
      {prev ? (
        <button onClick={() => navigate(`/project/${prev.id}`)} style={{ padding:"2.5rem", textAlign:"left", background:"transparent", border:"none", cursor:"none", borderRight:"1px solid rgba(240,235,225,0.07)", transition:"background 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(200,255,0,0.025)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", color:"rgba(240,235,225,0.25)", letterSpacing:"0.18em", marginBottom:"0.5rem" }}>← PREVIOUS</p>
          <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.8rem", color:"#F0EBE1", letterSpacing:"0.06em", margin:0 }}>{prev.title}</p>
        </button>
      ) : <div />}
      {next ? (
        <button onClick={() => navigate(`/project/${next.id}`)} style={{ padding:"2.5rem", textAlign:"right", background:"transparent", border:"none", cursor:"none", transition:"background 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(200,255,0,0.025)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", color:"rgba(240,235,225,0.25)", letterSpacing:"0.18em", marginBottom:"0.5rem" }}>NEXT →</p>
          <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.8rem", color:"#F0EBE1", letterSpacing:"0.06em", margin:0 }}>{next.title}</p>
        </button>
      ) : <div />}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────
export default function ProjectDetail2D() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [headerVis, setHeaderVis] = useState(false);

  const project = PORTFOLIO_DATA.projects.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setHeaderVis(true), 80);
    return () => clearTimeout(t);
  }, [id]);

  if (!project) {
    return (
      <div style={{ minHeight:"100vh", background:"#080808", color:"#F0EBE1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"2rem" }}>
        <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"6rem", color:"rgba(200,255,0,0.15)" }}>404</span>
        <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.8rem", color:"rgba(240,235,225,0.3)", letterSpacing:"0.2em" }}>PROJECT NOT FOUND</p>
        <button onClick={() => navigate(-1)} style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.7rem", color:"#080808", background:"#C8FF00", border:"none", padding:"12px 28px", cursor:"none", letterSpacing:"0.1em" }}>GO BACK</button>
      </div>
    );
  }

  return (
    <>
      {/* ── Fonts ── */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap" rel="stylesheet" />

      <style>{`
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0 }
        html { scroll-behavior:smooth; cursor:none }
        body { background:#080808; color:#F0EBE1; overflow-x:hidden }
        a,button { cursor:none }

        @keyframes fadeUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(200,255,0,0.35)} 60%{opacity:.7;box-shadow:0 0 0 7px rgba(200,255,0,0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

        ::-webkit-scrollbar { width:3px }
        ::-webkit-scrollbar-track { background:#080808 }
        ::-webkit-scrollbar-thumb { background:#C8FF00; border-radius:2px }

        @media(max-width:900px) { html,a,button { cursor:auto } }
      `}</style>

      <div style={{ background:"#080808", minHeight:"100vh", color:"#F0EBE1" }}>
        <Grain />
        <Cursor />
        <Nav onBack={() => navigate(-1)} />

        <main style={{ paddingTop: "64px" }}>

          {/* ════════════════════════════════════════════════════
              HERO — big title + category + year
          ════════════════════════════════════════════════════ */}
          <section style={{ minHeight:"52vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 clamp(1.5rem,4vw,4rem)", paddingBottom:"5rem", position:"relative", overflow:"hidden" }}>
            {/* Grid background */}
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(240,235,225,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(240,235,225,0.022) 1px,transparent 1px)", backgroundSize:"90px 90px", pointerEvents:"none" }} />
            {/* Glow */}
            <div style={{ position:"absolute", top:"10%", right:"-5%", width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(200,255,0,0.065) 0%,transparent 65%)", pointerEvents:"none" }} />
            {/* Ghost index */}
            <div style={{ position:"absolute", bottom:"-2rem", right:"clamp(1rem,3vw,3rem)", fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(8rem,22vw,22rem)", color:"rgba(240,235,225,0.018)", letterSpacing:"0.02em", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>
              {String(PORTFOLIO_DATA.projects.findIndex(p => p.id === project.id) + 1).padStart(2,"0")}
            </div>

            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"1.5rem", marginBottom:"1.4rem", opacity: headerVis ? 1 : 0, transform: headerVis ? "translateY(0)" : "translateY(20px)", transition:"all 0.6s ease" }}>
                <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"#C8FF00", letterSpacing:"0.24em" }}>{project.category.toUpperCase()}</span>
                <div style={{ width:40, height:1, background:"rgba(200,255,0,0.4)" }} />
                <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"rgba(240,235,225,0.22)", letterSpacing:"0.18em" }}>{project.year}</span>
              </div>

              <h1 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(4.5rem,13vw,13rem)", lineHeight:0.88, letterSpacing:"0.015em", margin:0, marginBottom:"2rem", opacity: headerVis ? 1 : 0, transform: headerVis ? "translateY(0)" : "translateY(30px)", transition:"all 0.7s 0.1s ease" }}>
                {project.title}
              </h1>

              <div style={{ display:"flex", alignItems:"flex-start", gap:"2rem", maxWidth:680, opacity: headerVis ? 1 : 0, transform: headerVis ? "translateY(0)" : "translateY(20px)", transition:"all 0.7s 0.2s ease" }}>
                <div style={{ width:3, background:"#C8FF00", alignSelf:"stretch", flexShrink:0, minHeight:"3rem" }} />
                <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"clamp(1rem,1.4vw,1.1rem)", color:"rgba(240,235,225,0.52)", lineHeight:1.78, margin:0 }}>
                  {project.summary || project.description}
                </p>
              </div>

              {/* Quick links */}
              <div style={{ display:"flex", gap:"1rem", marginTop:"2.5rem", flexWrap:"wrap", opacity: headerVis ? 1 : 0, transition:"opacity 0.7s 0.35s ease" }}>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer"
                    style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.7rem", color:"#080808", background:"#C8FF00", padding:"12px 28px", textDecoration:"none", letterSpacing:"0.1em", transition:"transform 0.2s,box-shadow 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 30px rgba(200,255,0,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                    LIVE PROJECT ↗
                  </a>
                )}
                {project.github && project.github !== "#" && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                    style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.7rem", color:"rgba(240,235,225,0.55)", border:"1px solid rgba(240,235,225,0.13)", padding:"12px 28px", textDecoration:"none", letterSpacing:"0.1em", transition:"all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(200,255,0,0.5)"; e.currentTarget.style.color="#C8FF00"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(240,235,225,0.13)"; e.currentTarget.style.color="rgba(240,235,225,0.55)"; }}>
                    SOURCE CODE ⌥
                  </a>
                )}
              </div>
            </div>
          </section>

          <div style={{ padding:"0 clamp(1.5rem,4vw,4rem)" }}>

            {/* ════════════════════════════════════════════════
                VIDEO
            ════════════════════════════════════════════════ */}
            {project.videoUrl && project.videoUrl !== "YOUR_3D_ROOM_VIDEO_URL" && project.videoUrl !== "YOUR_GHOSTSPACE_VIDEO" && (
              <FadeSection style={{ marginBottom:"6rem" }}>
                <VideoPlayer src={project.videoUrl} />
              </FadeSection>
            )}

            {/* ════════════════════════════════════════════════
                METRICS
            ════════════════════════════════════════════════ */}
            {project.metrics?.length > 0 && (
              <div style={{ marginBottom:"7rem" }}>
                <FadeSection>
                  <SectionLabel>— Performance</SectionLabel>
                  <SectionHeading>By The Numbers</SectionHeading>
                </FadeSection>
                <div 
                    style={{ 
                      display:"grid", 
                      gridTemplateColumns:
                        window.innerWidth <= 900
                          ? "1fr"
                          : `repeat(${Math.min(project.metrics.length, 4)}, 1fr)`,
                      gap:
                        window.innerWidth <= 900
                          ? "1rem"
                          : "1px",
                      border:"1px solid rgba(240,235,225,0.08)" 
                      }}
                  >
                  {project.metrics.map((m, i) => (
                    <MetricCard key={m.label} metric={m} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════════════
                TECH STACK
            ════════════════════════════════════════════════ */}
            <FadeSection style={{ marginBottom:"7rem" }}>
              <SectionLabel>— Stack</SectionLabel>
              <SectionHeading>Tech Used</SectionHeading>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem" }}>
                {project.tech.map((t, i) => {
                  const is3D = ["Three.js","React Three Fiber","Blender","WebGL / GLSL","GSAP"].includes(t);
                  return (
                    <span key={t}
                      style={{ 
                        fontFamily:"'Fira Code',monospace", 
                        fontSize:
                          window.innerWidth <= 900
                            ? "0.68rem"
                            : "0.78rem", 
                        color: is3D ? "#C8FF00" : "rgba(240,235,225,0.7)", 
                        background: is3D ? "rgba(200,255,0,0.08)" : "rgba(240,235,225,0.04)", 
                        border:`1px solid ${is3D ? "rgba(200,255,0,0.28)" : "rgba(240,235,225,0.09)"}`, 
                        borderRadius:4, 
                        padding:
                          window.innerWidth <= 900
                            ? "9px 14px"
                            : "10px 20px", 
                        letterSpacing:"0.05em", 
                        animation:`fadeUp 0.5s ${i * 0.05}s ease both` 
                        }}
                    >
                      {is3D && <span style={{ marginRight:"0.4rem", fontSize:"0.6rem" }}>✦</span>}{t}
                    </span>
                  );
                })}
              </div>
            </FadeSection>

            {/* ════════════════════════════════════════════════
                APPROACH — full width editorial layout
            ════════════════════════════════════════════════ */}
            {project.approach && (
              <FadeSection style={{ marginBottom:"7rem" }}>
                <div 
                style={{ 
                  display:"grid", 
                  gridTemplateColumns:
                    window.innerWidth <= 900
                      ? "1fr"
                      : "minmax(200px,280px) 1fr",
                  gap:
                    window.innerWidth <= 900
                      ? "1.8rem"
                      : "6rem",
                  alignItems:"start" 
                  }}
                >
                  <div 
                    style={{ 
                      position:
                        window.innerWidth <= 900
                          ? "relative"
                          : "sticky",

                      top:
                        window.innerWidth <= 900
                          ? "auto"
                          : 100                      
                    }}
                  >
                    <SectionLabel>— Process</SectionLabel>
                    <h2 
                      style={{ 
                        fontFamily:"'Bebas Neue',cursive", 
                        fontSize:
                          window.innerWidth <= 900
                            ? "2.5rem"
                            : "clamp(2.5rem,4vw,4rem)",
                        color:"#F0EBE1",
                        margin:0, 
                        letterSpacing:"0.05em", 
                        lineHeight:1.05 
                      }}
                    >
                      DEVELOP<br/>MENT<br/>APPROACH
                    </h2>
                    <div 
                      style={{ 
                        width:36, 
                        height:3, 
                        background:"#C8FF00", 
                        marginTop:"1.4rem" 
                        }} />
                  </div>
                  <div>
                    <p
                        style={{
                          fontFamily:"'Cabinet Grotesk',sans-serif",

                          fontSize:
                            window.innerWidth <= 900
                              ? "0.95rem"
                              : "1.05rem",

                          color:"rgba(240,235,225,0.58)",

                          lineHeight:
                            window.innerWidth <= 900
                              ? 1.95
                              : 1.85,

                          marginBottom:"2rem",

                          maxWidth:
                            window.innerWidth <= 900
                              ? "100%"
                              : "720px"
                        }}

                        dangerouslySetInnerHTML={{
                          __html: project.approach
                        }}
                      />
                    {/* decorative quote mark */}
                    <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"8rem", color:"rgba(200,255,0,0.06)", lineHeight:1, userSelect:"none" }}>"</div>
                  </div>
                </div>
              </FadeSection>
            )}

            {/* ════════════════════════════════════════════════
                TECH DECISIONS — new section from portfolioData
            ════════════════════════════════════════════════ */}
            {project.techDecisions && Object.keys(project.techDecisions).length > 0 && (
              <FadeSection style={{ marginBottom:"7rem" }}>
                <SectionLabel>— Architecture Decisions</SectionLabel>
                <SectionHeading>Why This Stack?</SectionHeading>
                <div style={{ display:"flex", flexDirection:"column", gap:"1px" }}>
                  {Object.entries(project.techDecisions).map(([tech, reason], i) => (
                    <TechDecisionCard key={tech} tech={tech} reason={reason} index={i} />
                  ))}
                </div>
              </FadeSection>
            )}

            {/* ════════════════════════════════════════════════
                HIGHLIGHTS — 2-col grid
            ════════════════════════════════════════════════ */}
            {project.highlights?.length > 0 && (
              <FadeSection style={{ marginBottom:"7rem" }}>
                <SectionLabel>— Highlights</SectionLabel>
                <SectionHeading>What Stands Out</SectionHeading>
                <div 
                  style={{ 
                    display:"grid", 
                    gridTemplateColumns:
                      window.innerWidth <= 900
                        ? "1fr"
                        : "repeat(auto-fill,minmax(300px,1fr))",
                    gap:"1px" 
                  }}
                >
                  {project.highlights.map((item, i) => (
                    <HighlightCard key={item} text={item} index={i} />
                  ))}
                </div>
              </FadeSection>
            )}

            {/* ════════════════════════════════════════════════
                OUTCOMES — timeline-style
            ════════════════════════════════════════════════ */}
            {project.outcome?.length > 0 && (
              <FadeSection style={{ marginBottom:"7rem" }}>
                <SectionLabel>— Results</SectionLabel>
                <SectionHeading>Outcomes & Learnings</SectionHeading>
                <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                  {project.outcome.map((item, i) => (
                    <div key={item} style={{ display:"grid", gridTemplateColumns:"3rem 1fr", gap:"2rem", paddingBottom:"2rem", position:"relative" }}>
                      {/* timeline line */}
                      {i < project.outcome.length - 1 && (
                        <div style={{ position:"absolute", left:"1.4rem", top:"1.6rem", bottom:0, width:1, background:"rgba(200,255,0,0.12)" }} />
                      )}
                      {/* dot */}
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"0.25rem" }}>
                        <div style={{ width:12, height:12, borderRadius:"50%", border:"2px solid #C8FF00", background:"#080808", flexShrink:0 }} />
                      </div>
                      <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"1rem", color:"rgba(240,235,225,0.6)", lineHeight:1.72, margin:0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </FadeSection>
            )}

            {/* ════════════════════════════════════════════════
                CTA strip
            ════════════════════════════════════════════════ */}
            <FadeSection style={{ marginBottom:"2rem" }}>
              <div style={{ border:"1px solid rgba(240,235,225,0.07)", padding:"3rem 2.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"2rem", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 80% 50%, rgba(200,255,0,0.04) 0%, transparent 60%)", pointerEvents:"none" }} />
                <div>
                  <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"rgba(240,235,225,0.25)", letterSpacing:"0.2em", marginBottom:"0.5rem" }}>INTERESTED IN WORKING TOGETHER?</p>
                  <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2.2rem", color:"#F0EBE1", letterSpacing:"0.06em", margin:0 }}>LET'S BUILD SOMETHING GREAT.</p>
                </div>
                <a href="mailto:uzrakhan539@gmail.com"
                  style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.72rem", color:"#080808", background:"#C8FF00", padding:"14px 32px", textDecoration:"none", letterSpacing:"0.1em", flexShrink:0, transition:"transform 0.2s,box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 30px rgba(200,255,0,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                  CONTACT ME ↗
                </a>
              </div>
            </FadeSection>

            {/* ════════════════════════════════════════════════
                PREV / NEXT NAV
            ════════════════════════════════════════════════ */}
            <ProjectNav currentId={project.id} navigate={navigate} />

          </div>
        </main>

        {/* Footer */}
        <footer style={{ padding:"1.4rem clamp(1.5rem,4vw,4rem)", borderTop:"1px solid rgba(240,235,225,0.05)", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem", marginTop:"2rem" }}>
          <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.62rem", color:"rgba(240,235,225,0.14)", letterSpacing:"0.1em" }}>© 2025 UZRA KHAN</span>
          <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.62rem", color:"rgba(240,235,225,0.14)", letterSpacing:"0.1em" }}>DESIGNED & CODED WITH INTENTION</span>
        </footer>
      </div>
    </>
  );
}