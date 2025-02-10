"use client";
import { useCallback, useEffect, useState } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export default function RiveButton() {
  const { rive, RiveComponent } = useRive({
    src: "/hero_use_case.riv",
    artboard: "Button",
    stateMachines: "State Machine 1",
    autoplay: true,
    shouldDisableRiveListeners: true,
  });

  const isHoverInput = useStateMachineInput(rive, "State Machine 1", "isHover");

  const onButtonActivate = useCallback(() => {
    if (rive && isHoverInput) {
      isHoverInput.value = true;
    }
  }, [rive, isHoverInput]);

  const onButtonDeactivate = useCallback(() => {
    if (rive && isHoverInput) {
      isHoverInput.value = false;
    }
  }, [rive, isHoverInput]);

  // Countdown Timer State with stable initialization
  const [timeLeft, setTimeLeft] = useState<string>("Loading...");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTime = () => {
      const targetTime = new Date("2025-02-14T00:00:00").getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        return "00d 00h 00m 00s";
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${days.toString().padStart(2, '0')}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    };

    // Initial calculation
    setTimeLeft(calculateTime());

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Skip rendering until after mount to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-5xl px-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-teal-100 text-lg md:text-xl uppercase tracking-[0.2em] animate-slide-up opacity-80">
            The Future Is Here
          </p>
          <h1 className="font-black text-4xl md:text-6xl lg:text-8xl tracking-tight animate-fade-in">
            <span className="block text-white/90" style={{ textShadow: "0 0 40px rgba(0, 255, 255, 0.5)" }}>
              Welcome to the
            </span>
            <span
              className="block mt-2 bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-200 bg-clip-text text-transparent"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                filter: "drop-shadow(0 0 20px rgba(0,255,255,0.3))",
              }}
            >
              Agentic Era
            </span>
          </h1>
        </div>

        <p
          className="text-cyan-50 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto animate-slide-up font-light"
          style={{ textShadow: "0 0 20px rgba(0, 255, 255, 0.3)" }}
        >
          Where autonomous intelligence shapes tomorrow&#39;s possibilities
        </p>

        {/* Countdown Timer */}
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-300 animate-pulse">
          {timeLeft}
        </div>
      </div>

      <div className="rive-button-container relative w-3/4 pt-[37.88%] mx-auto mt-12">
        <div className="absolute top-0 left-0 bottom-0 right-0">
          <a
            href="#about"
            aria-label="Begin your journey into the agentic era"
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full bg-transparent text-cyan-50 text-base md:text-lg lg:text-xl font-medium tracking-[0.15em] hover:scale-105 transition-all duration-300"
            style={{ textShadow: "0 0 20px rgba(0, 255, 255, 0.5)" }}
            onMouseEnter={onButtonActivate}
            onMouseLeave={onButtonDeactivate}
            onFocus={onButtonActivate}
            onBlur={onButtonDeactivate}
          >
            Begin Your Journey
          </a>
          <RiveComponent aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}