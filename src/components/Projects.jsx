// src/components/Projects.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger);


const ProjectItem = React.forwardRef(({ project, index }, ref) => {
    // Determine layout: alternate the image left/right
    const isImageLeft = index % 2 === 0;

    // Tailwind order classes for alternating layout
    const textOrder = isImageLeft ? 'lg:order-last' : 'lg:order-first';
    const imageOrder = isImageLeft ? 'lg:order-first' : 'lg:order-last';

    // Style for external links
    const LinkStyle = "flex items-center text-primary hover:text-white transition-colors duration-300 font-medium text-lg";

    return (
        // ⭐ Use the forwarded ref here ⭐
        <Link 
            ref={ref} 
            to={project.path}
            // ⭐ Add a common class for GSAP targeting ⭐
            className="project-card grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-24 lg:mb-40 border-b border-gray-800 pb-20 lg:pb-32 group cursor-pointer hover:bg-gray-900/50 transition-colors duration-300"
        >
            {/* Project Details (Text) */}
            <div className={`space-y-6 ${textOrder}`}>
                <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">
                    {project.title}
                </h3>
                <p className="text-lg text-gray-300">
                    {project.summary}
                </p>

                <div className='flex flex-wrap gap-2 pt-2'>
                    {project.techStack.slice(0, 5).map((tech, i) => (
                        <span 
                            key={i} 
                            className="text-sm font-medium px-3 py-1 rounded-full bg-gray-700 text-gray-200 border border-primary/50 transition-colors duration-300 group-hover:bg-primary group-hover:text-black"
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
                            className={`${LinkStyle} cursor-pointer`}
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
            <div className={`${imageOrder} shadow-2xl rounded-xl overflow-hidden`}>
                <img 
                    src={project.image} 
                    alt={`Screenshot of ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
        </Link>
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
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-16 text-center">
                Featured Projects
            </h2>

            <div ref={containerRef}>
                {projects.map((project, index) => (
                    <ProjectItem key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Projects;