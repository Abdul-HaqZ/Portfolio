import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const Footer = () => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'github', label: 'GitHub' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-white cursor-pointer"
              onClick={scrollToTop}
            >
              Abdul Haq Zulfiqar
            </motion.div>
            
            <p className="text-slate-400 text-sm max-w-xs">
              Software Engineering Student passionate about building innovative solutions 
              with cutting-edge technology.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <span>Crafted with</span>
              <Code className="w-4 h-4 text-blue-400" />
              <span>&</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>💡</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            
            <div className="space-y-2 text-sm">
              <div className="text-slate-400">
                <span className="text-slate-500">Email:</span>{' '}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  {personalInfo.email}
                </a>
              </div>
              
              <div className="text-slate-400">
                <span className="text-slate-500">Phone:</span>{' '}
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-green-400 hover:text-green-300 transition-colors duration-200 blur-sm hover:blur-none"
                >
                  {personalInfo.phone}
                </a>
              </div>
              
              <div className="text-slate-400">
                <span className="text-slate-500">Location:</span>{' '}
                {personalInfo.location}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Abdul Haq Zulfiqar. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                LinkedIn
              </a>
              <button
                onClick={scrollToTop}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;