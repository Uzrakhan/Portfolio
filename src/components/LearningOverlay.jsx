export default function LearningOverlay({ onClose }) {
  return (
    <motion.div style={overlayStyle}>
      <button onClick={onClose}>✕</button>

      <h1>Problem Solving & Growth</h1>

      <section>
        <h2>HackerRank</h2>
        <p>Consistently solving medium-level DSA problems.</p>
        <a href="YOUR_PROFILE_LINK" target="_blank">
          View Profile
        </a>
      </section>

      <section>
        <h2>Topics Practiced</h2>
        <ul>
          <li>Arrays</li>
          <li>Strings</li>
          <li>Greedy Algorithms</li>
          <li>Time Complexity Optimization</li>
        </ul>
      </section>

      <section>
        <h2>Current Focus</h2>
        <p>Improving medium-level problem solving & optimization patterns.</p>
      </section>
    </motion.div>
  )
}
