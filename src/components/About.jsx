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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">
                About Me
            </h2>

            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-20">
                A brief look at my background, mindset, and the way I approach building web experiences.
            </p>

            {/* ⭐ SINGLE COLUMN LAYOUT: Removed grid and column spans ⭐ */}
            <div ref={textRef} className="max-w-3xl mx-auto space-y-10">
                
                {/* Main About Text */}
                <p 
                    className="text-base md:text-xl leading-relaxed md:leading-loose text-neutral-200 border-l-4 border-primary pl-6 py-3 max-w-3xl" // Added professional styling
                    dangerouslySetInnerHTML={{ __html: description }}
                />

                {/* Additional Text / MERN Stack Philosophy */}
                <div className="pt-8">
                    <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                        Technology Focus
                    </p>

                    <p className="text-base md:text-lg text-white leading-relaxed max-w-3xl">
                        I leverage the <span className="text-primary font-medium"> MERN stack </span> 
                        (MongoDB, Express, React, Node.js) for a unified JavaScript environment, 
                        integrating <span className="text-primary font-medium"> TypeScript </span> 
                        for type safety and <span className="text-primary font-medium"> Tailwind CSS </span> 
                        for rapid, utility-first styling.
                    </p>
                </div>

                
            </div>
            {/* REMOVED: Profile Image JSX */}
            
            <hr className="mx-auto w-full mt-24 border-gray-800" />
        </section>
    );
};

export default About;