"use client";
import React, { useEffect, useState } from 'react';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

// Types
interface Particle {
  left: number;
  top: number;
  animationDuration: string;
  animationDelay: string;
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

// ParticleBackground Component
const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array(20).fill(null).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: `${15 + Math.random() * 10}s`,
      animationDelay: `${-Math.random() * 5}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-pink-500/20 rounded-full animate-float-up"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDuration: particle.animationDuration,
            animationDelay: particle.animationDelay
          }}
        />
      ))}
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black/80 backdrop-blur-lg border-t border-gray-800">
      <ParticleBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              AI Workshop
            </h3>
            <p className="text-gray-400 max-w-xs">
              Empowering developers to build the future of AI applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Schedule', 'Speakers', 'Register', 'Resources'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="group flex items-center gap-1 text-gray-400 transition-colors duration-300 hover:text-pink-400"
                >
                  {link}
                  <ExternalLink className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors duration-300 hover:bg-pink-500"
                >
                  <Icon className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-gray-800 pt-8 md:flex-row md:justify-between">
          <p className="text-sm text-gray-400">
            © {currentYear} AI Workshop. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map(item => (
              <a
                key={item}
                href="#"
                className="text-sm text-gray-400 transition-colors duration-300 hover:text-pink-400"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;