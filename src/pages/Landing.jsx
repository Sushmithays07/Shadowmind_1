import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ChevronRight } from 'lucide-react';

/**
 * Landing page - The entry point of the application
 * Features:
 * - Animated background effects
 * - Logo with pulse glow
 * - Call-to-action button
 * - Decorative elements
 */
const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#070a13] relative overflow-hidden flex flex-col">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse animation-delay-1000" />
      
      {/* Scan Line Animation */}
      <div className="absolute inset-0 scan-line pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        {/* Logo Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center pulse-glow">
            <Brain className="w-12 h-12 text-white" />
          </div>
          
          {/* Orbiting dots */}
          <div 
            className="absolute inset-0 animate-spin" 
            style={{ animationDuration: '10s' }}
          >
            <div className="absolute -top-2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
          </div>
          <div 
            className="absolute inset-0 animate-spin" 
            style={{ animationDuration: '15s', animationDirection: 'reverse' }}
          >
            <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-purple-400 rounded-full" />
          </div>
        </div>
        
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white font-mono tracking-wider mb-4 text-center">
          <span className="neon-text-cyan">Shadow</span>
          <span className="text-gradient-purple">Mind</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-cyan-400/80 font-mono tracking-[0.3em] mb-2 text-center">
          AI BEHAVIOUR INTELLIGENCE
        </p>
        
        {/* Tagline */}
        <p className="text-gray-500 font-mono text-sm mb-12 text-center max-w-md px-4">
          Advanced neural analysis for emotional wellbeing and cognitive performance
        </p>
        
        {/* Decorative Lines */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-500/50" />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="w-32 h-px bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-cyan-500/50" />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-500" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>
        
        {/* Initialize Button */}
        <button
          onClick={() => navigate('/login')}
          className="group relative px-8 sm:px-12 py-4 bg-transparent border-2 border-cyan-500/50 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-400 glow-button-cyan"
        >
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          
          {/* Button Content */}
          <span className="relative flex items-center gap-3 text-cyan-400 font-mono text-base sm:text-lg tracking-wider group-hover:text-cyan-300">
            INITIALIZE ANALYSIS
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
      
      {/* Footer Info */}
      <div className="relative z-10 py-6 flex justify-center gap-4 sm:gap-8 text-xs text-gray-600 font-mono flex-wrap px-4">
        <span>v2.4.1</span>
        <span>•</span>
        <span>SECURE CONNECTION</span>
        <span>•</span>
        <span>ENCRYPTED</span>
      </div>
      
      {/* Corner Decorations */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-t-2 border-cyan-500/30" />
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-t-2 border-cyan-500/30" />
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-b-2 border-cyan-500/30" />
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-b-2 border-cyan-500/30" />
    </div>
  );
};

export default Landing;
