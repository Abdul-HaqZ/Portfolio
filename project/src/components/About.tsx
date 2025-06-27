import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo, skills } from '../data/portfolio';

import Abdulhaqpic3 from '../data/Abdulhaqpic3.JPG';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // 300ms matches your menu close animation
  };

  return (
    <section id="about" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            About{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse" />
              <motion.img
                src={Abdulhaqpic3}
                alt="Abdul Haq Zulfiqar profile"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full object-cover rounded-full border-4 border-slate-700 bg-slate-800 shadow-lg"
                style={{ aspectRatio: '1/1' }}
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Personal Details</h3>
              <div className="space-y-3 text-slate-300">
                <div><span className="text-blue-400">Email:</span> ahaq1463@gmail.com</div>
                <div><span className="text-blue-400">Phone:</span> <span className="blur-sm hover:blur-none transition duration-300 cursor-pointer">{personalInfo.phone}</span></div>
                <div><span className="text-blue-400">LinkedIn:</span> <a href="https://www.linkedin.com/in/abdul-h4q" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">linkedin.com/in/abdul-h4q</a></div>
                <div><span className="text-blue-400">Location:</span> {personalInfo.location}</div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-sm border border-cyan-600/30"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Core Values</h3>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {skills.soft.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-sm border border-green-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;