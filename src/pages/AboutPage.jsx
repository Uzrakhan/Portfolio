import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PORTFOLIO_DATA } from "../data/portfolioData";

// ── Grain ──────────────────────────────────────────────────────────────────
function Grain() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:999, pointerEvents:"none", opacity:0.038,
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize:"180px 180px" }} />
  );
}

// ── Cursor ─────────────────────────────────────────────────────────────────
function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x:-200, y:-200 });
  const rPos = useRef({ x:-200, y:-200 });

  useEffect(() => {
    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) { dot.current.style.left=`${e.clientX}px`; dot.current.style.top=`${e.clientY}px`; }
    };
    window.addEventListener("mousemove", onMove);
    let raf;
    const tick = () => {
      rPos.current.x += (pos.current.x - rPos.current.x) * 0.11;
      rPos.current.y += (pos.current.y - rPos.current.y) * 0.11;
      if (ring.current) { ring.current.style.left=`${rPos.current.x}px`; ring.current.style.top=`${rPos.current.y}px`; }
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

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
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
      <div style={{ display:"flex", gap:"2.5rem", alignItems:"center" }}>
        {["Work","Skills","Experience","Contact"].map(l => (
          <a key={l} href={`/#${l.toLowerCase()}`}
            style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.7rem", color:"rgba(240,235,225,0.4)", textDecoration:"none", letterSpacing:"0.08em", transition:"color 0.2s" }}
            onMouseEnter={e => e.target.style.color="#C8FF00"}
            onMouseLeave={e => e.target.style.color="rgba(240,235,225,0.4)"}>
            {l}
          </a>
        ))}
        <a href="mailto:uzrakhan539@gmail.com"
          style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.68rem", color:"#080808", background:"#C8FF00", padding:"8px 20px", borderRadius:3, textDecoration:"none", letterSpacing:"0.06em", transition:"opacity 0.2s" }}
          onMouseEnter={e => e.target.style.opacity="0.82"}
          onMouseLeave={e => e.target.style.opacity="1"}>
          HIRE ME
        </a>
      </div>
    </nav>
  );
}

// ── FadeSection ────────────────────────────────────────────────────────────
function FadeSection({ children, delay = 0, style = {} }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(28px)", transition:`opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

// ── Pillar card ────────────────────────────────────────────────────────────
function PillarCard({ pillar, index }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ padding:"2.5rem 2rem", border:`1px solid ${hover ? "rgba(200,255,0,0.38)" : "rgba(240,235,225,0.08)"}`, background: hover ? "rgba(200,255,0,0.03)" : "transparent", transition:"all 0.35s ease", position:"relative", overflow:"hidden" }}>
      {/* corner accent */}
      <div style={{ position:"absolute", top:0, left:0, width:24, height:24, borderTop:`2px solid ${hover ? "#C8FF00" : "rgba(200,255,0,0.25)"}`, borderLeft:`2px solid ${hover ? "#C8FF00" : "rgba(200,255,0,0.25)"}`, transition:"border-color 0.3s" }} />

      <div style={{ fontSize:"2rem", marginBottom:"1.2rem" }}>{pillar.icon}</div>
      <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.6rem", color: hover ? "#C8FF00" : "#F0EBE1", letterSpacing:"0.08em", margin:0, marginBottom:"0.8rem", transition:"color 0.3s" }}>{pillar.title}</h3>
      <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"0.92rem", color:"rgba(240,235,225,0.5)", lineHeight:1.72, margin:0 }}>{pillar.description}</p>

      {/* index */}
      <div style={{ position:"absolute", bottom:"1rem", right:"1.2rem", fontFamily:"'Bebas Neue',cursive", fontSize:"4rem", color:"rgba(200,255,0,0.05)", letterSpacing:"0.04em", lineHeight:1, userSelect:"none" }}>
        {String(index + 1).padStart(2,"0")}
      </div>
    </div>
  );
}

// ── Learning tag ───────────────────────────────────────────────────────────
function Tag({ label }) {
  const [hover, setHover] = useState(false);
  return (
    <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.62rem", letterSpacing:"0.1em", color: hover ? "#C8FF00" : "rgba(240,235,225,0.4)", background: hover ? "rgba(200,255,0,0.1)" : "rgba(240,235,225,0.04)", border:`1px solid ${hover ? "rgba(200,255,0,0.35)" : "rgba(240,235,225,0.09)"}`, borderRadius:3, padding:"5px 12px", transition:"all 0.22s", cursor:"default" }}>
      {label}
    </span>
  );
}

// ── Learning card ──────────────────────────────────────────────────────────
function LearningCard({ item, index }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display:"grid", gridTemplateColumns:"4rem 1fr", gap:"2rem", padding:"2.5rem 0", borderBottom:"1px solid rgba(240,235,225,0.06)", transition:"padding-left 0.3s ease", paddingLeft: hover ? "0.8rem" : 0 }}>
      <div style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.7rem", color: hover ? "#C8FF00" : "rgba(240,235,225,0.18)", letterSpacing:"0.1em", paddingTop:"0.3rem", transition:"color 0.3s" }}>
        {String(index + 1).padStart(2,"0")}
      </div>
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"0.7rem", flexWrap:"wrap" }}>
          <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.6rem", color:"#F0EBE1", letterSpacing:"0.06em", margin:0 }}>{item.title}</h3>
          <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
            {item.tags.map(t => <Tag key={t} label={t} />)}
          </div>
        </div>
        <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"0.95rem", color:"rgba(240,235,225,0.48)", lineHeight:1.72, margin:0 }}>{item.description}</p>
        {/* progress bar decoration */}
        <div style={{ marginTop:"1.4rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
          <div style={{ flex:1, height:2, background:"rgba(240,235,225,0.06)", borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width: hover ? "60%" : "40%", background:"linear-gradient(90deg,#C8FF00,rgba(200,255,0,0.4))", transition:"width 0.6s ease", borderRadius:2 }} />
          </div>
          <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.58rem", color:"rgba(200,255,0,0.4)", letterSpacing:"0.1em" }}>IN PROGRESS</span>
        </div>
      </div>
    </div>
  );
}

// ── Marquee (identical to Landing2D) ──────────────────────────────────────
const MARQUEE = ["CLEAN CODE","USER EXPERIENCE","SCALABILITY","FULL-STACK MERN","REAL-TIME SYSTEMS","TYPESCRIPT","REACT","NODE.JS","MONGODB","SOCKET.IO","BLENDER","WEBGL"];

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

// ── Main ───────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { about, philosophy, learningLog, hero } = PORTFOLIO_DATA;
  const [headerVis, setHeaderVis] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setHeaderVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap" rel="stylesheet" />

      <style>{`
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0 }
        html { scroll-behavior:smooth; cursor:none }
        body { background:#080808; color:#F0EBE1; overflow-x:hidden }
        a,button { cursor:none }

        @keyframes fadeUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mq  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes mqR { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(200,255,0,0.35)} 60%{opacity:.7;box-shadow:0 0 0 7px rgba(200,255,0,0)} }

        ::-webkit-scrollbar { width:3px }
        ::-webkit-scrollbar-track { background:#080808 }
        ::-webkit-scrollbar-thumb { background:#C8FF00; border-radius:2px }

        @media(max-width:900px) { html,a,button { cursor:auto } }
        @media(max-width:700px) {
          .grid-2col { grid-template-columns:1fr !important }
          .grid-4col { grid-template-columns:1fr 1fr !important }
        }
      `}</style>

      <div style={{ background:"#080808", minHeight:"100vh" }}>
        <Grain />
        <Cursor />
        <Nav />

        <main style={{ paddingTop:"64px" }}>

          {/* ════════════════════════════════════════════════
              HERO
          ════════════════════════════════════════════════ */}
          <section style={{ minHeight:"55vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 clamp(1.5rem,4vw,4rem)", paddingBottom:"5rem", position:"relative", overflow:"hidden" }}>
            {/* Grid background */}
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(240,235,225,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(240,235,225,0.022) 1px,transparent 1px)", backgroundSize:"90px 90px", pointerEvents:"none" }} />
            <div style={{ position:"absolute", top:"15%", left:"-5%", width:450, height:450, borderRadius:"50%", background:"radial-gradient(circle,rgba(200,255,0,0.055) 0%,transparent 65%)", pointerEvents:"none" }} />
            {/* Ghost word */}
            <div style={{ position:"absolute", bottom:"-2.5rem", right:"clamp(1rem,2vw,2rem)", fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(7rem,20vw,20rem)", color:"rgba(240,235,225,0.018)", letterSpacing:"0.02em", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>
              ABOUT
            </div>

            <div style={{ position:"relative", zIndex:1 }}>
              <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"#C8FF00", letterSpacing:"0.26em", marginBottom:"1.2rem", opacity: headerVis?1:0, transform: headerVis?"translateY(0)":"translateY(16px)", transition:"all 0.6s ease" }}>
                01 / WHO I AM
              </p>
              <h1 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(4rem,12vw,12rem)", lineHeight:0.88, letterSpacing:"0.015em", margin:0, marginBottom:"2rem", opacity: headerVis?1:0, transform: headerVis?"translateY(0)":"translateY(28px)", transition:"all 0.7s 0.1s ease" }}>
                THE<br/><span style={{ color:"#C8FF00" }}>PERSON</span><br/>BEHIND<br/>THE CODE
              </h1>

              <div style={{ display:"flex", alignItems:"flex-start", gap:"2rem", maxWidth:640, opacity: headerVis?1:0, transform: headerVis?"translateY(0)":"translateY(20px)", transition:"all 0.7s 0.22s ease" }}>
                <div style={{ width:3, alignSelf:"stretch", background:"#C8FF00", flexShrink:0, minHeight:"2.5rem" }} />
                <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"1.05rem", color:"rgba(240,235,225,0.5)", lineHeight:1.8, margin:0 }}>
                  {hero.specialty}
                </p>
              </div>
            </div>
          </section>

          <div style={{ padding:"0 clamp(1.5rem,4vw,4rem)" }}>

            {/* ════════════════════════════════════════════════
                ABOUT — editorial two-col
            ════════════════════════════════════════════════ */}
            <section id="about" style={{ paddingTop:"7rem", paddingBottom:"7rem" }}>
              <FadeSection>
                <div className="grid-2col" style={{ display:"grid", gridTemplateColumns:"minmax(200px,280px) 1fr", gap:"6rem", alignItems:"start" }}>
                  <div style={{ position:"sticky", top:100 }}>
                    <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"#C8FF00", letterSpacing:"0.24em", marginBottom:"0.5rem" }}>— About</p>
                    <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(2.5rem,4vw,4rem)", color:"#F0EBE1", margin:0, letterSpacing:"0.05em", lineHeight:1.05 }}>
                      MY<br/>STORY
                    </h2>
                    <div style={{ width:36, height:3, background:"#C8FF00", margin:"1.4rem 0" }} />
                    {/* Status pill */}
                    <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", border:"1px solid rgba(200,255,0,0.25)", borderRadius:3, padding:"6px 14px" }}>
                      <div style={{ width:6, height:6, borderRadius:"50%", background:"#C8FF00", animation:"pulse 2s ease infinite" }} />
                      <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", color:"rgba(240,235,225,0.35)", letterSpacing:"0.12em" }}>OPEN TO WORK</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"1.05rem", color:"rgba(240,235,225,0.58)", lineHeight:1.85 }}
                      dangerouslySetInnerHTML={{ __html: about.description }} />

                    {/* Hero summary quote */}
                    <div style={{ marginTop:"3rem", padding:"2rem 2.5rem", border:"1px solid rgba(200,255,0,0.15)", background:"rgba(200,255,0,0.025)", position:"relative" }}>
                      <div style={{ position:"absolute", top:"-0.8rem", left:"1.5rem", fontFamily:"'Bebas Neue',cursive", fontSize:"3rem", color:"#C8FF00", lineHeight:1 }}>"</div>
                      <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"1.05rem", color:"rgba(240,235,225,0.7)", lineHeight:1.78, margin:0, marginTop:"0.5rem" }}>
                        {hero.summary}
                      </p>
                    </div>

                    {/* quick facts */}
                    <div style={{ display:"flex", gap:"3rem", marginTop:"3rem", flexWrap:"wrap" }}>
                      {[
                        { label:"Location", value:"Varanasi, India" },
                        { label:"Availability", value:"Immediate" },
                        { label:"Focus", value:"Frontend + Fullstack" },
                      ].map(f => (
                        <div key={f.label} style={{ borderLeft:"2px solid rgba(200,255,0,0.28)", paddingLeft:"1rem" }}>
                          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.58rem", color:"rgba(240,235,225,0.25)", letterSpacing:"0.14em", marginBottom:"0.3rem" }}>{f.label.toUpperCase()}</div>
                          <div style={{ fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:"0.95rem", color:"#F0EBE1", fontWeight:500 }}>{f.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeSection>
            </section>

            <Marquee />

            {/* ════════════════════════════════════════════════
                PHILOSOPHY — 4-col grid
            ════════════════════════════════════════════════ */}
            <section id="philosophy" style={{ paddingTop:"7rem", paddingBottom:"7rem" }}>
              <FadeSection>
                <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"#C8FF00", letterSpacing:"0.24em", marginBottom:"0.5rem" }}>02 / PHILOSOPHY</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", flexWrap:"wrap", gap:"1.5rem" }}>
                  <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(3rem,6vw,5.5rem)", color:"#F0EBE1", margin:0, letterSpacing:"0.04em", lineHeight:1 }}>
                    {philosophy.title.replace(" ✨","")}
                  </h2>
                  <p style={{ fontFamily:"'Cabinet Grotesk',sans-serif", color:"rgba(240,235,225,0.32)", fontSize:"0.9rem", maxWidth:320, lineHeight:1.65 }}>
                    The principles that guide every line of code I write and every system I architect.
                  </p>
                </div>
              </FadeSection>

              <div className="grid-4col" style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"1px", border:"1px solid rgba(240,235,225,0.07)" }}>
                {philosophy.pillars.map((p, i) => (
                  <FadeSection key={p.title} delay={i * 0.08}>
                    <PillarCard pillar={p} index={i} />
                  </FadeSection>
                ))}
              </div>
            </section>

            <Marquee rev />

            {/* ════════════════════════════════════════════════
                LEARNING LOG
            ════════════════════════════════════════════════ */}
            <section id="learning-log" style={{ paddingTop:"7rem", paddingBottom:"7rem" }}>
              <FadeSection>
                <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"#C8FF00", letterSpacing:"0.24em", marginBottom:"0.5rem" }}>03 / GROWTH</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", flexWrap:"wrap", gap:"1.5rem" }}>
                  <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(3rem,6vw,5.5rem)", color:"#F0EBE1", margin:0, letterSpacing:"0.04em", lineHeight:1 }}>
                    {learningLog.title.replace(" 🚀","")}
                  </h2>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", border:"1px solid rgba(200,255,0,0.22)", borderRadius:3, padding:"8px 16px" }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:"#C8FF00", animation:"pulse 2s ease infinite" }} />
                    <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.6rem", color:"rgba(240,235,225,0.35)", letterSpacing:"0.12em" }}>ACTIVELY LEARNING</span>
                  </div>
                </div>
              </FadeSection>

              <div style={{ borderTop:"1px solid rgba(240,235,225,0.07)" }}>
                {learningLog.currentFocus.map((item, i) => (
                  <FadeSection key={item.title} delay={i * 0.12}>
                    <LearningCard item={item} index={i} />
                  </FadeSection>
                ))}
              </div>
            </section>

            {/* ════════════════════════════════════════════════
                CTA — see my work
            ════════════════════════════════════════════════ */}
            <FadeSection style={{ paddingBottom:"7rem" }}>
              <div style={{ border:"1px solid rgba(240,235,225,0.07)", padding:"4rem 3rem", position:"relative", overflow:"hidden", textAlign:"center" }}>
                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 50%, rgba(200,255,0,0.04) 0%, transparent 65%)", pointerEvents:"none" }} />
                <p style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.65rem", color:"rgba(240,235,225,0.25)", letterSpacing:"0.22em", marginBottom:"1rem" }}>READY TO COLLABORATE?</p>
                <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(3rem,6vw,6rem)", color:"#F0EBE1", margin:0, marginBottom:"2.5rem", letterSpacing:"0.04em" }}>
                  LET'S BUILD<br/><span style={{ color:"#C8FF00" }}>SOMETHING GREAT.</span>
                </h2>
                <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
                  <a href="/#work"
                    style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.72rem", color:"#080808", background:"#C8FF00", padding:"14px 32px", textDecoration:"none", letterSpacing:"0.1em", transition:"transform 0.2s,box-shadow 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 30px rgba(200,255,0,0.35)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                    SEE MY WORK ↓
                  </a>
                  <a href="mailto:uzrakhan539@gmail.com"
                    style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.72rem", color:"rgba(240,235,225,0.65)", border:"1px solid rgba(240,235,225,0.14)", padding:"14px 32px", textDecoration:"none", letterSpacing:"0.1em", transition:"all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(200,255,0,0.5)"; e.currentTarget.style.color="#C8FF00"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(240,235,225,0.14)"; e.currentTarget.style.color="rgba(240,235,225,0.65)"; }}>
                    EMAIL ME ↗
                  </a>
                </div>
              </div>
            </FadeSection>

          </div>
        </main>

        <footer style={{ padding:"1.4rem clamp(1.5rem,4vw,4rem)", borderTop:"1px solid rgba(240,235,225,0.05)", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem" }}>
          <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.62rem", color:"rgba(240,235,225,0.14)", letterSpacing:"0.1em" }}>© 2025 UZRA KHAN</span>
          <span style={{ fontFamily:"'Fira Code',monospace", fontSize:"0.62rem", color:"rgba(240,235,225,0.14)", letterSpacing:"0.1em" }}>DESIGNED & CODED WITH INTENTION</span>
        </footer>
      </div>
    </>
  );
}