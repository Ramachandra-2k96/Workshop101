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

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const targetTime = new Date("2025-02-20T00:00:00").getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        return { days: "00", hours: "00", minutes: "00", seconds: "00" };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return {
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };
    };

    setCountdown(calculateTime());
    const interval = setInterval(() => {
      setCountdown(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-6xl px-4 md:px-6">
      <div className="space-y-6 md:space-y-8">
        {/* Headline & Subheading */}
        <div className="space-y-3">
          <p className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.3em] animate-slide-up bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            The Future Is Here
          </p>
          <h1 className="font-black text-4xl md:text-6xl lg:text-8xl tracking-tight animate-fade-in">
            <span className="block text-white opacity-90">
              Welcome to the
            </span>
            <span className="block mt-2 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Agentic Era
            </span>
          </h1>
        </div>

        <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto animate-slide-up font-medium text-gray-200">
          Where autonomous intelligence shapes tomorrow&#39;s possibilities
        </p>

        {/* Redesigned Countdown Timer */}
        <div className="flex justify-center gap-3 md:gap-4">
          {[
            { value: countdown.days, label: "Days" },
            { value: countdown.hours, label: "Hours" },
            { value: countdown.minutes, label: "Minutes" },
            { value: countdown.seconds, label: "Seconds" }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center backdrop-blur-md bg-opacity-20 bg-white rounded-lg px-3 py-2 md:px-4 md:py-3 border border-white/10">
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent">
                {item.value}
              </span>
              <span className="text-xs md:text-sm text-blue-200">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button Container */}
      <div className="relative flex items-center justify-center mt-8 md:mt-10">
        <div className="relative w-[85%] sm:w-3/4 md:w-1/2 lg:w-2/5 aspect-[2.5/1] mx-auto">
          <div className="absolute inset-0 scale-[1.1] hover:scale-[1.2] transition-transform duration-300 pointer-events-none">
            <RiveComponent aria-hidden="true" />
          </div>
          <a
            href="#about"
            aria-label="Begin your journey into the agentic era"
            className="absolute inset-0 z-10 flex items-center justify-center w-full h-full text-white text-lg md:text-xl lg:text-2xl font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:text-cyan-200"
            onMouseEnter={onButtonActivate}
            onMouseLeave={onButtonDeactivate}
            onFocus={onButtonActivate}
            onBlur={onButtonDeactivate}
          >
            Begin Your Journey
          </a>
        </div>
      </div>
    </div>
  );
}