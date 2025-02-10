"use client";
import React, { Suspense, useState, useEffect } from "react";
import { Brain, Network, CircuitBoard, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import dynamic from 'next/dynamic';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type Feature = {
    title: string;
    description: string;
    icon: React.ElementType;
    gradient: string;
    lottieUrl: string;
};

type BackgroundLottie = {
    url: string;
    className: string;
};

const features: Feature[] = [
    {
        title: "Advanced LangChain Integration",
        description:
            "Build sophisticated AI applications with state-of-the-art language models",
        icon: CircuitBoard,
        gradient: "from-[#FF3CBD] to-[#5634FF]",
        lottieUrl:
            "https://assets2.lottiefiles.com/packages/lf20_GofK09iPAE.json",
    },
    {
        title: "Visual LangGraph Studio",
        description:
            "Create and deploy complex AI workflows with our intuitive interface",
        icon: Network,
        gradient: "from-[#5634FF] to-[#34FFE9]",
        lottieUrl:
            "https://lottie.host/d39d8897-0ffc-4b48-91bf-857fd3f14e7e/9jULlREYsw.json",
    },
    {
        title: "Autonomous AI Agents",
        description:
            "Deploy intelligent agents with advanced reasoning capabilities",
        icon: Brain,
        gradient: "from-[#34FFE9] to-[#FF3CBD]",
        lottieUrl:
            "https://lottie.host/ed67502d-0629-4eb6-bd0b-97c8f9920303/aVYRZaiN5m.json",
    },
];

const backgroundLotties: BackgroundLottie[] = [
    {
        url: "https://lottie.host/1d39ae11-a48e-4cec-9803-e0931a62be5c/DeXx5KgxQ7.json",
        className: "absolute inset-0 w-screen h-screen opacity-20",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

// Separate component for Lottie animation with data fetching
const LottieAnimation = ({ url, className, style }: { url: string; className?: string; style?: React.CSSProperties }) => {
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

    if (error) {
        return <div className={className} />;
    }

    if (!animationData) {
        return <div className={className} />;
    }

    return (
        <div className={className}>
            <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={style}
            />
        </div>
    );
};

const AboutSection: React.FC = () => {
    return (
        <motion.div
            className="min-h-screen bg-[#09080e] text-white py-32 px-4 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
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
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-7xl mx-auto relative z-10"
            >
                <motion.div variants={itemVariants} className="mb-24 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                        className="flex items-center justify-center mb-4"
                    >
                        <Sparkles className="w-8 h-8 text-[#FF3CBD] animate-pulse mr-2" />
                        <span id="about" className="text-[#FF3CBD] font-semibold tracking-wider">
                            EXPLORE THE FUTURE
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#FF3CBD] via-[#5634FF] to-[#34FFE9] bg-clip-text text-transparent"
                        variants={itemVariants}
                    >
                        AI Development Reimagined
                    </motion.h1>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid md:grid-cols-3 gap-10"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            custom={index}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 },
                            }}
                            className="group backdrop-blur-xl rounded-3xl bg-gray-900/40 border border-gray-800/50 hover:border-[#FF3CBD]/50 transition-all duration-500 relative overflow-hidden h-[400px] p-10"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500">
                                <Suspense fallback={<div className="w-full h-full" />}>
                                    <LottieAnimation
                                        url={feature.lottieUrl}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Suspense>
                            </div>

                            <div className="relative z-10">
                                <motion.div
                                    className={`bg-gradient-to-r ${feature.gradient} p-3 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-500`}
                                >
                                    <feature.icon className="w-8 h-8 text-white" />
                                </motion.div>

                                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-white transition-colors duration-500">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default AboutSection;