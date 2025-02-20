import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function PortfolioApp() {
    return(
      <div className='bg-dark bg-gradient min-vh-100 text-white'>
        <Router>
          <NavBar />
          <div>
            <Routes>
              <Route  path='/' element={<Home />}/>
              <Route path='/contact' element={<Contact />} />
              <Route path='/projects' element={<Projects />}/>
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    )
}

export default PortfolioApp;