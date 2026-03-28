import React from 'react';
import { cn } from '@/utils/cn.js';

/**
 * Loader component - Displays a spinning loader with optional size and color
 * @param {Object} props - Component props
 * @param {string} [props.size='md'] - Loader size (sm, md, lg, xl)
 * @param {string} [props.color='cyan'] - Loader color (cyan, purple, green, white)
 * @param {string} [props.className] - Additional CSS classes
 */
const Loader = ({ size = 'md', color = 'cyan', className }) => {
  // Size configurations
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  // Color configurations
  const colorClasses = {
    cyan: 'border-cyan-400',
    purple: 'border-purple-400',
    green: 'border-green-400',
    white: 'border-white'
  };

  return (
    <div className={cn('relative', className)}>
      {/* Outer spinning ring */}
      <div
        className={cn(
          sizeClasses[size],
          colorClasses[color],
          'border-4 border-t-transparent rounded-full animate-spin'
        )}
      />
      
      {/* Inner pulsing circle */}
      <div
        className={cn(
          'absolute inset-0',
          sizeClasses[size],
          colorClasses[color],
          'border-2 border-opacity-30 rounded-full animate-pulse'
        )}
      />
      
      {/* Glow effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-full blur-xl animate-pulse',
          sizeClasses[size],
          color === 'cyan' && 'bg-cyan-400/20',
          color === 'purple' && 'bg-purple-400/20',
          color === 'green' && 'bg-green-400/20',
          color === 'white' && 'bg-white/20'
        )}
      />
    </div>
  );
};

/**
 * StepLoader component - Displays a step indicator (loading, completed, or pending)
 * @param {Object} props - Component props
 * @param {boolean} props.isActive - Whether the step is currently active
 * @param {boolean} props.isCompleted - Whether the step is completed
 */
export const StepLoader = ({ isActive, isCompleted }) => {
  return (
    <div className="flex items-center justify-center w-6 h-6">
      {isCompleted ? (
        // Completed state - checkmark
        <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
          <svg 
            className="w-3 h-3 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
      ) : isActive ? (
        // Active state - spinning loader
        <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      ) : (
        // Pending state - empty circle
        <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
      )}
    </div>
  );
};

/**
 * CircularProgress component - Displays a circular progress indicator
 * @param {Object} props - Component props
 * @param {number} props.progress - Progress value (0-100)
 * @param {number} [props.size=120] - Circle size in pixels
 * @param {number} [props.strokeWidth=8] - Stroke width
 * @param {string} [props.color='#06b6d4'] - Progress color
 */
export const CircularProgress = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  color = '#06b6d4' 
}) => {
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg 
        className="transform -rotate-90" 
        width={size} 
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(6, 182, 212, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 0 10px ${color})`
          }}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white font-mono">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

/**
 * PulseDots component - Animated pulsing dots loader
 */
export const PulseDots = () => {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce"
          style={{
            animationDelay: `${i * 0.15}s`,
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
          }}
        />
      ))}
    </div>
  );
};

/**
 * MatrixRain component - Matrix-style falling characters effect
 */
export const MatrixRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-cyan-400 font-mono text-xs animate-pulse"
          style={{
            left: `${i * 5}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`
          }}
        >
          {[...Array(10)].map((_, j) => (
            <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Loader;
