// src/components/Philosophy.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';


const Philosophy = () => {
    const { title, pillars } = PORTFOLIO_DATA.philosophy;
    
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    cardRefs.current = [];

    const addToRefs = (el) => {
        if(el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    }

    useEffect(() => {
        // --- 1. Register Plugin Locally within useEffect's scope ---
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        // --- 2. Use GSAP Context for Scoping and Cleanup ---
        let ctx = gsap.context(() => {
            
            // Set initial state (opacity: 0, y: 50) for all elements
            // This explicitly hides them before the ScrollTrigger logic takes over
            gsap.set([sectionRef.current.querySelector('h2'), ...cardRefs.current], { 
                opacity: 0, 
                y: 50 
            });

            // --- 3. Title Animation ---
            gsap.to(sectionRef.current.querySelector('h2'), {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 95%", // Starts very early
                    toggleActions: "play none none none",
                }
            });

            // --- 4. Card Stagger Animation ---
            gsap.to(cardRefs.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%", // Starts soon after the title
                    toggleActions: "play none none none",
                }
            });

        }, sectionRef); // Scope the animations to the sectionRef

        // --- 5. Return Cleanup Function ---
        // This is crucial for React! It kills the animations when the component unmounts.
        return () => ctx.revert(); 

    }, []);



    return (
        <section ref={sectionRef} id="philosophy" className="max-w-7xl mx-auto px-6 py-20 md:py-32" data-scroll-section>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-16 text-center">
                {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pillars.map((pillar, index) => (
                    <div 
                        key={index}
                        ref={addToRefs}
                        className="p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800 transition-shadow duration-300 hover:shadow-primary/50 hover:border-primary/50"
                    >
                        <span className="text-4xl mb-4 block">{pillar.icon}</span>
                        <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                        <p className="text-sm md:text-lg text-neutral">{pillar.description}</p>
                    </div>
                ))}
            </div>
            <hr className="mx-auto w-full mt-24 border-gray-800" />
        </section>
    );
};

export default Philosophy;