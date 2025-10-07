// src/components/Header.jsx
import React, { useState } from 'react';
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
///
///////

gsap.registerPlugin(ScrollToPlugin);

const Header = () => {
    const { navLinks } = PORTFOLIO_DATA;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
            // Close the Dialog when a link is clicked
            setIsMenuOpen(false); 

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
        setIsMenuOpen(false);
        gsap.to(window, { duration: 1.2, scrollTo: 0, ease: 'power2.inOut' });
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-sm shadow-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
              {/* Logo/Avatar */}
              <Link to="/" onClick={handleLogoClick}>
                  <span className="text-2xl font-extrabold text-primary border-2 border-primary rounded-full w-10 h-10 flex items-center justify-center">
                      UK
                  </span>
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

              {/* SHADCN MOBILE DIALOG IMPLEMENTATION */}
              <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <DialogTrigger asChild>
                      <button 
                          className="md:hidden z-50 text-white p-2"
                          aria-label="Open navigation menu"
                      >
                          {/* Simple Hamburger Icon */}
                          <span className="block h-0.5 w-6 bg-white my-1"></span>
                          <span className="block h-0.5 w-6 bg-white my-1"></span>
                          <span className="block h-0.5 w-6 bg-white my-1"></span>
                      </button>
                  </DialogTrigger>
                  
                  <DialogContent className="fixed inset-0 w-screen h-screen bg-background p-0 border-none rounded-none">
                      <div className="flex flex-col items-center justify-center h-full">
                          <ul className="flex flex-col items-center space-y-10 text-3xl font-bold">
                              {navLinks.map((link) => (
                                  <li key={link.text}>
                                      <Link
                                          to="/"
                                          onClick={() => scrollToSection(link.href)}
                                          className="text-neutral hover:text-primary transition-colors"
                                      >
                                          {link.text}
                                      </Link>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </DialogContent>
              </Dialog>
            </div>
        </header>
    );
};

export default Header;