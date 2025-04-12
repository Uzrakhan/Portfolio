import React from 'react'
import TomatoApp from '../assets/TomatoApp.png'
const Projects = () => {
  return (
    <div className='projects-section'>
        <h2>Projects</h2>
        <div className='project1'>
            <div className='project1-img-name'>
                <img  src={TomatoApp}
                width='450px'
                height='250px'
                />
                <h4>Tomato Food App</h4>
            </div>
            <div className='project1-info-link'>
                <div className='text'>
                    <span>
                        The Tomato Food App is a Zomato-inspired platform with dynamic restaurant listings, filter options, and a responsive, mobile-friendly UI for easy food exploration.
                    </span>
                </div>
                <div className='links'>
                    <a href="https://tomato-food-app-two.vercel.app/" className='demo-link'>DEMO</a>
                    <a href="https://github.com/Uzrakhan/Tomato-food-app" className='source-code'>Source Code</a>
                </div>

            </div>
           
        </div>
        <div className='project1'>
            <img  src={TomatoApp}
             width='450px'
             height='250px'
            />
            <h4>Tomato Food App</h4>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dicta, dignissimos nobis, ea repudiandae labore maxime facilis nisi obcaecati quod voluptates exercitationem autem adipisci rem assumenda. Sunt veniam quas saepe!</span>
        </div>
        <div className='project1'>
            <img  src={TomatoApp}
             width='450px'
             height='250px'
            />
            <h4>Tomato Food App</h4>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dicta, dignissimos nobis, ea repudiandae labore maxime facilis nisi obcaecati quod voluptates exercitationem autem adipisci rem assumenda. Sunt veniam quas saepe!</span>
        </div>
        <div className='project1'>
            <img  src={TomatoApp}
             width='450px'
             height='250px'
            />
            <h4>Tomato Food App</h4>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dicta, dignissimos nobis, ea repudiandae labore maxime facilis nisi obcaecati quod voluptates exercitationem autem adipisci rem assumenda. Sunt veniam quas saepe!</span>
        </div>
    </div>
  )
}

export default Projects