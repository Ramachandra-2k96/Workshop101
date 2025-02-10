"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Code2, CheckCircle, Terminal, Database, Laptop, BookOpen } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// LottieAnimation component with proper data fetching
const LottieAnimation = ({ url, className }: { url: string; className?: string }) => {
    const [animationData, setAnimationData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAnimation = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setAnimationData(data);
            } catch (err) {
                console.error('Error loading animation:', err);
                setError(true);
            }
        };

        fetchAnimation();
    }, [url]);

    if (error || !animationData) {
        return <div className={className} />;
    }

    return (
        <div className={className}>
            <Lottie 
                animationData={animationData}
                loop={true}
                autoplay={true}
            />
        </div>
    );
};

const requirements = [
    {
        category: "Technical Skills",
        icon: Code2,
        gradient: 'from-[#FF3CBD] to-[#5634FF]',
        lottieUrl: 'https://assets8.lottiefiles.com/packages/lf20_w51pcehl.json',
        items: [
            { text: "Intermediate Python programming", level: "Required" },
            { text: "Basic understanding of APIs", level: "Optional" },
            { text: "Experience with Git version control", level: "Recommended" },
            { text: "Familiarity with ML concepts", level: "Optional" }
        ]
    },
    {
        category: "Development Environment",
        icon: Laptop,
        gradient: 'from-[#5634FF] to-[#34FFE9]',
        lottieUrl: 'https://assets9.lottiefiles.com/packages/lf20_kkflmtur.json',
        items: [
            { text: "Python 3.8+ installed", level: "Required" },
            { text: "VSCode", level: "Required" },
            { text: "8GB+ RAM", level: "Required" },
            { text: "NVIDIA GPU (optional)", level: "Optional" }
        ]
    },
    {
        category: "Prior Knowledge",
        icon: Database,
        gradient: 'from-[#34FFE9] to-[#FF3CBD]',
        lottieUrl: 'https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json',
        items: [
            { text: "Basic AI/ML terminology", level: "Required" },
            { text: "Docker basics", level: "Optional" }
        ]
    }
];

const Prerequisites = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.3,
                duration: 0.6
            }
        }
    };

    const backgroundLotties = [
        {
            url: 'https://lottie.host/d8dc245d-ccf2-4d6c-ac36-70b04bd74d39/smIRtpjlxp.json',
            className: 'absolute inset-0 w-full h-full opacity-10'
        }
    ];

    return (
        <motion.div 
            className="relative min-h-screen bg-[#09080e] text-white py-16 md:py-32 px-4 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Background animations */}
            <div className="absolute inset-0 pointer-events-none">
                {backgroundLotties.map((lottie, index) => (
                    <Suspense key={index} fallback={<div className={lottie.className} />}>
                        <LottieAnimation 
                            url={lottie.url}
                            className={lottie.className}
                        />
                    </Suspense>
                ))}
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="max-w-7xl mx-auto relative z-10"
            >
                <motion.div 
                    variants={itemVariants}
                    className="mb-16 md:mb-24 text-center px-4"
                >
                    <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="flex items-center justify-center mb-4"
                    >
                        <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-[#FF3CBD] animate-pulse mr-2" />
                        <span className="text-[#FF3CBD] text-sm md:text-base font-semibold tracking-wider">GET STARTED</span>
                    </motion.div>
                    
                    <motion.h1 
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-[#FF3CBD] via-[#5634FF] to-[#34FFE9] bg-clip-text text-transparent"
                        variants={itemVariants}
                    >
                        Prerequisites
                    </motion.h1>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 px-4"
                >
                    {requirements.map((category, idx) => (
                        <motion.div
                            key={category.category}
                            variants={itemVariants}
                            custom={idx}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            className="group backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 bg-gray-900/40 border border-gray-800/50 hover:border-[#FF3CBD]/50 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                                <Suspense fallback={<div className="w-full h-full" />}>
                                    <LottieAnimation 
                                        url={category.lottieUrl}
                                        className="w-full h-full"
                                    />
                                </Suspense>
                            </div>

                            <div className="relative z-10">
                                <motion.div 
                                    className={`bg-gradient-to-r ${category.gradient} p-2 md:p-3 rounded-xl md:rounded-2xl w-fit mb-4 md:mb-6 group-hover:scale-105 transition-transform duration-300`}
                                >
                                    <category.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                </motion.div>

                                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    {category.category}
                                </h3>

                                <div className="space-y-3 md:space-y-4">
                                    {category.items.map((item, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-start gap-2 md:gap-3 group/item hover:bg-white/5 p-2 rounded-lg transition-all duration-200"
                                        >
                                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#FF3CBD] mt-1" />
                                            <div>
                                                <p className="text-sm md:text-base text-gray-200">{item.text}</p>
                                                <span className={`text-xs md:text-sm font-medium ${
                                                    item.level === 'Required' ? 'text-[#FF3CBD]' :
                                                    item.level === 'Recommended' ? 'text-[#5634FF]' :
                                                    'text-gray-500'
                                                }`}>
                                                    {item.level}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Prerequisites;