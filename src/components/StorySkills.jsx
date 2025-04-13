import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faNode } from '@fortawesome/free-brands-svg-icons';
import { faCss3Alt } from '@fortawesome/free-brands-svg-icons';


const StorySkills = () => {
  return (
    <div className='about-info'>
        <div className='about-story'>
            <h3>My Story</h3>
            <span>
                With a strong foundation in analytical thinking and problem-solving, I hold a master's degree in Physics, where I honed my skills in critical analysis and structured approaches to complex challenges. My academic journey taught me the value of precision and creativity, which I’ve seamlessly transitioned into my passion for coding. Driven by a desire to create impactful digital experiences, I delved into the world of web development, mastering JavaScript, HTML, CSS, and modern frontend frameworks.
            </span>
            <br />
            <span>
                 Now, as a budding frontend developer, I bring a unique perspective that combines scientific rigor with design aesthetics to build intuitive and responsive user interfaces. My background in physics enables me to approach coding with a logical mindset, while my commitment to continuous learning ensures I stay updated with industry trends. I am eager to contribute to innovative projects, leveraging my technical expertise to solve real-world problems and create seamless user experiences.
            </span>
            <br />
        </div>
        <div className='about-skills'>
            <h2>My Skills</h2>
            <div className='about-skills-icons'>
                <FontAwesomeIcon icon={faCss3Alt} size="5x"/>
                <FontAwesomeIcon icon={faJs} size="5x"/>
                <FontAwesomeIcon icon={faReact} size="5x"/>
                <FontAwesomeIcon icon={faGithub} size="5x"/>
                <FontAwesomeIcon icon={faNode} size="5x"/>
            </div>
           
        </div>
    </div>
  )
}

export default StorySkills