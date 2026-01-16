// src/components/Projects.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);


const ProjectItem = React.forwardRef(({ project, index }, ref) => {
    // Determine layout: alternate the image left/right
    const isImageLeft = index % 2 === 0;

    // Tailwind order classes for alternating layout
    const textOrder = isImageLeft ? 'lg:order-last' : 'lg:order-first';
    const imageOrder = isImageLeft ? 'lg:order-first' : 'lg:order-last';

    // Style for external links
    const LinkStyle = `
        relative flex items-center gap-1 
        text-primary font-medium text-lg
        transition-all duration-300
        after:absolute after:-bottom-1 after:left-0
        after:h-[2px] after:w-0 after:bg-primary
        after:transition-all after:duration-300
        hover:after:w-full
    `;


    return (
        // ⭐ Use the forwarded ref here ⭐
        <motion.a 
            ref={ref} 
            href={project.path}
            // ⭐ Add a common class for GSAP targeting ⭐
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-24 lg:mb-40 
                    p-8 lg:p-10 
                    rounded-2xl
                    bg-white/5 
                    backdrop-blur-sm
                    border border-white/10
                    group cursor-pointer 
                    transition-all duration-300
                "
            
            whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
                backgroundColor: "rgba(255,255,255,0.08)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Project Details (Text) */}
            <div className={`space-y-6 ${textOrder} transition-transform duration-500 ease-out
                group-hover:-translate-y-1`}
            >
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                    {project.title}
                </h3>
                <span
                    className="
                    block h-[2px] w-0 bg-primary mt-2
                    transition-all duration-500 ease-out
                    group-hover:w-full
                    "
                />

                <p className="text-lg text-gray-300">
                    {project.summary}
                </p>

                <div className='flex flex-wrap gap-2 pt-2'>
                    {project.techStack.slice(0, 5).map((tech, i) => (
                        <span 
                            key={i} 
                            className="text-sm font-medium px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10 transition-colors duration-300 group-hover:bg-white/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* --- Project Links --- */}
                <div className="flex gap-8 pt-4">
                    {project.sourceLink && (
                        <span 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(project.sourceLink, '_blank')
                            }}
                            className={`${LinkStyle} cursor-pointer transition-transform duration-300 group-hover:translate-x-1`}
                        >
                            Source ↗
                        </span>
                    )}
                    {project.liveLink && (
                        <span 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(project.liveLink, '_blank')
                            }}
                            className={`${LinkStyle} cursor-pointer`}
                        >
                            Live Demo ↗
                        </span>
                    )}
                </div>
            </div>

            {/* Project Image */}
            <div className={`${imageOrder} rounded-2xl overflow-hidden ring-1 ring-white/10`}>
                <img 
                    src={project.image} 
                    alt={`Screenshot of ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
        </motion.a>
    );
});
// Need to set displayName for debugging purposes
ProjectItem.displayName = 'ProjectItem';



const Projects = () => {
    const { projects } = PORTFOLIO_DATA;
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(containerRef.current.children);

            if (cards.length === 0) {
                // IMPORTANT: Exit if no cards are found to prevent the error
                console.warn("GSAP: No project cards found to animate.");
                return;
            }

            gsap.set(cards, { opacity:0, y: 50 });

            gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: cards[0],
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        }, sectionRef)

        return () => ctx.revert()
    }, [projects]);

    return (
        <section ref={sectionRef} id="projects" className="relative max-w-7xl mx-auto px-6 py-20 md:py-32" data-scroll-section>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center">
                Selected Work
            </h2>
            <p className="text-gray-400 text-center max-w-xl mx-auto mb-20">
                A few projects where I focused on performance, UI clarity, and real-world problem solving.
            </p>


            <div ref={containerRef}>
                {projects.map((project, index) => (
                    <ProjectItem key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Projects;