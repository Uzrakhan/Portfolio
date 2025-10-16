// src/components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ParticlesBackground from './ParticlesBackground';
import { motion } from 'framer-motion';

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
            
        }, nameWrapRef); 

        return () => ctx.revert(); 
        
    }, []);
    

    return (
        <section id="page1" className="min-h-screen relative w-full px-6 pt-52 md:pt-48"> 
            
            <div className='absolute top-0 left-0 w-full h-full z-0 pointer-events-none'>
                <ParticlesBackground />
            </div>

            {/* ⭐ LAYER 2: UI CONTENT (Z-INDEX 10) ⭐ */}
            <div className='relative z-10'>
                {/* NAME - Must be wrapped for the "from below" effect */}
                <div ref={nameWrapRef} className="overflow-hidden mb-4 md:mb-6">
                    <h1
                        className="font-serif text-white uppercase font-black text-5xl tracking-tighter
                        md:text-9xl
                        "
                        style={{ fontFamily: "'Dancing Script', cursive", display: 'block' }}
                    >
                        <span ref={nameTextRef} className='inline-block'>{name}</span>
                    </h1>
                </div>

                {/* SPECIALTY - Must be wrapped for the "from below" effect */}
                <div ref={specialtyWrapRef} className="overflow-hidden mb-6 md:mb-8">
                    <p
                        className="font-serif text-primary uppercase font-bold text-xl md:text-5xl"
                        style={{fontFamily: "'Bodoni Moda', serif"}} 
                    >
                        <span ref={specialtyTextRef} className='inline-block'>{specialty}</span>
                    </p>
                </div>

                {/* SUMMARY - Must be wrapped for the "from below" effect */}
                <div ref={summaryWrapRef} className="overflow-hidden mb-16">
                    <p 
                        className="text-sm font-normal text-neutral md:text-lg max-w-2xl"
                    >
                        <span ref={summaryTextRef} className='inline-block'>{summary}</span>
                    </p>
                </div>

                {/* CTA Button */}
                <motion.a
                ref={ctaRef}
                className="inline-block rounded-full bg-primary px-4 py-2 text-sm leading-5 font-medium text-black max-w-fit duration-300"
                href={`mailto:${email}`}

                whileHover={{
                    backgroundColor: "#E5E7EB",
                    color: "#000000",
                    y: -2,
                    scale: 1.05,
                    boxShadow: "0 10px 15px -3px rgba(255, 179, 0, 0.4), 0 4px 6px -2px rgba(255, 179, 0, 0.2)"
                }}
                whileTap={{ scale: 0.98, y: 0 }}
                transition={{ type: "spring", stiffness: 700, damping: 20 }}
                >
                    Get In Touch
                </motion.a>
            </div>
        </section>
    );
};

export default Hero;