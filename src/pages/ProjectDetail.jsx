import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//helper function to render decisins/outcomes lists
const renderStructuredText = (items) => {
    if (!items || items.length === 0) return;

    return (
        <ul className="list-disc pl-5 space-y-3 text-gray-300">
            {items.map((item, index) => (
                <li>{item}</li>
            ))}
        </ul>
    )
}


//helper function for embedding videos 
const videoEmbed = ({ url }) => {
    if (!url) return;

    return (
        <div className="relative w-full overflow-hidden rounded-xl shadow-2xl" style={{ paddingTop: '56.25%' }}>
            <iframe
                src={url}
                title="Project Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    )
};


const ProjectDetail = () => {
    const { slug } = useParams();

    const headerRef = useRef(null);
    const mediaRef = useRef(null);
    const contentRef = useRef(null);
    const overviewRef = useRef(null);
    const approachRef = useRef(null);
    const techDecisionsRef = useRef(null);

    // Find project based on slug. Assuming project.path is '/projects/slug'
    const project = PORTFOLIO_DATA.projects.find(p => p.path && p.path.endsWith(`/${slug}`));

    useEffect(() => {
        document.title = project ? `${project.title} | Projects` : 'Project Not Found';

        let ctx = gsap.context(() => {
            //1. Header entrance
            gsap.from(headerRef.current.children,{
                y: 20,
                opacity:0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.1
            });

            //2. Media entrance
            gsap.from(mediaRef.current, {
                opacity: 0,
                scale: 0.98,
                duration: 1.2,
                ease: "power2.out",
                delay: 0.3
            });

            //3. Content entrance
            // A. overview block
            gsap.from(overviewRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: overviewRef.current,
                    start: "top 85%", 
                    toggleActions: "play none none none",
                }
            });

            //B. Approach block
            gsap.from(approachRef.current, {
                opacity: 0,
                x: -50, // Slides from the left
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: approachRef.current,
                    start: "top 85%", 
                    toggleActions: "play none none none",
                }
            });

            //C. Tech block
            gsap.from(techDecisionsRef.current, {
                opacity: 0,
                scale: 0.95, // Slight scale for a focused feel
                duration: 0.5,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: techDecisionsRef.current,
                    start: "top 85%", 
                    toggleActions: "play none none none",
                }
            });

            // If you want all other blocks (Video, Outcome) to use the original staggered animation:
            const remainingBlocks = gsap.utils.toArray(contentRef.current.children).slice(3); // Assuming overview, approach, tech decisions are the first three

            gsap.from(remainingBlocks, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: remainingBlocks[0], // Trigger off the first remaining block (Video)
                    start: "top 90%",
                    toggleActions: "play none none none",
                }
            })
        });

        return () => ctx.revert()
    }, [project]);

    if (!project) {
        return (
            <div className="min-h-screen pt-32 text-center text-white">
                <h1 className="text-4xl font-bold">404: Project Not Found</h1>
                <p className="mt-4">Please check the URL or return to the projects list.</p>
            </div>
        );
    }

    const {
        title,
        image,
        description,
        sourceLink,
        liveLink,
        techStack = [],
        approach,
        techDecisions = {},
        videoUrl,
        outcome = []
    }  = project;

    return (
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-32 text-white" id="project-detail">

            {/* 1. HEADER & LINKS*/}
            <header ref={headerRef} className="mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4">
                    {title}
                </h1>

                <div className="flex flex-wrap gap-6 mb-8 text-xl font-medium">
                    {sourceLink && (
                        <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                            Repo
                        </a>
                    )}
                    {liveLink && (
                        <a href={liveLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                            Live Demo ↗
                        </a>
                    )}
                </div>
            </header>

            {/* 2. PROJECT THUMBNAIL/GIF */}
            <div ref={mediaRef} className="mb-16 shadow-2xl rounded-xl overflow-hidden">
                <img 
                    src={image}
                    alt={`Hero image for ${title}`} 
                    className="w-full h-auto object-cover"
                />
            </div>

            {/*3. CORE OVERVIEW */}
            <div ref={contentRef} className="space-y-12">
                <div ref={overviewRef} className="bg-gray-800/50 p-8 rounded-lg">
                    <h2 className="text-3xl font-bold text-white mb-4">Project Overview</h2>
                    <p className="text-lg text-gray-300">{description}</p>
                </div>

                {/*4.PROBELM SOLVING APPROACH */}
                <div ref={approachRef} className="pt-6">
                    <h2 className="text-3xl font-bold text-white mb-4">How I Approached Problem-Solving</h2>
                    <p className="text-lg text-gray-300 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: approach }}></p>
                </div>


                {/* 5. TECH STACK AND DECISIONS */}
                <div ref={techDecisionsRef} className="pt-6">
                    <h2 className="text-3xl font-bold text-white mb-4">Tech Stack</h2>
                    <p className="text-2xl font-mono font-bold text-primary mb-6">
                        {techStack.join(' | ')}
                    </p>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">Decision Behind Each Tech Choice</h3>
                    <div className="space-y-6">
                        {Object.entries(techDecisions).map(([tech, decision], index) => (
                            <div key={index} className="border-l-4 border-primary pl-4">
                                <p className="font-semibold text-xl text-white mb-1">{tech}</p>
                                <p className="text-gray-300">{decision}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. VIDEO DEMO & TESTIMONIALS */}
                <div className="pt-10">
                    <h2 className="text-3xl font-bold text-white mb-6">Video Demo & Feedback (Mandatory)</h2>
                    
                    {/* Video Embed */}
                    <videoEmbed url={videoUrl} />
                </div>

                {/* 7. OUTCOME & LEARNINGS */}
                <div className="pt-10">
                    <h2 className="text-3xl font-bold text-white mb-4">Outcome & Key Learnings</h2>
                    {renderStructuredText(outcome)}
                </div>
            </div>
        </section>
    )
}

export default ProjectDetail;