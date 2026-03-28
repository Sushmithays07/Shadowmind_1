import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Mic,
  FileText,
  Settings,
  LogOut,
  Brain
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext.jsx';
import { cn } from '@/utils/cn.js';

/**
 * Sidebar component - Navigation sidebar for authenticated pages
 * Features:
 * - Fixed positioning on desktop
 * - Navigation menu items
 * - Logout functionality
 * - Active state highlighting
 */
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAppContext();

  // Menu items configuration
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Mic, label: 'Input', path: '/input' },
    { icon: FileText, label: 'Reports', path: '/dashboard' },
    { icon: Settings, label: 'Settings', path: '/dashboard' },
  ];

  /**
   * Handle logout action
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="hidden lg:flex w-64 h-screen bg-[#0a0f1c] border-r border-cyan-500/20 flex-col fixed left-0 top-0 z-40">
      {/* Logo Section */}
      <div className="p-6 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-mono tracking-wider">
              Shadow<span className="text-cyan-400">Mind</span>
            </h1>
            <p className="text-xs text-cyan-500/70 font-mono">AI Behaviour Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'font-mono text-sm',
                isActive
                  ? 'bg-cyan-500/20 text-white border-l-2 border-cyan-400'
                  : 'text-gray-400 hover:bg-cyan-500/10 hover:text-white'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-cyan-400' : 'text-gray-400')} />
              <span className={isActive ? 'text-white' : 'text-gray-400'}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-cyan-500/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 font-mono text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
