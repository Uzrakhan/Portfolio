// src/components/LearningLog.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// Register ScrollTrigger, which is necessary for scroll-based animations
// Note: You can register this once in App.jsx or main index file, but 
// registering here ensures it's available even if the component loads late.
gsap.registerPlugin(ScrollTrigger);

const LearningLog = () => {
    const { title, currentFocus } = PORTFOLIO_DATA.learningLog;
    const sectionRef = useRef(null);
    const itemRefs = useRef([]);
    itemRefs.current = [];

    const addToItemRefs = (el) => {
        if (el && !itemRefs.current.includes(el)) {
            itemRefs.current.push(el);
        }
    };

    useEffect(() => {
        if (!sectionRef.current) return;

        // --- Use GSAP Context for Scoping and Cleanup (Crucial for React) ---
        let ctx = gsap.context(() => {
            
            // --- 1. Explicitly Set Initial Hidden State for Title and Items ---
            gsap.set([sectionRef.current.querySelector('h2'), ...itemRefs.current], { 
                opacity: 0, 
                y: 30 
            });

            // --- 2. Title Animation ---
            gsap.to(sectionRef.current.querySelector('h2'), {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 95%", // Start animation very early
                    toggleActions: "play none none none",
                }
            });

            // --- 3. Items Stagger Animation ---
            gsap.to(itemRefs.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.15, // Sequential fade-up
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", // Start items shortly after title
                    toggleActions: "play none none none",
                }
            });

        }, sectionRef); // Scope the animations to the sectionRef

        // --- 4. Return Cleanup Function ---
        return () => ctx.revert(); 
    }, []);

    return (
        <section ref={sectionRef} id="learning-log" className="max-w-4xl mx-auto px-6 py-20 md:py-32" data-scroll-section>
            <h2 className="text-4xl font-extrabold text-white mb-16 text-center">
                {title}
            </h2>

            <div className="space-y-8">
                {currentFocus.map((item, index) => (
                    <div 
                        ref={addToItemRefs} // Attach ref for animation
                        key={index} 
                        className="p-6 bg-gray-900 rounded-xl border border-gray-800"
                    >
                        <h3 className="text-2xl font-semibold text-primary mb-3 flex items-center">
                            <span className="text-3xl mr-3">💡</span>
                            {item.title}
                        </h3>
                        <p className="text-lg text-neutral mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {item.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-xs font-medium bg-gray-700 text-white rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <hr className="mx-auto w-full mt-24 border-gray-800" />
        </section>
    );
};

export default LearningLog;