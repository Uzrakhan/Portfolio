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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, aliquid! Itaque corrupti magnam fugiat mollitia labore magni saepe veritatis voluptatum alias fugit. Explicabo ducimus sequi aut corporis odio repellendus? Lorem ipsum dolor sit amet
            </span>
            <br />
            <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, aliquid! Itaque corrupti magnam fugiat mollitia labore magni saepe veritatis voluptatum alias fugit. Explicabo ducimus sequi aut corporis odio repellendus? Lorem ipsum dolor sit amet
            </span>
            <br />
            <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, aliquid! Itaque corrupti magnam fugiat mollitia labore magni saepe veritatis voluptatum alias fugit. Explicabo ducimus sequi aut corporis odio repellendus? Lorem ipsum dolor sit amet
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