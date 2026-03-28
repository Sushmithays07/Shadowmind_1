import React from 'react';
import { cn } from '@/utils/cn.js';

/**
 * Card component - A reusable card container with glass morphism effect
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.hover=true] - Whether to show hover effect
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest - Other div props
 */
const Card = React.forwardRef(({
  children,
  className,
  hover = true,
  ...rest
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        'relative rounded-xl p-6',
        'bg-[#0f172a]/70 backdrop-blur-xl',
        'border border-cyan-500/20',
        // Hover effect
        hover && 'transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]',
        // Custom classes
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

/**
 * CardHeader component - Header section of the card
 */
const CardHeader = React.forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2 mb-4', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle component - Title for the card
 */
const CardTitle = React.forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold text-white font-mono', className)}
      {...rest}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription component - Description text for the card
 */
const CardDescription = React.forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-gray-500 font-mono', className)}
      {...rest}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

/**
 * CardContent component - Main content area of the card
 */
const CardContent = React.forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

/**
 * CardFooter component - Footer section of the card
 */
const CardFooter = React.forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-4 mt-4 pt-4 border-t border-cyan-500/10', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
