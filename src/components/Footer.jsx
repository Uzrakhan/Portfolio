// src/components/Footer.jsx
import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const Footer = () => {
    const { socialLinks, hero } = PORTFOLIO_DATA;
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="max-w-7xl mx-auto px-6 py-12 md:py-16 border-t border-gray-800">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
                
                {/* Contact CTA */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Ready to collaborate?
                </h2>
                <a
                    href={`mailto:${hero.email}`}
                    className="inline-block px-10 py-4 text-xl font-bold bg-primary text-black rounded-full 
                               shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:bg-primary/90"
                >
                    Email Me Now
                </a>
                
                {/* Social Links */}
                <div className="flex space-x-6 pt-6">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={link.name}
                            className="text-2xl text-neutral hover:text-white transition-colors duration-200"
                        >
                            {/* Simple text icons are used here. You can replace with SVG/React Icons if installed. */}
                            {link.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright/Attribution */}
                <p className="text-sm text-gray-600 pt-6">
                    &copy; {currentYear} {hero.name}. Built with React, Tailwind, and a little GSAP magic.
                </p>
            </div>
        </footer>
    );
};

export default Footer;