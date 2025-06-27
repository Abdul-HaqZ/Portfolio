import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Calendar, ChevronDown } from 'lucide-react';
import CV from '../ABDUL HAQ ZULFIQAR_SoftwareEng_CV.pdf';

const Hero = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full scale-150">
        <iframe
          src="https://my.spline.design/particles-5OygAKyfXFMSEGBto2QhH7Uv/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="3D Particle Background"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Abdul Haq{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Zulfiqar
            </span>
          </motion.h1>

          <motion.div
            className="text-xl sm:text-2xl lg:text-3xl text-slate-300 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Software Engineering Student
          </motion.div>

          <motion.div
            className="text-lg sm:text-xl text-slate-400 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            DevOps, AI & Full-Stack Web Developer
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href={CV}
              download="ABDUL_HAQ_ZULFIQAR_SoftwareEng_CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center px-8 py-4 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-700"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('appointment')}
              className="inline-flex items-center px-8 py-4 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          className="fixed bottom-8 inset-x-0 z-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-200"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;