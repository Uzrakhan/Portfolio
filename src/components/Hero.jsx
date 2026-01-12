// src/components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ParticlesBackground from './ParticlesBackground';
import RubiksHero3D from './RubiksHero3D';
import { motion } from 'framer-motion';

const PORTFOLIO_DATA = { 
    hero: { 
        name: "UZRA KHAN", 
        specialty: "Frontend Engineer with FullStack Expertise", 
        summary: "Dedicated Frontend Engineer with a passion for building highly performant, responsive, and accessible user interfaces. Expert in the React ecosystem and leveraging Fullstack knowledge to drive efficient collaboration and scalable application architecture.",
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
    const hoverRef = useRef(null);
    
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


            const specialtyText = specialtyTextRef.current;
            const hoverElement = hoverRef.current;
            
            let highlightTween = null;

            const PRIMARY_COLOR_HEX = '#FFB300'; 
            const INITIAL_COLOR_HEX = '#2563EB'; 

            const onMouseEnter = () => {
                if (highlightTween) highlightTween.kill();
                
                highlightTween = gsap.to(specialtyText, {
                    color: PRIMARY_COLOR_HEX, 
                    duration: 0.3,
                    ease: 'power1.out',
                });
            };

            const onMouseLeave = () => {
                if (highlightTween) highlightTween.kill();

                highlightTween = gsap.to(specialtyText, {
                    color: INITIAL_COLOR_HEX, 
                    duration: 0.3,
                    ease: 'power1.out',
                });
            };

            if (hoverElement) {
                hoverElement.addEventListener('mouseenter', onMouseEnter);
                hoverElement.addEventListener('mouseleave', onMouseLeave);
            }

            return () => {
                ctx.revert();
                // IMPORTANT: Remove listeners to prevent memory leaks
                if (hoverElement) {
                    hoverElement.removeEventListener('mouseenter', onMouseEnter);
                    hoverElement.removeEventListener('mouseleave', onMouseLeave);
                }
            };

        }, nameWrapRef) 
    }, []);
    

    return (
        <section id="page1" className="min-h-screen relative w-full px-6 pt-56 md:pt-56"> 
            
            {/* ⭐ LAYER 1: PARTICLES (very back) ⭐ */}
            <div className="absolute inset-0 z-0 pointer-events-none">
            <ParticlesBackground />
            </div>

            {/* ⭐ LAYER 2: 3D RUBIKS CUBE ⭐ */}
            <div className="absolute right-0 top-1/3 -translate-y-1/2 w-[50%] h-[60%] z-[5] pointer-events-none">
                
                <div
                    className="
                    absolute inset-0 
                    bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0)_65%)]
                    blur-2xl
                    "
                />
                <RubiksHero3D />
            </div>


            {/* ⭐ LAYER 3: UI CONTENT (Z-INDEX 10) ⭐ */}
            <div className='relative z-10 mt-12 md:mt-20'>
                {/* NAME - Must be wrapped for the "from below" effect */}
                <div ref={nameWrapRef} className="overflow-hidden mb-4 md:mb-6">
                    <h1
                        className="font-serif text-white uppercase font-black text-5xl tracking-tight
                        md:text-[6.5rem]
                        "
                        style={{ fontFamily: "'Dancing Script', cursive", display: 'block' }}
                    >
                        <span ref={nameTextRef} className='inline-block'>{name}</span>
                    </h1>
                </div>

                {/* SPECIALTY - Must be wrapped for the "from below" effect */}
                <div ref={specialtyWrapRef} className="overflow-hidden mb-6 md:mb-8">
                    <p
                        className="font-sans uppercase font-semibold text-xl md:text-4xl cursor-pointer
                        relative group inline-block p-2 rounded-lg transition-all duration-300"
                        style={{fontFamily: "'Bodoni Moda', serif"}} 
                        ref={hoverRef}
                    >
                        <div 
                            className="absolute inset-0 bg-primary/20 rounded-lg 
                                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        ></div>
                        <span 
                            ref={specialtyTextRef} 
                            // Set initial color class. GSAP will animate the change.
                            className='inline-block relative z-10 text-neutral-300' 
                        >
                            {specialty}
                        </span>
                    </p>
                </div>

                
                <div ref={summaryWrapRef} className="overflow-hidden mb-16">
                    <p 
                        className="text-sm font-normal text-neutral md:text-lg leading-relaxed max-w-2xl"
                    >
                        <span ref={summaryTextRef} className='inline-block'>{summary}</span>
                    </p>
                </div>
                

                {/* CTA Button */}
                <motion.a
                    ref={ctaRef}
                    className="inline-block rounded-full bg-primary/90 px-5 py-3 backdrop-blur-sm text-base border border-primary/30 leading-5 font-medium text-black max-w-fit duration-300"
                    href={`mailto:${email}`}

                    whileHover={{
                        backgroundColor: "#E5E7EB",
                        color: "#000000",
                        y: -1,
                        scale: 1.03,
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