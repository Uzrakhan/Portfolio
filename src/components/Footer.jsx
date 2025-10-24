// src/components/Footer.jsx
import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Github, Linkedin, Twitter, Mail, Coffee, Code2, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';


const Footer = () => {
    const { socialLinks, hero } = PORTFOLIO_DATA;
    const currentYear = new Date().getFullYear();
    const [statusDot, setStatusDot] = useState(true);

    //animation for status dot
    useEffect(() => {
        const interval = setInterval(() => {
            setStatusDot(prev => !prev)
        }, 1000);
        return () => clearInterval(interval)
    },[]);

    const techStack = ['React', 'Node.js', 'TypeScript', 'MongoDB'];

    return (
        <div className='min-h-screen flex items-end'>
            <footer id="contact" className="relative w-full border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 md:px-12 md:py-16">
                    
                    {/* 1. Main Grid Layout for modern footer structure */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700 pb-10 mb-8">
                        
                        {/* Column 1: Contact CTA & Primary Identity */}
                        <div className="flex flex-col items-start space-y-2">
                            <h3 className="text-2xl font-bold text-primary">
                                Uzra Khan
                            </h3>
                            <p className="text-sm text-gray-400 max-w-xs">
                                Let's build something extraordinary. I'm available for new projects and collaborations.
                            </p>
                            <a
                                href="mailto:uzrakhan539@gmail.com"
                                className="flex items-center justify-center space-x-2 mt-2 px-6 py-2 w-full md:w-auto text-md font-semibold bg-blue-400 text-black rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-200 hover:shadow-blue-500/50"
                            >
                                <Mail size={18} />
                                <span>Contact Now</span>
                            </a>
                        </div>

                        <div className='flex flex-col items-start'>
                            <h3 className='text-lg font-semibold text-white mb-4 uppercase tracking-wider flex items-center gap-2'>
                                <Terminal size={18} className='text-blue-500'/>
                                Developer Status
                            </h3>

                            {/*Terminal box */}
                            <div className='w-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-lg'>
                                {/*Terminal header */}
                                <div className='bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700'>
                                    <div className='flex gap-1.5'>
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="text-xs text-gray-400 ml-2">status.sh</span>
                                </div>

                                {/* Terminal content */}
                                <div className="p-4 font-mono text-sm space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-500">$</span>
                                        <span className="text-gray-300">cat availability.txt</span>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <div className={`w-2 h-2 rounded-full ${statusDot ? 'text-blue-500' : 'bg-blue-500/30'} transition-all duration-300`}></div>
                                        <span className="text-blue-500">Available for hire</span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-blue-500">$</span>
                                        <span className="text-gray-300">cat current_focus.txt</span>
                                    </div>
                                    <div className="ml-4 text-gray-400 text-xs space-y-1">
                                        <p>→ Building with React.js</p>
                                        <p>→ Exploring Websockets</p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-blue-500">$</span>
                                        <span className="text-gray-300 animate-pulse">_</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Quick Links / Site Map */}
                        <div className="flex flex-col items-start space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
                                    Quick Links
                                </h3>
                                <ul className='space-y-3'>
                                    <li>
                                        <motion.a 
                                            href="#projects"
                                            className="text-gray-400 hover:text-blue-500 transition-colors duration-200 text-base flex items-center gap-2 group"
                                            whileHover={{ scale: 1.3 }}
                                            whileTap={{ scale: 0.9 }} // Shrinks on tap
                                            transition={{ type: "spring", stiffness: 500, damping: 20 }}

                                            >
                                            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                            Projects
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a 
                                            href="#about"
                                            className="text-gray-400 hover:text-blue-500 transition-colors duration-200 text-base flex items-center gap-2 group"
                                            whileHover={{ scale: 1.3 }}
                                            whileTap={{ scale: 0.9 }} // Shrinks on tap
                                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                            >
                                            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                            About
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a 
                                            href="#contact"
                                            className="text-gray-400 hover:text-blue-500 transition-colors duration-200 text-base flex items-center gap-2 group"
                                            whileHover={{ scale: 1.3 }}
                                            whileTap={{ scale: 0.9 }} // Shrinks on tap
                                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                            >
                                            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                            Contact
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a 
                                            href="https://drive.google.com/file/d/1G2byO61ITOsjonSUAXXIO6Dc6vaAtfe2/view?usp=sharing"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-blue-500 transition-colors duration-200 text-base flex items-center gap-2 group"
                                            whileHover={{ scale: 1.3 }}
                                            whileTap={{ scale: 0.9 }} // Shrinks on tap
                                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                            >
                                            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                            Resume
                                            <span className="text-xs text-gray-600 group-hover:text-blue-500/70">↗</span>
                                        </motion.a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 3: Social Media Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
                                Connect
                            </h3>
                            <div className="flex space-x-6">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <motion.a  
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={`Connect on ${link.name}`}
                                            className="text-2xl text-gray-400 duration-200"
                                            whileHover={{ scale: 1.3, rotate: 5 }} // Icon grows and slightly rotates
                                            whileTap={{ scale: 0.9 }} // Shrinks on tap
                                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                        >
                                            <Icon />
                                        </motion.a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 2. Copyright and Attribution (Bottom Row) */}
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-500">
                            &copy; {currentYear} Uzra Khan. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2 flex-wrap justify-center">
                            <span>Crafted with React, Tailwind & GSAP</span>
                            <span className="text-red-500">♥</span>
                            <span className="hidden md:inline">Fueled by ☕ and curiosity</span>
                        </p>
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Footer;