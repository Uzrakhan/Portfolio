import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/src/ScrollToPlugin';
// REMOVED: import useLocoScroll from './hooks/useLocoScroll';
import './App.css';

// Import all your components
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Philosophy from './components/Philosophy';
import LearningLog from './components/LearningLog';
import ProjectDetail from './pages/ProjectDetail'; 
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Simple wrapper for all content (now standard scroll)
const DefaultScrollWrapper = ({ children, pathname }) => (
    // Use the pathname as a key to force the router to remount the entire structure 
    // when navigating, ensuring a clean state for ScrollTrigger.
    <div className="min-h-screen app-wrapper" key={pathname}>
        {children}
    </div>
);

function App() {
    const location = useLocation(); 

    // CRITICAL: Reset scroll and refresh ScrollTrigger on every route/hash change.
    useEffect(() => {
        // Reset browser scroll position to the top of the window
        window.scrollTo(0, 0); 
        
        // Refresh ScrollTrigger after the scroll reset. 
        // This recalculates all animation start/end points correctly.
        ScrollTrigger.refresh(true); 

    }, [location.pathname]); // Triggers on path and hash changes

    return (
        <>
            <Header />
            <Routes>
                
                {/* 1. HOME PAGE ROUTE (NATIVE SCROLL) */}
                <Route 
                    path='/*' // Use '/*' to catch the root and any hash that follows (e.g., /#about)
                    element={
                        <DefaultScrollWrapper pathname={location.pathname}>
                            <main>
                                <Hero />
                                <Projects id="projects" />
                                <About id="about" />
                                <Philosophy id="philosophy" />
                                <LearningLog id="learning-log" />
                                <Footer />
                            </main>
                        </DefaultScrollWrapper>
                    }
                />

                {/* 2. PROJECT DETAIL PAGE ROUTE */}
                <Route 
                    path='/projects/:slug'
                    element={
                        <DefaultScrollWrapper pathname={location.pathname}>
                            <ProjectDetail />
                            <Footer />
                        </DefaultScrollWrapper>
                    }
                />

                {/* 3. Fallback 404 Route */}
                <Route path="*" element={
                    <DefaultScrollWrapper pathname={location.pathname}>
                        <div className="pt-32 text-center text-white min-h-[50vh]"><h1 className="text-4xl">404 Not Found</h1></div>
                    </DefaultScrollWrapper>
                } />
            </Routes>
        </>
    );
}

export default App;