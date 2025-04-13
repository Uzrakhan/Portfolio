import { useRef } from 'react'
import { useState} from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import StorySkills from './components/StorySkills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {

  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({behavior: 'smooth'})
  }
  return (
    <div>
      <NavBar onLinkClick={(section) => {
        if(section === 'about') scrollToSection(aboutRef)
        else if(section === 'projects') scrollToSection(projectsRef)
        else if(section === 'contact') scrollToSection(contactRef)
      }
      }/>
      <Hero onLinkClick={(section) => {
        if(section === 'projects') scrollToSection(projectsRef)
          else if(section === 'contact') scrollToSection(contactRef)
      }}/>
      <div ref={aboutRef}>
        <StorySkills />
      </div>
      <div ref={projectsRef}>
         <Projects />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      <Footer />
    </div>
  )
}

export default App
