import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer>
      <div className='footer-links'>
        <a href="https://github.com/Uzrakhan"><FontAwesomeIcon icon={faGithub} size="4x" color='white'/></a>
        <a href="https://www.linkedin.com/in/uzra-khan-40b472272/"><FontAwesomeIcon icon={faLinkedin} size="4x" color='white'/></a>
        <a href="https://x.com/khan15_uzra"><FontAwesomeIcon icon={faXTwitter} size="4x" color='white'/></a>
      </div>
      <div className='footer-text'>
        <h2>Portfolio By Uzra Khan</h2>
      </div>
    </footer>
  )
}

export default Footer