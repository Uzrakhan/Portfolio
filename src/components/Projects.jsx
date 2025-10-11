// src/components/Projects.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger);


const ProjectItem = ({ project, index }) => {
    // Determine layout: alternate the image left/right
    const isImageLeft = index % 2 === 0;

    // Ref for the individual project card container
    const projectRef = useRef(null);

    useEffect(() => {
        if (!projectRef.current) return;

        let ctx = gsap.context(() => {
            gsap.set(projectRef.current, { opacity:0, y: 50 });

            const setupAnimation = () => {
                gsap.to(projectRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: projectRef.current,
                        start: "top 95%", // Gentle start
                        toggleActions: "play none none none",
                    }
                })
            };

            const timer = setTimeout(setupAnimation, 50);

            ScrollTrigger.addEventListener("refreshInit", setupAnimation);

            return () => {
                clearTimeout(timer);
                ScrollTrigger.removeEventListener("refreshInit", setupAnimation); 
            };
        }, projectRef);

        return () => ctx.revert();
    }, [index])

    // Tailwind order classes for alternating layout
    const textOrder = isImageLeft ? 'lg:order-last' : 'lg:order-first';
    const imageOrder = isImageLeft ? 'lg:order-first' : 'lg:order-last';

    // Style for external links
    const LinkStyle = "flex items-center text-primary hover:text-white transition-colors duration-300 font-medium text-lg";

    return (
        <Link 
            ref={projectRef}
            to={project.path}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-24 lg:mb-40 border-b border-gray-800 pb-20 lg:pb-32 group cursor-pointer hover:bg-gray-900/50 transition-colors duration-300"
        >
            {/* Project Details (Text) */}
            <div className={`space-y-6 ${textOrder}`}>
                <h3 className="text-4xl font-extrabold text-primary mb-2">
                    {project.title}
                </h3>
                <p className="text-lg text-gray-300">
                    {project.summary}
                </p>

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
};


const Projects = () => {
    const { projects } = PORTFOLIO_DATA;
    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} id="projects" className="max-w-7xl mx-auto px-6 py-20 md:py-32" data-scroll-section>
            <h2 className="text-5xl font-extrabold text-white mb-16 text-center">
                Featured Projects
            </h2>

            <div>
                {projects.map((project, index) => (
                    <ProjectItem key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Projects;