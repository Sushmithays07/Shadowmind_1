import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Brain, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext.jsx';
import Button from '@/components/ui/Button.jsx';
import Input from '@/components/ui/Input.jsx';

/**
 * Login page - User authentication page
 * Features:
 * - Email and password login form
 * - Show/hide password toggle
 * - "Continue with Google" button (UI only)
 * - Form validation
 * - Loading state
 * - Link to signup page
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Validate form inputs
   * @returns {boolean} - Whether the form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Login user
    login({ 
      email, 
      name: email.split('@')[0],
      avatar: null 
    });
    
    setIsLoading(false);
    navigate('/input');
  };

  /**
   * Handle Google login (UI only)
   */
  const handleGoogleLogin = () => {
    // This is a UI-only implementation
    // In a real app, this would trigger Google OAuth
    alert('Google login would be implemented here with OAuth');
  };

  return (
    <div className="min-h-screen bg-[#070a13] relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      
      {/* Scan Line */}
      <div className="absolute inset-0 scan-line pointer-events-none" />
      
      {/* Back to Landing */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 sm:top-8 left-4 sm:left-8 flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors font-mono text-sm"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        BACK
      </button>
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Card Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl" />
        
        <div className="relative glass-card rounded-2xl p-6 sm:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white font-mono mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 font-mono text-sm">
              Access your ShadowMind dashboard
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <Input
              type="email"
              label="EMAIL"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-5 h-5" />}
              error={errors.email}
            />
            
            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-400 font-mono">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#0a0f1c] border border-cyan-500/30 rounded-lg py-3 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400 font-mono">{errors.password}</p>
              )}
            </div>
            
            {/* Forgot Password */}
            <div className="flex justify-end">
              <button 
                type="button" 
                className="text-sm text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
              >
                Forgot password?
              </button>
            </div>
            
            {/* Login Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              LOGIN
            </Button>
          </form>
          
          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 font-mono text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>
          
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 rounded-lg text-gray-800 font-mono font-medium transition-all duration-200"
          >
            {/* Google Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
          
          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-gray-500 font-mono text-sm">
              Don&apos;t have an account?{' '}
              <Link 
                to="/signup" 
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        
        {/* Corner Decorations */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-500/50" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-cyan-500/50" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-cyan-500/50" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50" />
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center gap-4 sm:gap-6 text-xs text-gray-600 font-mono flex-wrap px-4">
        <span>SECURE</span>
        <span>•</span>
        <span>ENCRYPTED</span>
        <span>•</span>
        <span>v2.4.1</span>
      </div>
    </div>
  );
};

export default Login;
