import React from 'react';
import { cn } from '@/utils/cn.js';

/**
 * Button component - A reusable button with various styles and sizes
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant='default'] - Button variant (default, outline, ghost, destructive)
 * @param {string} [props.size='default'] - Button size (default, sm, lg, icon)
 * @param {boolean} [props.isLoading=false] - Whether the button is in loading state
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {React.ReactNode} [props.leftIcon] - Icon to display on the left
 * @param {React.ReactNode} [props.rightIcon] - Icon to display on the right
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.rest - Other button props
 */
const Button = React.forwardRef(({
  children,
  variant = 'default',
  size = 'default',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  ...rest
}, ref) => {
  // Variant styles
  const variants = {
    default: 'bg-cyan-500 text-white hover:bg-cyan-400 shadow-lg shadow-cyan-500/25',
    outline: 'border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
    destructive: 'bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/25',
    secondary: 'bg-purple-500 text-white hover:bg-purple-400 shadow-lg shadow-purple-500/25',
  };

  // Size styles
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-12 px-6 text-lg',
    icon: 'h-10 w-10 p-2',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center gap-2 rounded-lg font-mono font-medium',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-[#070a13]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        // Variant and size styles
        variants[variant],
        sizes[size],
        // Custom classes
        className
      )}
      {...rest}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
