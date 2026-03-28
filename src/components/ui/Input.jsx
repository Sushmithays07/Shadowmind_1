import React from 'react';
import { cn } from '@/utils/cn.js';

/**
 * Input component - A reusable input field with consistent styling
 * @param {Object} props - Component props
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.label] - Label text
 * @param {string} [props.placeholder] - Placeholder text
 * @param {React.ReactNode} [props.leftIcon] - Icon to display on the left
 * @param {React.ReactNode} [props.rightIcon] - Icon to display on the right
 * @param {string} [props.error] - Error message
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props.rest - Other input props
 */
const Input = React.forwardRef(({
  type = 'text',
  label,
  placeholder,
  leftIcon,
  rightIcon,
  error,
  className,
  ...rest
}, ref) => {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm text-gray-400 font-mono mb-2">
          {label}
        </label>
      )}
      
      {/* Input container */}
      <div className="relative">
        {/* Left icon */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        {/* Input field */}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={cn(
            // Base styles
            'w-full bg-[#0a0f1c] border rounded-lg py-3 text-white',
            'placeholder-gray-600 font-mono',
            'transition-all duration-200',
            // Focus styles
            'focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]',
            // Error styles
            error 
              ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
              : 'border-cyan-500/30',
            // Padding adjustments for icons
            leftIcon && 'pl-12',
            rightIcon && 'pr-12',
            !leftIcon && 'pl-4',
            !rightIcon && 'pr-4',
            // Custom classes
            className
          )}
          {...rest}
        />
        
        {/* Right icon */}
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-400 font-mono">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
