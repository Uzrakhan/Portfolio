// src/components/Header.jsx
import React, { useState } from 'react'; // 👈 RE-IMPORTED useState
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import UzraLogo from '../assets/Logo.png'; 

gsap.registerPlugin(ScrollToPlugin);


// --- FRAMER MOTION VARIANTS ---

const menuVariants = {
    closed: {
        x: "-100%", 
        transition: { 
            type: "spring", 
            stiffness: 400, 
            damping: 40,
            staggerChildren: 0.05,
            staggerDirection: -1 
        }
    },
    open: {
        x: 0, 
        transition: { 
            type: "spring", 
            stiffness: 200, 
            damping: 40,
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    closed: {
        y: 50, 
        opacity: 0,
        transition: { duration: 0.3 }
    },
    open: { 
        y: 0, 
        opacity: 1, 
        transition: { 
            type: "spring", 
            stiffness: 400, 
            damping: 25 
        } 
    },
}

// --- HEADER COMPONENT ---

const Header = () => {
    const { navLinks } = PORTFOLIO_DATA;
    const [isOpen, setIsOpen] = useState(false); // 👈 Correctly using state

    const scrollToSection = (id) => {
        const targetElement = document.getElementById(id.replace('#', '')); // Remove '#' for document.getElementById
        
        // ⭐ Close the mobile menu when a section is clicked ⭐
        if (isOpen) {
            setIsOpen(false); 
        }
        
        if (targetElement) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: targetElement,
                    offset: 60 
                },
                ease: 'power2.inOut'
            });
        }
    };

    const handleLogoClick = () => {
        if (isOpen) {
            setIsOpen(false); // Close menu if logo is clicked
        }
        gsap.to(window, { duration: 1.2, scrollTo: 0, ease: 'power2.inOut' });
    };
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-sm shadow-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* Logo/Avatar */}
                <Link to="/" onClick={handleLogoClick}>
                    <img 
                        src={UzraLogo} 
                        alt="Uzra Khan Logo" 
                        className="w-10 h-10 rounded-full border-2 border-primary object-cover" 
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-8">
                        {navLinks.map((link) => (
                            <li key={link.text}>
                                <a // Use <a> instead of <Link> for hash-based scrolling
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                    }}
                                    className="relative text-neutral hover:text-white font-medium transition-colors duration-200"
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* ⭐ HAMBURGER TOGGLE BUTTON (Visible only on mobile) ⭐ */}
                <button 
                    onClick={toggleMenu} 
                    className="md:hidden text-white hover:text-primary z-[60] focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            
            {/* ⭐ MOBILE MENU FLYOUT (Framer Motion) ⭐ */}
            <motion.div 
                variants={menuVariants} 
                animate={isOpen ? "open" : "closed"}
                initial="closed" 
                
                className={`
                    md:hidden fixed top-0 left-0 w-full h-screen 
                    bg-gray-900 
                `}
                style={{ zIndex: 55, paddingTop: '72px' }} // 72px is roughly the height of the header (py-4)
            >
                <div className="px-6 flex flex-col items-center space-y-4">
                    {navLinks.map((link) => (
                        <motion.a 
                            key={link.text} 
                            href={link.href} 
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(link.href); // This now handles closing the menu
                            }} 
                            variants={itemVariants} 
                            className="text-white text-2xl font-extrabold hover:text-primary transition duration-300 w-full text-center py-4 border-b border-gray-800"
                        >
                            {link.text}
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </header>
    );
};

export default Header;