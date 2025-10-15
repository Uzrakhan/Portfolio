// src/components/About.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';
// REMOVED: import ProfileImage from '../assets/Me.jpg'; 

// Register ScrollTrigger globally for this component
gsap.registerPlugin(ScrollTrigger);

const About = () => {
    // Only destructure description, image is removed from usage
    const { description } = PORTFOLIO_DATA.about;
    
    // Refs for animation targets
    const sectionRef = useRef(null);
    const textRef = useRef(null); // Ref for the main content container
    // REMOVED: imageRef

    useEffect(() => {
        // ----------------------------------------------------
        // GSAP Scroll Animation
        // ----------------------------------------------------
        
        // Ensure the component has rendered before trying to animate
        if (!textRef.current) return;

        // Set initial hidden state
        gsap.set(textRef.current, { opacity: 0, y: 50 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%", 
                end: "bottom top",
                toggleActions: "play none none none", 
            }
        });

        // Animate the single text block
        tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out"
        });
        
        // Cleanup function for ScrollTrigger
        return () => {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
        };

    }, []);

    return (
        <section 
            ref={sectionRef} 
            id="about" 
            className="relative max-w-7xl mx-auto px-6 py-20 md:py-32"
        >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-16 text-center">About Me</h2>

            {/* ⭐ SINGLE COLUMN LAYOUT: Removed grid and column spans ⭐ */}
            <div ref={textRef} className="max-w-4xl mx-auto space-y-6">
                
                {/* Main About Text */}
                <p 
                    className="text-l md:text-xl leading-relaxed text-neutral border-l-4 border-primary pl-6 py-2" // Added professional styling
                    dangerouslySetInnerHTML={{ __html: description }}
                />

                {/* Additional Text / MERN Stack Philosophy */}
                <p className="text-l md:text-xl text-white pt-4">
                    <strong className="text-primary font-bold">Technology Focus:</strong> I leverage the MERN stack (MongoDB, Express, React, Node.js) for a unified JavaScript environment, integrating TypeScript for type safety and Tailwind CSS for rapid, utility-first styling.
                </p>
                
            </div>
            {/* REMOVED: Profile Image JSX */}
            
            <hr className="mx-auto w-full mt-24 border-gray-800" />
        </section>
    );
};

export default About;