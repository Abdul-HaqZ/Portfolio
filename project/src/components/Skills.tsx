import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Wrench, Brain, MessageCircle } from 'lucide-react';
import { skills } from '../data/portfolio';

const Skills = () => {
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

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: skills.programming,
      color: "blue"
    },
    {
      title: "Tools & Technologies",
      icon: Wrench,
      skills: skills.tools,
      color: "cyan"
    },
    {
      title: "Soft Skills",
      icon: Brain,
      skills: skills.soft,
      color: "green"
    },
    {
      title: "Spoken Languages",
      icon: MessageCircle,
      skills: skills.languages,
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-600/20",
        text: "text-blue-300",
        border: "border-blue-600/30",
        icon: "text-blue-400"
      },
      cyan: {
        bg: "bg-cyan-600/20",
        text: "text-cyan-300",
        border: "border-cyan-600/30",
        icon: "text-cyan-400"
      },
      green: {
        bg: "bg-green-600/20",
        text: "text-green-300",
        border: "border-green-600/30",
        icon: "text-green-400"
      },
      purple: {
        bg: "bg-purple-600/20",
        text: "text-purple-300",
        border: "border-purple-600/30",
        icon: "text-purple-400"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" className="py-20 bg-slate-950">
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
            My{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            A comprehensive toolkit built through years of learning and hands-on experience
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const colorClasses = getColorClasses(category.color);
            const Icon = category.icon;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg ${colorClasses.bg} ${colorClasses.border} border mr-4`}>
                    <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      className={`px-4 py-2 ${colorClasses.bg} ${colorClasses.text} rounded-full text-sm font-medium border ${colorClasses.border} hover:scale-105 transition-transform duration-200 cursor-default`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;