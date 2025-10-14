// src/components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ParticlesBackground from './ParticlesBackground';
// NOTE: Assuming your portfolioData structure is simple:
const PORTFOLIO_DATA = { 
    hero: { 
        name: "UZRA KHAN", 
        specialty: "FULL-STACK DEVELOPER", 
        summary: "Aspiring Fullstack Developer focused on creating scalable, performant web applications using React, Next.js, and Node.js.",
        email: "uzrakhan539@gmail.com" 
    } 
}; 

const Hero = () => {
    const { name, specialty, summary, email } = PORTFOLIO_DATA.hero;
    
    // Create Refs for the container DIVs wrapping the text
    const nameWrapRef = useRef(null);
    const specialtyWrapRef = useRef(null);
    const summaryWrapRef = useRef(null);
    const ctaRef = useRef(null);
    
    // Refs for the inner text SPANs (the elements that move)
    const nameTextRef = useRef(null);
    const specialtyTextRef = useRef(null);
    const summaryTextRef = useRef(null);
    
    const textTargets = [nameTextRef, specialtyTextRef, summaryTextRef];

    
    useEffect(() => {
        
        // Ensure all elements have mounted before animating
        if (!textTargets.every(ref => ref.current) || !ctaRef.current) return;

        let ctx = gsap.context(() => {
            
            const movingElements = textTargets.map(ref => ref.current);
            const ctaTarget = ctaRef.current;
            
            // --- 1. Initial State Setup ---
            // Set initial state for all text: hidden 100% below its overflow container
            gsap.set(movingElements, { 
                opacity: 0, 
                y: '95%', 
            }); 
            // Set initial state for CTA
            gsap.set(ctaTarget, { scale: 0, opacity: 0 });

            // --- 2. Create Timeline for Sequential Entrance ---
            const tl = gsap.timeline({ delay: 0.5 }); 

            // A. Animate Name (Using the clean reveal technique)
            tl.to(nameTextRef.current, {
                y: '0%', 
                opacity: 1,
                duration: 1.2, 
                ease: "power4.out", // Sharp, professional ease
            }, 0); 

            // B. Animate Specialty/Role
            tl.to(specialtyTextRef.current, {
                y: '0%',
                opacity: 1,
                duration: 1.0,
                ease: "power3.out",
            }, "-=0.8"); // Starts before the name is finished

            // C. Animate Summary
            tl.to(summaryTextRef.current, {
                y: '0%',
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
            }, "-=0.9");

            // D. Animate CTA Button (intial entrance)
            tl.to(ctaTarget, {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
            }, "-=0.5");

            // Continuos pulse animation
            tl.to(ctaTarget, {
                scale: 1.02,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }, ">")
            
        }, nameWrapRef); 

        return () => ctx.revert(); 
        
    }, []);
    

    return (
        <section id="page1" className="min-h-screen relative w-full px-6" style={{paddingTop: '50vh'}}> 
            
            <div className='absolute top-0 left-0 w-full h-full z-0 pointer-events-none'>
                <ParticlesBackground />
            </div>

            {/* ⭐ LAYER 2: UI CONTENT (Z-INDEX 10) ⭐ */}
            <div className='relative z-10'>
                {/* NAME - Must be wrapped for the "from below" effect */}
                <div ref={nameWrapRef} className="overflow-hidden mb-5">
                    <h1
                        className="font-serif text-white uppercase font-black"
                        // Inline style to mimic your CSS: font-size: 15vw; line-height: 11vw; letter-spacing: -8px;
                        style={{fontSize: '15vw', lineHeight: '15vw', letterSpacing: '-8px', fontFamily: "'Dancing Script', cursive", display: 'block'}}
                    >
                        <span ref={nameTextRef} className='inline-block'>{name}</span>
                    </h1>
                </div>

                {/* SPECIALTY - Must be wrapped for the "from below" effect */}
                <div ref={specialtyWrapRef} className="overflow-hidden mb-9">
                    <p
                        className="font-serif text-primary uppercase font-bold"
                        // Placeholder styling - adjust to match your 'Two Good' look
                        style={{fontSize: '4vw', fontFamily: "'Bodoni Moda', serif"}} 
                    >
                        <span ref={specialtyTextRef} className='inline-block'>{specialty}</span>
                    </p>
                </div>

                {/* SUMMARY - Must be wrapped for the "from below" effect */}
                <div ref={summaryWrapRef} className="overflow-hidden mb-16">
                    <p 
                        className="text-base font-normal text-neutral md:text-lg max-w-2xl"
                        style={{fontSize: '1.4vw'}} // Placeholder styling
                    >
                        <span ref={summaryTextRef} className='inline-block'>{summary}</span>
                    </p>
                </div>

                {/* CTA Button */}
                <a
                ref={ctaRef}
                className="inline-block rounded-full bg-primary px-8 py-5 text-sm leading-5 font-medium text-black max-w-fit hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 
                    hover:translate-y-[-2px] transition-colors duration-300"
                href={`mailto:${email}`}
                >
                Get in Touch
                </a>
            </div>
        </section>
    );
};

export default Hero;