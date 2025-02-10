"use client";

import { useState, useEffect } from "react"
import { Trophy, Star, Coffee, BookOpen, Clock, User, ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import dynamic from 'next/dynamic'
import { motion } from "framer-motion"
import axios from "axios"

// Dynamic import for Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-700 rounded-xl w-full h-64"></div>
})

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  duration: string;
  instructor?: string;
  highlightColor: string;
}

interface Speaker {
  name: string;
  role: string;
  expertise: string;
  bio: string;
  achievements: string[];
  image: string;
  lottieUrl: string;
}

interface LottieData {
  [key: string]: any;
}

const WorkshopDetails = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const scheduleItemVariants = {
    hidden: { 
      x: -50,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const popUpVariant = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const backgroundLottie = {
    url: 'https://lottie.host/d8dc245d-ccf2-4d6c-ac36-70b04bd74d39/smIRtpjlxp.json'
  };

  const schedule: ScheduleItem[] = [
    {
      time: "09:00 AM",
      title: "Introduction to LangChain",
      description: "Fundamentals, architecture, and core concepts",
      duration: "2h",
      instructor: "Ramachandra Udupa",
      highlightColor: "text-[#FF3CBD]"
    },
    {
      time: "11:00 AM",
      title: "Building with LangGraph",
      description: "Advanced patterns and real-world applications",
      duration: "1.5h",
      instructor: "Ramachandra Udupa",
      highlightColor: "text-[#5634FF]"
    },
    {
      time: "12:30 PM",
      title: "Networking Lunch Break",
      description: "Connect with fellow developers",
      duration: "1h",
      highlightColor: "text-[#34FFE9]"
    },
    {
      time: "01:30 PM",
      title: "Hands-on Project Workshop",
      description: "Build a production-ready LangChain application",
      duration: "3h",
      instructor: "Ramachandra Udupa",
      highlightColor: "text-[#FF3CBD]"
    }
  ];

  const speakers: Speaker[] = [
    {
      name: "Ramachandra Udupa",
      role: "Technical Coordinator",
      expertise: "LangGraph Expert",
      bio: "10+ years of experience in AI/ML",
      achievements: ["Published Author", "Tech Conference Speaker", "Open Source Contributor"],
      image: "/api/placeholder/100/100",
      lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_w51pcehl.json'
    }
  ];

  const highlights = [
    {
      icon: Trophy,
      title: "Hands-on Experience",
      description: "Build real-world applications",
      gradient: "from-[#FF3CBD] to-[#5634FF]"
    },
    {
      icon: Star,
      title: "Expert Guidance",
      description: "Learn from industry leaders",
      gradient: "from-[#5634FF] to-[#34FFE9]"
    },
    {
      icon: Coffee,
      title: "Networking",
      description: "Connect with like-minded developers",
      gradient: "from-[#34FFE9] to-[#FF3CBD]"
    }
  ];

  const [lottieData, setLottieData] = useState<{ [key: string]: LottieData }>({});

  useEffect(() => {
    const fetchLottieData = async () => {
      try {
        const lottieResults: { [key: string]: LottieData } = {};
        
        // Fetch all unique Lottie URLs
        const uniqueUrls = Array.from(new Set([
          ...speakers.map(speaker => speaker.lottieUrl),
          backgroundLottie.url
        ]));
  
        for (const url of uniqueUrls) {
          const response = await axios.get(url);
          lottieResults[url] = response.data;
        }
  
        setLottieData(lottieResults);
      } catch (error) {
        console.error('Error fetching Lottie data:', error);
      }
    };
  
    fetchLottieData();
  }, [backgroundLottie.url, speakers]);

  return (
    <div 
      className="relative min-h-screen bg-[#09080e] text-white py-16 md:py-32 px-4 overflow-hidden"
    >
      {/* Background animation */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <Lottie 
          animationData={lottieData[backgroundLottie.url]}
          loop={true}
          autoplay={true}
        />
      </div>

      <div 
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header Section */}
        <div className="mb-16 md:mb-24 text-center">
          <div 
            className="flex items-center justify-center mb-4"
          >
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-[#FF3CBD] animate-pulse mr-2" />
            <span className="text-[#FF3CBD] text-sm md:text-base font-semibold tracking-wider">WORKSHOP DETAILS</span>
          </div>
          
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-[#FF3CBD] via-[#5634FF] to-[#34FFE9] bg-clip-text text-transparent"
          >
            LangChain Workshop
          </h1>

          {/* Workshop Highlights */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={popUpVariant}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-xl rounded-2xl p-6 bg-gray-900/40 border border-gray-800/50 hover:border-[#FF3CBD]/50 transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`bg-gradient-to-r ${highlight.gradient} p-3 rounded-xl w-fit mx-auto mb-4`}
                >
                  <highlight.icon className="w-6 h-6 text-white" />
                </motion.div>
                <motion.h3 variants={fadeInUpVariant} className="text-xl font-semibold mb-2">
                  {highlight.title}
                </motion.h3>
                <motion.p variants={fadeInUpVariant} className="text-gray-400">
                  {highlight.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Expert Section
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-[#FF3CBD] via-[#5634FF] to-[#34FFE9] bg-clip-text text-transparent">
            Meet the Expert
          </h2>
          <div className="flex justify-center mt-10">
            {speakers.map((speaker, index) => (
              <motion.div
                key={index}
                variants={popUpVariant}
                whileHover={{ scale: 1.02 }}
                className="group backdrop-blur-xl rounded-2xl md:rounded-3xl p-8 md:p-10 bg-gray-900/40 border border-gray-800/50 hover:border-[#FF3CBD]/50 transition-all duration-300 relative overflow-hidden max-w-xl"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                  {lottieData[speaker.lottieUrl] && (
                    <Lottie 
                      animationData={lottieData[speaker.lottieUrl]}
                      loop={true}
                      autoplay={true}
                      style={{ width: '100%', height: '100%' }}
                    />
                  )}
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name} 
                    className="w-32 h-32 rounded-full ring-4 ring-[#FF3CBD] object-cover"
                  />
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{speaker.name}</h3>
                    <p className="text-[#5634FF] text-lg mb-1">{speaker.role}</p>
                    <p className="text-[#34FFE9] mb-4">{speaker.expertise}</p>
                    <p className="text-gray-400 mb-4">{speaker.bio}</p>
                    <ul className="space-y-2">
                      {speaker.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-300">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Schedule Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-[#FF3CBD] via-[#5634FF] to-[#34FFE9] bg-clip-text text-transparent">
            Workshop Schedule
          </h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid gap-6 mt-10"
          >
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariant}
                whileHover={{ 
                  scale: 1.02,
                  x: 10,
                  transition: { duration: 0.2 }
                }}
                className="group relative backdrop-blur-xl rounded-2xl p-6 md:p-8 bg-gray-900/40 border border-gray-800/50 hover:border-[#FF3CBD]/50 transition-all duration-300 overflow-hidden"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent"
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ x: '100%', opacity: 0.1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div 
                    className="flex items-center gap-4"
                  >
                    <Clock className={`w-5 h-5 ${item.highlightColor}`} />
                    <span className="text-xl font-semibold text-white">{item.time}</span>
                    <span 
                      className={`${item.highlightColor} px-3 py-1 rounded-full border border-current`}
                    >
                      {item.duration}
                    </span>
                  </div>
                  
                  <div className="flex-1 md:ml-8">
                    <h3 
                      className="text-xl font-medium text-white mb-2"
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  
                  {item.instructor && (
                    <div 
                      className="flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{item.instructor}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Register Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center"
        >
          <a href="/register" className="inline-block">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-[#FF3CBD] via-[#5634FF] to-[#34FFE9] text-white px-8 py-4 rounded-full font-semibold text-lg relative overflow-hidden"
            >
              <motion.span 
                className="relative z-10 flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                Register Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#34FFE9] via-[#5634FF] to-[#FF3CBD]"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkshopDetails;