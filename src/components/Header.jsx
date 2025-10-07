// src/components/Header.jsx
import React from 'react'; // Removed useState
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// ⭐ CRITICAL: Import your logo image file here. ⭐
import UzraLogo from '../assets/Logo.png'; 
// NOTE: Adjust 'Logo.png' to your exact file name and extension (e.g., 'uzra-avatar.svg')

gsap.registerPlugin(ScrollToPlugin);

const Header = () => {
    const { navLinks } = PORTFOLIO_DATA;
    // Removed: const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
            // No need to close a menu, so we go straight to scrolling
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
        // No need for setIsMenuOpen(false)
        gsap.to(window, { duration: 1.2, scrollTo: 0, ease: 'power2.inOut' });
    };
    
    // Removed: const toggleMenu = () => { ... }

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-sm shadow-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* Logo/Avatar - Now uses the imported image */}
                <Link to="/" onClick={handleLogoClick}>
                    <img 
                        src={UzraLogo} 
                        alt="Uzra Khan Logo" 
                        className="w-10 h-10 rounded-full border-2 border-primary object-cover" 
                    />
                </Link>

                {/* Desktop Navigation Links - Shown only on MD screens and up */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-8">
                        {navLinks.map((link) => (
                            <li key={link.text}>
                                <Link
                                    to="/"
                                    onClick={() => scrollToSection(link.href)}
                                    className="relative text-neutral hover:text-white font-medium transition-colors duration-200"
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* ⭐ IMPORTANT: The mobile hamburger button is removed here. ⭐ */}
                {/* On small screens, the nav links will remain hidden, and there will be no way to navigate. */}
            </div>
            
            {/* ⭐ IMPORTANT: The mobile menu overlay is removed here. ⭐ */}
        </header>
    );
};

export default Header;