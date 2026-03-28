import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Activity, 
  BarChart3, 
  AlertTriangle, 
  Heart, 
  Shield, 
  FileText, 
  Sparkles 
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext.jsx';
import { StepLoader, CircularProgress, MatrixRain } from '@/components/Loader.jsx';

/**
 * Processing page - Shows AI analysis progress
 * Features:
 * - Animated progress circle
 * - Step-by-step processing indicators
 * - Matrix rain background effect
 * - Auto-redirect to dashboard after completion
 */
const Processing = () => {
  const navigate = useNavigate();
  const { inputText, generateAnalysis } = useAppContext();
  
  // Local state
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Processing steps configuration
  const steps = [
    { 
      icon: FileText, 
      label: 'Preprocessing transcript', 
      description: 'Tokenizing and cleaning input data' 
    },
    { 
      icon: Activity, 
      label: 'Emotion detection', 
      description: 'Analyzing emotional patterns' 
    },
    { 
      icon: BarChart3, 
      label: 'Sentiment analysis', 
      description: 'Evaluating positive/negative tone' 
    },
    { 
      icon: AlertTriangle, 
      label: 'Mistake prediction', 
      description: 'Identifying potential error patterns' 
    },
    { 
      icon: Heart, 
      label: 'Wellbeing index calculation', 
      description: 'Computing overall wellness score' 
    },
    { 
      icon: Shield, 
      label: 'Relief protocol generation', 
      description: 'Creating personalized recommendations' 
    },
    { 
      icon: FileText, 
      label: 'Compiling report', 
      description: 'Finalizing analysis dashboard' 
    }
  ];

  // Initialize analysis and animations
  useEffect(() => {
    // Generate analysis data
    generateAnalysis(inputText || 'Sample text for analysis');

    // Animate through steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    // Navigate to dashboard after completion
    const navigationTimeout = setTimeout(() => {
      navigate('/dashboard');
    }, 4500);

    // Cleanup function
    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(navigationTimeout);
    };
  }, [navigate, generateAnalysis, inputText]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#070a13] relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <MatrixRain />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse animation-delay-1000" />
      
      {/* Scan Line */}
      <div className="absolute inset-0 scan-line pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6">
            <div className="relative">
              {/* Spinning ring */}
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-cyan-500/30 animate-spin" 
                style={{ animationDuration: '3s' }} 
              />
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
              </div>
              
              {/* Orbiting particles */}
              <div 
                className="absolute inset-0 animate-spin" 
                style={{ animationDuration: '2s' }}
              >
                <div className="absolute -top-1 left-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
              </div>
              <div 
                className="absolute inset-0 animate-spin" 
                style={{ animationDuration: '2.5s', animationDirection: 'reverse' }}
              >
                <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-purple-400 rounded-full" />
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono mb-2">
            <span className="neon-text-cyan">Analyzing</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm">
            Our AI is processing your input...
          </p>
        </div>

        {/* Progress Circle */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <CircularProgress progress={progress} size={120} strokeWidth={6} />
        </div>

        {/* Processing Steps */}
        <div className="glass-card rounded-xl p-4 sm:p-6">
          <div className="space-y-2 sm:space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div
                  key={index}
                  className={`
                    flex items-center gap-3 py-2 px-3 sm:px-4 rounded-lg transition-all duration-300
                    ${isActive ? 'bg-cyan-500/10 border-l-2 border-cyan-400' : ''}
                    ${isCompleted ? 'text-cyan-400' : ''}
                  `}
                >
                  <StepLoader isActive={isActive} isCompleted={isCompleted} />
                  
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    ${isActive ? 'bg-cyan-500/20' : isCompleted ? 'bg-cyan-500/10' : 'bg-gray-800'}
                  `}>
                    <Icon className={`
                      w-4 h-4
                      ${isActive ? 'text-cyan-400' : isCompleted ? 'text-cyan-400' : 'text-gray-600'}
                    `} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`
                      font-mono font-medium text-sm
                      ${isActive ? 'text-white' : isCompleted ? 'text-cyan-400' : 'text-gray-500'}
                    `}>
                      {step.label}
                    </p>
                    {isActive && (
                      <p className="text-xs text-gray-500 font-mono mt-0.5 animate-pulse">
                        {step.description}
                      </p>
                    )}
                  </div>
                  
                  {isCompleted && (
                    <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-mono text-xs">NEURAL NETWORK ACTIVE</span>
          </div>
        </div>

        {/* Data Stream */}
        <div className="mt-4 sm:mt-6 overflow-hidden">
          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="text-xs text-cyan-500/20 font-mono">
                {Math.random().toString(36).substring(7).toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Animation Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Processing;
