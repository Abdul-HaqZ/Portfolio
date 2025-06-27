import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, Video } from 'lucide-react';

const BookAppointment = () => {
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

  const meetingTypes = [
    {
      title: "Quick Chat",
      duration: "15 minutes",
      description: "Brief discussion about opportunities or questions",
      icon: Clock,
      color: "blue",
      link: "https://calendly.com/ahaq1463/quick-chat"
    },
    {
      title: "Project Discussion",
      duration: "30 minutes",
      description: "Detailed conversation about project requirements",
      icon: Calendar,
      color: "cyan",
      link: "https://calendly.com/ahaq1463/project-discussion"
    },
    {
      title: "Technical Interview",
      duration: "60 minutes",
      description: "Comprehensive technical discussion and code review",
      icon: Video,
      color: "green",
      link: "https://calendly.com/ahaq1463/technical-interview"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-600/20",
        text: "text-blue-300",
        border: "border-blue-600/30",
        icon: "text-blue-400",
        button: "bg-blue-600 hover:bg-blue-700"
      },
      cyan: {
        bg: "bg-cyan-600/20",
        text: "text-cyan-300",
        border: "border-cyan-600/30",
        icon: "text-cyan-400",
        button: "bg-cyan-600 hover:bg-cyan-700"
      },
      green: {
        bg: "bg-green-600/20",
        text: "text-green-300",
        border: "border-green-600/30",
        icon: "text-green-400",
        button: "bg-green-600 hover:bg-green-700"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="appointment" className="py-20 bg-slate-900/50">
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
            Book an{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Appointment
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            Let's discuss your project, opportunities, or just have a friendly chat about technology
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Meeting Types */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Choose Meeting Type</h3>
            
            {meetingTypes.map((meeting, index) => {
              const colorClasses = getColorClasses(meeting.color);
              const Icon = meeting.icon;
              
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row items-start md:space-x-4 space-y-4 md:space-y-0">
                    <div className={`p-3 rounded-lg ${colorClasses.bg} ${colorClasses.border} border flex-shrink-0 mb-2 md:mb-0`}>
                      <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <h4 className="text-xl font-semibold text-white">{meeting.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border} w-max mt-1 md:mt-0`}>{meeting.duration}</span>
                      </div>
                      <p className="text-slate-300 mb-4">{meeting.description}</p>
                      <motion.a
                        href={meeting.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`block w-full md:w-auto px-4 py-2 ${colorClasses.button} text-white rounded-lg font-medium transition-colors duration-200 text-center`}
                      >
                        Select {meeting.title}
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Calendar Embed */}
          <motion.div variants={itemVariants} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-semibold text-white mb-6">Schedule Your Meeting</h3>
            
            {/* Placeholder for Calendly or Google Calendar embed */}
            <div className="aspect-video bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600">
              <div className="text-center">
                <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-300 mb-4">Calendar integration will be embedded here</p>
                <p className="text-sm text-slate-400">
                  This would typically show a Calendly or Google Calendar widget
                </p>
              </div>
            </div>
            
            {/* Temporary booking link */}
            <div className="mt-6 text-center">
              <motion.a
                href="https://calendly.com/ahaq1463"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Open Calendar
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;