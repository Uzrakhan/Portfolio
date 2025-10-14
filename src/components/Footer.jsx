// src/components/Footer.jsx
import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';


const Footer = () => {
    const { socialLinks, hero } = PORTFOLIO_DATA;
    const currentYear = new Date().getFullYear();

    // A simple list of key sections for professional footers
    const keySections = [
        { name: "Projects", href: "#projects" },
        { name: "About", href: "#about" },
        // Assuming your 'id="contact"' on the footer is also a navigation point
        { name: "Contact", href: "#contact" }, 
    ];

    return (
        <footer id="contact" className="relative bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
                
                {/* 1. Main Grid Layout for modern footer structure */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700 pb-10 mb-8">
                    
                    {/* Column 1: Contact CTA & Primary Identity */}
                    <div className="flex flex-col items-start space-y-4">
                        <h3 className="text-xl font-bold text-primary">
                            {hero.name || "Your Name"}
                        </h3>
                        <p className="text-sm text-gray-400 max-w-xs">
                            Let's build something extraordinary. I'm available for new projects and collaborations.
                        </p>
                        <a
                            href={`mailto:${hero.email}`}
                            className="flex items-center space-x-2 mt-2 px-6 py-2 text-md font-semibold bg-primary text-black rounded-lg 
                                       shadow-md transition-all duration-300 hover:scale-[1.05] hover:bg-primary/90"
                        >
                            <span>Contact Now</span>
                        </a>
                    </div>

                    {/* Column 2: Quick Links / Site Map */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {keySections.map((item) => (
                                <li key={item.name}>
                                    <a 
                                        href={item.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200 text-base"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Social Media Links */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
                            Connect
                        </h3>
                        <div className="flex space-x-6">
                            {socialLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <a  
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={`Connect on ${link.name}`}
                                        className="text-2xl text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <Icon />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* 2. Copyright and Attribution (Bottom Row) */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear} {hero.name}. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-600">
                        Crafted with React, Tailwind,GSAP, Particles.js and a passion for clean code.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;