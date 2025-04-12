import React from 'react'
const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-info'>
            <span>Hello</span>
            <h6>I'm Uzra Khan.</h6>
            <h6>A Front-End Developer Building </h6>
            <h6>Awesome Webapps and Websites.</h6>
            <button className='projects-btn'>PROJECTS</button>
            <button className='contact-btn'>CONTACT</button>
        </div>

        <div className='hero-image'>
            <img src='https://pbs.twimg.com/media/GoVgtVfXUAAfN-A?format=jpg&name=medium'
             width='300px'
             height='300px'
            />
        </div>
        
    </div>
  )
}

export default Hero