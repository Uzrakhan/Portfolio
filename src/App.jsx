import { useState} from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import StorySkills from './components/StorySkills'
import Projects from './components/Projects'
import './App.css'

function App() {

  return (
    <div>
      <NavBar />
      <Hero />
      <StorySkills />
      <Projects />
    </div>
  )
}

export default App
