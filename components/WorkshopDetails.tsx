"use client";

import { useState, useEffect } from "react"
import { Trophy, Star, Coffee, BookOpen, Clock, User, ArrowRight } from "lucide-react"
import dynamic from 'next/dynamic'
import { motion } from "framer-motion"
import axios from "axios"

// Optimized dynamic import with smaller loading placeholder
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="w-full h-64" />
})

// Pre-defined interfaces
interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  duration: string;
  instructor?: string;
  highlightColor: string;
}

interface LottieData {
  [key: string]: any;
}

const WorkshopDetails = () => {
  // Optimized animation variants with faster transitions
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const popUpVariant = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.3
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const backgroundLottie = {
    url: 'https://lottie.host/d8dc245d-ccf2-4d6c-ac36-70b04bd74d39/smIRtpjlxp.json'
  };

  // Static data
  const schedule: ScheduleItem[] = [
    {
      time: "09:00 AM",
      title: "Introduction to LangChain",
      description: "Fundamentals, architecture, and core concepts",
      duration: "1h45m",
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
      title: "Lunch Break",
      description: "",
      duration: "40m",
      highlightColor: "text-[#34FFE9]"
    },
    {
      time: "01:10 PM",
      title: "Hands-on Project Workshop",
      description: "Build a production-ready LangChain application",
      duration: "3h",
      instructor: "Ramachandra Udupa",
      highlightColor: "text-[#FF3CBD]"
    },
    {
      time: "04:10 PM",
      title: "End of Workshop",
      description: "Q&A, feedback, and closing remarks",
      duration: "10m",
      highlightColor: "text-[#FF3CBD]"
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
      title: "Guidance",
      description: "Learn from Peers",
      gradient: "from-[#5634FF] to-[#34FFE9]"
    },
    {
      icon: Coffee,
      title: "Networking",
      description: "Connect with like-minded developers",
      gradient: "from-[#34FFE9] to-[#FF3CBD]"
    }
  ];

  // Optimized Lottie loading
  const [lottieData, setLottieData] = useState<LottieData>({});

  useEffect(() => {
    const fetchLottieData = async () => {
      try {
        const response = await axios.get(backgroundLottie.url);
        setLottieData({ [backgroundLottie.url]: response.data });
      } catch (error) {
        console.error('Error fetching Lottie data:', error);
      }
    };

    fetchLottieData();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#09080e] text-white py-16 px-4 overflow-hidden">
      {/* Optimized background animation */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {lottieData[backgroundLottie.url] && (
          <Lottie 
            animationData={lottieData[backgroundLottie.url]}
            loop={true}
            autoplay={true}
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariant}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-[#FF3CBD]" />
            <span className="text-[#FF3CBD] text-sm font-semibold tracking-wider">WORKSHOP DETAILS</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#FF3CBD] via-[#5634FF] to-[#34FFE9] bg-clip-text text-transparent">
            LangChain Workshop
          </h1>

          {/* Workshop Highlights */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={popUpVariant}
                className="backdrop-blur-xl rounded-2xl p-6 bg-gray-900/40 border border-gray-800/50 hover:border-[#FF3CBD]/50 transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${highlight.gradient} p-3 rounded-xl w-fit mx-auto mb-4`}>
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                <p className="text-gray-400">{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Schedule Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#FF3CBD] via-[#5634FF] to-[#34FFE9] bg-clip-text text-transparent">
            Workshop Schedule
          </h2>
          <div className="grid gap-6 mt-10">
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariant}
                className="group backdrop-blur-xl rounded-2xl p-6 bg-gray-900/40 border border-gray-800/50 hover:border-[#FF3CBD]/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Clock className={`w-5 h-5 ${item.highlightColor}`} />
                    <span className="text-xl font-semibold text-white">{item.time}</span>
                    <span className={`${item.highlightColor} px-3 py-1 rounded-full border border-current`}>
                      {item.duration}
                    </span>
                  </div>
                  
                  <div className="flex-1 md:ml-8">
                    <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  
                  {item.instructor && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{item.instructor}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Register Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <a href="/register">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#FF3CBD] via-[#5634FF] to-[#34FFE9] text-white px-8 py-4 rounded-full font-semibold text-lg"
            >
              <span className="flex items-center gap-2">
                Register Now
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkshopDetails;