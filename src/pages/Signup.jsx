import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Brain, 
  ArrowRight, 
  ArrowLeft, 
  Check,
  Mic,
  Camera,
  Bell,
  Activity
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext.jsx';
import Button from '@/components/ui/Button.jsx';
import { cn } from '@/utils/cn.js';

/**
 * Signup page - User registration page with multi-step form
 * Features:
 * - Multi-step registration process
 * - Personal info, interests, and permissions steps
 * - Form validation
 * - Progress indicator
 * - Loading state
 */
const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  
  // Form state
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    interests: [],
    permissions: {
      microphone: false,
      camera: false,
      notifications: false,
      insights: false
    }
  });
  const [errors, setErrors] = useState({});

  // Available interests
  const interests = [
    { id: 'technology', label: 'Technology', icon: '💻' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'data', label: 'Data Science', icon: '📊' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'marketing', label: 'Marketing', icon: '📢' },
    { id: 'arts', label: 'Arts', icon: '🎭' }
  ];

  /**
   * Handle input changes
   * @param {React.ChangeEvent} e - Change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Toggle interest selection
   * @param {string} interestId - Interest ID
   */
  const toggleInterest = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  /**
   * Toggle permission
   * @param {string} permission - Permission key
   */
  const togglePermission = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  /**
   * Validate current step
   * @returns {boolean} - Whether the step is valid
   */
  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Go to next step
   */
  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 3));
    }
  };

  /**
   * Go to previous step
   */
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Login user
    login({ 
      email: formData.email, 
      name: formData.name 
    });
    
    setIsLoading(false);
    navigate('/input');
  };

  /**
   * Render step indicator
   */
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-4">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold transition-all duration-300',
              s === step
                ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                : s < step
                  ? 'bg-cyan-500/30 text-cyan-400'
                  : 'bg-gray-800 text-gray-600'
            )}
          >
            {s < step ? <Check className="w-5 h-5" /> : s}
          </div>
          {s < 3 && (
            <div
              className={cn(
                'w-12 h-px transition-all duration-300',
                s < step ? 'bg-cyan-500' : 'bg-gray-700'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  /**
   * Render step 1 - Personal Information
   */
  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 font-mono">FULL NAME</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className={cn(
              'w-full bg-[#0a0f1c] border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all font-mono',
              errors.name ? 'border-red-500' : 'border-cyan-500/30'
            )}
          />
        </div>
        {errors.name && <p className="text-sm text-red-400 font-mono">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 font-mono">EMAIL</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={cn(
              'w-full bg-[#0a0f1c] border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all font-mono',
              errors.email ? 'border-red-500' : 'border-cyan-500/30'
            )}
          />
        </div>
        {errors.email && <p className="text-sm text-red-400 font-mono">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 font-mono">PASSWORD</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a password"
            className={cn(
              'w-full bg-[#0a0f1c] border rounded-lg py-3 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all font-mono',
              errors.password ? 'border-red-500' : 'border-cyan-500/30'
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-400 font-mono">{errors.password}</p>}
      </div>
    </div>
  );

  /**
   * Render step 2 - Interests
   */
  const renderStep2 = () => (
    <div className="space-y-6">
      <p className="text-gray-400 font-mono text-sm text-center mb-4">
        Select your interests to personalize your experience
      </p>
      <div className="grid grid-cols-2 gap-4">
        {interests.map((interest) => (
          <button
            key={interest.id}
            onClick={() => toggleInterest(interest.id)}
            className={cn(
              'p-4 rounded-lg border transition-all duration-300 text-left',
              formData.interests.includes(interest.id)
                ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                : 'border-gray-700 bg-[#0a0f1c] hover:border-cyan-500/50'
            )}
          >
            <span className="text-2xl mb-2 block">{interest.icon}</span>
            <span className={cn(
              'font-mono text-sm',
              formData.interests.includes(interest.id) ? 'text-cyan-400' : 'text-gray-400'
            )}>
              {interest.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  /**
   * Render step 3 - Permissions
   */
  const renderStep3 = () => (
    <div className="space-y-6">
      <p className="text-gray-400 font-mono text-sm text-center mb-4">
        Configure your privacy and access settings
      </p>
      {[
        { id: 'microphone', label: 'Microphone Access', icon: Mic, description: 'For voice analysis' },
        { id: 'camera', label: 'Camera Access', icon: Camera, description: 'For facial expression analysis' },
        { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Get insights and reminders' },
        { id: 'insights', label: 'Activity Insights', icon: Activity, description: 'Allow data collection for better analysis' }
      ].map((permission) => {
        const Icon = permission.icon;
        return (
          <button
            key={permission.id}
            onClick={() => togglePermission(permission.id)}
            className={cn(
              'w-full flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-300',
              formData.permissions[permission.id]
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-gray-700 bg-[#0a0f1c] hover:border-gray-600'
            )}
          >
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              formData.permissions[permission.id] ? 'bg-cyan-500/20' : 'bg-gray-800'
            )}>
              <Icon className={cn(
                'w-5 h-5',
                formData.permissions[permission.id] ? 'text-cyan-400' : 'text-gray-500'
              )} />
            </div>
            <div className="flex-1 text-left">
              <p className={cn(
                'font-mono font-medium',
                formData.permissions[permission.id] ? 'text-white' : 'text-gray-400'
              )}>
                {permission.label}
              </p>
              <p className="text-xs text-gray-500 font-mono">{permission.description}</p>
            </div>
            <div className={cn(
              'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300',
              formData.permissions[permission.id]
                ? 'border-cyan-500 bg-cyan-500'
                : 'border-gray-600'
            )}>
              {formData.permissions[permission.id] && <Check className="w-4 h-4 text-white" />}
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070a13] relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      
      {/* Scan Line */}
      <div className="absolute inset-0 scan-line pointer-events-none" />
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/login')}
        className="absolute top-4 sm:top-8 left-4 sm:left-8 flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors font-mono text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        BACK
      </button>
      
      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Card Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl" />
        
        <div className="relative glass-card rounded-2xl p-6 sm:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white font-mono mb-2">
              Create Account
            </h1>
            <p className="text-gray-500 font-mono text-sm">
              Join ShadowMind today
            </p>
          </div>
          
          {/* Step Indicator */}
          {renderStepIndicator()}
          
          {/* Step Content */}
          <div className="mb-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4" />
                BACK
              </Button>
            )}
            
            {step < 3 ? (
              <Button
                onClick={nextStep}
                className="flex-1"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                NEXT
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                isLoading={isLoading}
                className="flex-1"
              >
                CREATE ACCOUNT
              </Button>
            )}
          </div>
          
          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-500 font-mono text-sm">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Login
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
    </div>
  );
};

export default Signup;
