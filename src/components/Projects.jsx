import React from 'react'
import TomatoApp from '../assets/TomatoApp.png'
import ECommerce from '../assets/ECommerce.png'
import XPense from '../assets/Xpense.png'
import TwoGoodClone from '../assets/TwoGoodClone.png'
import Movie from '../assets/Movie.png'
import PokeFinder from '../assets/PokeFinder.png'

const Projects = () => {
  return (
    <div className='projects-section'>
        <h2>Projects</h2>
        <div className='project1'>
            <div className='project1-img-name'>
                <img  src={ECommerce}
                width='450px'
                height='250px'
                />
                <h4>E-Commerce App</h4>
            </div>
            <div className='project1-info-link'>
                <div className='text'>
                    <span>
                        The E-commerce React App is a dynamic platform featuring real-time product listings, robust sort and filter options for seamless product discovery, and an intuitive add-to-cart functionality. With its responsive design and interactive interface, it provides an engaging shopping experience for users.
                    </span>
                </div>
                <div className='links'>
                    <a href="https://e-commerce-store-react.vercel.app/" className='demo-link'>DEMO</a>
                    <a href="https://github.com/Uzrakhan/E-commerce-store-React" className='source-code'>Source Code</a>
                </div>
            </div>
        </div>
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
            <div className='project1-img-name'>
                <img  src={XPense}
                width='450px'
                height='250px'
                />
                <h4>Xpense App</h4>
            </div>
            <div className='project1-info-link'>
                <div className='text'>
                    <span>
                        The Xpense app is a simple, user-friendly tool for tracking income and expenses. It allows users to add transactions, view totals, filter by type or date, and reset data for easy personal finance management. Made using vanilla javascript.
                    </span>
                </div>
                <div className='links'>
                    <a href="https://xpense-app-murex.vercel.app/" className='demo-link'>DEMO</a>
                    <a href="https://github.com/Uzrakhan/Xpense-App" className='source-code'>Source Code</a>
                </div>
            </div>
        </div>
        <div className='project1'>
            <div className='project1-img-name'>
                <img  src={TwoGoodClone}
                width='450px'
                height='250px'
                />
                <h4>Two Good Co (Clone)</h4>
            </div>
            <div className='project1-info-link'>
                <div className='text'>
                    <span>
                        A UI clone of Two Good Website, with gsap animation and scroll.
                    </span>
                </div>
                <div className='links'>
                    <a href="https://uzrakhan.github.io/two-good/" className='demo-link'>DEMO</a>
                    <a href="https://github.com/Uzrakhan/two-good" className='source-code'>Source Code</a>
                </div>
            </div>
        </div>

        <div className='project1'>
            <div className='project1-img-name'>
                <img  src={Movie}
                width='450px'
                height='250px'
                />
                <h4>Movie Database App</h4>
            </div>
            <div className='project1-info-link'>
                <div className='text'>
                    <span>
                        An interactve movie database app which lets users to search for their favourite movies, filter them by specific filters. Made using vanilla JS.
                    </span>
                </div>
                <div className='links'>
                    <a href="https://movie-database-gray.vercel.app/" className='demo-link'>DEMO</a>
                    <a href="https://github.com/Uzrakhan/Movie-Database" className='source-code'>Source Code</a>
                </div>
            </div>
        </div>

        <div className='project1'>
            <div className='project1-img-name'>
                <img  src={PokeFinder}
                width='450px'
                height='250px'
                />
                <h4>PokeFinder</h4>
            </div>
            <div className='project1-info-link'>
                <div className='text'>
                    <span>
                        A React-based web application that allows users to search and browse Pokémon efficiently using the PokeAPI. The app features dynamic search by name or type, responsive design, pagination, and detailed stats/visuals for each Pokémon. Built with React Hooks, Axios for API integration, and React Router for seamless navigation, this project demonstrates my ability to work with external APIs, manage state effectively, and create user-friendly interfaces.
                    </span>
                </div>
                <div className='links'>
                    <a href="https://poke-finder-psi.vercel.app/" className='demo-link'>DEMO</a>
                    <a href="https://github.com/Uzrakhan/PokeFinder" className='source-code'>Source Code</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Projects