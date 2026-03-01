import { useParams, useNavigate } from "react-router-dom";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { motion } from 'framer-motion'

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = PORTFOLIO_DATA.projects.find(
    (p) => p.slug === slug
  );

  if (!project) {
    return <h2 style={{ padding: "4rem" }}>Project not found</h2>;
  }

  return (
    <div style={pageStyle}>
      
      {/* Back Button */}
      <button onClick={() => navigate(-1)} style={backBtn}>
        ← Back to Projects
      </button>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={heroSection}
      >
        <div>
          <h1 style={titleStyle}>{project.title}</h1>
          <p style={summaryStyle}>{project.summary}</p>

          {/* Tech Stack */}
          <div style={badgeContainer}>
            {project.techStack.map((tech, i) => (
              <span key={i} style={badgeStyle}>
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ marginTop: "2rem" }}>
            <a href={project.liveLink} target="_blank" style={primaryBtn}>
              Live Demo
            </a>
            <a href={project.sourceLink} target="_blank" style={secondaryBtn}>
              GitHub
            </a>
          </div>
        </div>

        <div style={imageSide}>
          <img src={project.image} style={heroImage} />
        </div>
      </motion.div>


      {/* Video */}
      <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={glassSection}
      >
        <h2 style={sectionTitle}>
          Product Demo
        </h2>

        <div style={videoWrapper}>
          <video
            src={project.videoUrl}
            muted
            autoPlay
            loop
            controls
            style={videoStyle}
          />
        </div>
      </motion.div>

      <GlassSection title="Overview">
            {project.description}
      </GlassSection>

      <GlassSection title="Engineering Approach">
        <div dangerouslySetInnerHTML={{ __html: project.approach }} />
      </GlassSection>

      <GlassSection title="Technical Decisions">
        {Object.entries(project.techDecisions).map(([key, value]) => (
          <div key={key} style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ color: "#c084fc" }}>{key}</h4>
            <p style={{ opacity: 0.85 }}>{value}</p>
          </div>
        ))}
      </GlassSection>

      <GlassSection title="Outcome & Impact">
        <ul>
          {project.outcome.map((item, index) => (
            <li key={index} style={{ marginBottom: "0.8rem" }}>
              {item}
            </li>
          ))}
        </ul>
      </GlassSection>

    </div>
  );
}

/* ---------- Reusable Section ---------- */
function GlassSection({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y:0 }}
      transition={{ duration: 0.5 }}
      style={glassSection}
    >
      <h2 style={sectionTitle}>{title}</h2>
      <div style={{ marginTop: "1.5rem", lineHeight: "1.8" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ---------- Styles ---------- */

const pageStyle = {
  minHeight: "100vh",
  padding: "6rem 8%",
  background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
  color: "white",
};

const backBtn = {
  background: "none",
  border: "none",
  color: "#c084fc",
  cursor: "pointer",
  marginBottom: "2rem",
  fontSize: "1rem"
};


const heroSection = {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "3rem",
    alignItems: "center",
    marginBottom: "6rem",
};

const titleStyle = {
  fontSize: "3rem",
  marginBottom: "1.5rem",
};

const summaryStyle = {
  opacity: 0.8,
  lineHeight: "1.7"
};

const sectionTitle = {
  fontSize: "1.8rem",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  paddingBottom: "0.5rem",
};

const badgeContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginBottom: "1.5rem",
};

const badgeStyle = {
  background: "#ede9fe",
  color: "#6d28d9",
  padding: "0.4rem 0.8rem",
  borderRadius: "999px",
  fontSize: "0.8rem",
};

const imageSide = {
  textAlign: "center",
};

const heroImage = {
  width: "100%",
  borderRadius: "20px",
  boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
};

const videoWrapper = {
  margin: "3rem 0",
};

const videoStyle = {
  width: "100%",
  borderRadius: "16px",
  borderRadius: "20px"
};

const glassSection = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  padding: "3rem",
  borderRadius: "24px",
  marginBottom: "4rem",
  border: "1px solid rgba(255,255,255,0.1)",
};

const primaryBtn = {
  padding: "0.9rem 2rem",
  borderRadius: "999px",
  background: "linear-gradient(90deg, #9333ea, #6366f1)",
  color: "white",
  textDecoration: "none",
  fontWeight: 600,
  marginRight: "1rem",
};

const secondaryBtn = {
  padding: "0.9rem 2rem",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  textDecoration: "none",
  fontWeight: 600,
};
