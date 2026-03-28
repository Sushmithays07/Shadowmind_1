import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Brain, 
  Home, 
  MessageSquare, 
  LogIn, 
  User, 
  LogOut, 
  Mail,
  ChevronDown,
  Menu,
  X,
  Mic
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext.jsx';
import { cn } from '@/utils/cn.js';

/**
 * Header component - Sticky navigation header with Account dropdown
 * Features:
 * - Responsive design (desktop and mobile)
 * - Sticky positioning
 * - Navigation links (Home, Chat, Login)
 * - Account dropdown with user info and logout
 * - Mobile hamburger menu
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAppContext();
  
  // State for dropdown and mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Ref for dropdown to handle click outside
  const dropdownRef = useRef(null);

  // Navigation items
  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Chat', path: '/input', icon: MessageSquare },
    ...(user ? [] : [{ label: 'Login', path: '/login', icon: LogIn }]),
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  // Navigate to path and close mobile menu
  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main header container */}
      <div className="bg-[#070a13]/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavigate('/')}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white font-mono tracking-wider">
                  Shadow<span className="text-cyan-400">Mind</span>
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm',
                      'transition-all duration-200',
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right side - Account or Login */}
            <div className="flex items-center gap-4">
              {user ? (
                // Account Dropdown
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg',
                      'transition-all duration-200',
                      'hover:bg-white/5',
                      isDropdownOpen && 'bg-white/5'
                    )}
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    
                    {/* User name (hidden on small screens) */}
                    <span className="hidden sm:block text-sm text-white font-mono">
                      {user.name || 'User'}
                    </span>
                    
                    {/* Dropdown arrow */}
                    <ChevronDown 
                      className={cn(
                        'w-4 h-4 text-gray-400 transition-transform duration-200',
                        isDropdownOpen && 'rotate-180'
                      )} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0f172a] border border-cyan-500/20 shadow-xl shadow-black/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      {/* User Info Section */}
                      <div className="p-4 border-b border-cyan-500/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-mono font-medium truncate">
                              {user.name || 'User'}
                            </p>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <Mail className="w-3 h-3" />
                              <span className="truncate font-mono text-xs">
                                {user.email || 'user@example.com'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <button
                          onClick={() => handleNavigate('/dashboard')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 font-mono text-sm"
                        >
                          <Home className="w-4 h-4" />
                          Dashboard
                        </button>
                        <button
                          onClick={() => handleNavigate('/input')}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 font-mono text-sm"
                        >
                          <Mic className="w-4 h-4" />
                          Voice Input
                        </button>
                      </div>

                      {/* Logout Section */}
                      <div className="p-2 border-t border-cyan-500/10">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 font-mono text-sm"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Login Button (when not authenticated)
                <button
                  onClick={() => handleNavigate('/login')}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg text-white font-mono text-sm transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#070a13]/95 backdrop-blur-xl border-b border-cyan-500/20 animate-in slide-in-from-top duration-200">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm',
                    'transition-all duration-200',
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
            
            {/* Mobile Logout (if authenticated) */}
            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 font-mono text-sm"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
