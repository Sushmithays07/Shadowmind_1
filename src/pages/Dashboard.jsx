import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import {
  Brain,
  TrendingUp,
  Activity,
  AlertTriangle,
  Battery,
  MessageSquare,
  Wind,
  Footprints,
  BookOpen,
  Sparkles,
  RefreshCw,
  Mic
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { cn } from '@/utils/cn.js';

/**
 * Dashboard page - Displays analysis results
 * Features:
 * - Wellbeing score cards
 * - Radar chart for emotions
 * - Bar chart for emotion comparison
 * - Key indicators list
 * - Relief exercises recommendations
 * - Responsive layout with sidebar
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const { analysis, updateInputText, updateTranscript } = useAppContext();

  /**
   * Handle new analysis button click
   */
  const handleNewAnalysis = () => {
    updateInputText('');
    updateTranscript('');
    navigate('/input');
  };

  // Prepare data for radar chart
  const radarData = [
    { subject: 'Joy', A: analysis.emotions.joy, fullMark: 100 },
    { subject: 'Stress', A: analysis.emotions.stress, fullMark: 100 },
    { subject: 'Fatigue', A: analysis.emotions.fatigue, fullMark: 100 },
    { subject: 'Anger', A: analysis.emotions.anger, fullMark: 100 },
    { subject: 'Fear', A: analysis.emotions.fear, fullMark: 100 },
  ];

  // Prepare data for bar chart
  const barData = [
    { name: 'Joy', value: analysis.emotions.joy, color: '#22d3ee' },
    { name: 'Stress', value: analysis.emotions.stress, color: '#f472b6' },
    { name: 'Fatigue', value: analysis.emotions.fatigue, color: '#a78bfa' },
    { name: 'Anger', value: analysis.emotions.anger, color: '#f87171' },
    { name: 'Fear', value: analysis.emotions.fear, color: '#fb923c' },
  ];

  /**
   * Get status color based on wellbeing status
   * @param {string} status - Wellbeing status
   * @returns {string} - Tailwind color class
   */
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-cyan-400';
      case 'stable': return 'text-blue-400';
      case 'moderate': return 'text-yellow-400';
      default: return 'text-red-400';
    }
  };

  /**
   * Get score gradient based on wellbeing score
   * @param {number} score - Wellbeing score
   * @returns {string} - Tailwind gradient class
   */
  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-green-400';
    if (score >= 60) return 'from-cyan-500 to-cyan-400';
    if (score >= 40) return 'from-yellow-500 to-yellow-400';
    return 'from-red-500 to-red-400';
  };

  // Relief exercise icons mapping
  const exerciseIcons = {
    'Breathing exercise': Wind,
    'Short walk': Footprints,
    'Journaling': BookOpen,
    'Meditation': Sparkles,
    'Mindfulness practice': Brain
  };

  return (
    <div className="min-h-screen bg-[#070a13] flex flex-col lg:flex-row">
      {/* Sidebar - Hidden on mobile */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono">
                Analysis <span className="text-gradient-cyan">Dashboard</span>
              </h1>
              <p className="text-gray-500 font-mono text-sm">
                Real-time emotional wellbeing insights
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleNewAnalysis}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 font-mono text-sm hover:bg-cyan-500/20 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">NEW ANALYSIS</span>
                <span className="sm:hidden">NEW</span>
              </button>
              <button
                onClick={() => navigate('/input')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg text-white font-mono text-sm hover:from-cyan-400 hover:to-cyan-500 transition-all"
              >
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline">INPUT</span>
              </button>
            </div>
          </div>

          {/* Top Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Wellbeing Score */}
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-500 font-mono text-xs">WELLBEING SCORE</p>
                  <p className={cn('text-2xl font-bold font-mono', getStatusColor(analysis.wellbeing_status))}>
                    {analysis.wellbeing_score}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  'px-3 py-1 rounded-full bg-gradient-to-r text-white text-xs font-mono',
                  getScoreColor(analysis.wellbeing_score)
                )}>
                  {analysis.wellbeing_status}
                </div>
              </div>
            </div>

            {/* Emotional Stability */}
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-500 font-mono text-xs">EMOTIONAL STABILITY</p>
                  <p className="text-2xl font-bold text-white font-mono">
                    {analysis.emotional_stability}%
                  </p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000"
                  style={{ width: `${analysis.emotional_stability}%` }}
                />
              </div>
            </div>

            {/* Speech Coherence */}
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-500 font-mono text-xs">SPEECH COHERENCE</p>
                  <p className="text-2xl font-bold text-white font-mono">
                    {analysis.speech_coherence}%
                  </p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
                  style={{ width: `${analysis.speech_coherence}%` }}
                />
              </div>
            </div>

            {/* Mistake Risk */}
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-gray-500 font-mono text-xs">MISTAKE RISK</p>
                  <p className={cn(
                    'text-2xl font-bold font-mono',
                    analysis.mistake_risk_score > 50 ? 'text-red-400' : 'text-yellow-400'
                  )}>
                    {analysis.mistake_risk_score}%
                  </p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-1000',
                    analysis.mistake_risk_score > 50 
                      ? 'bg-gradient-to-r from-red-500 to-red-400' 
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                  )}
                  style={{ width: `${analysis.mistake_risk_score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Radar Chart */}
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white font-mono mb-4">
                Emotional Profile
              </h3>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(6, 182, 212, 0.2)" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fill: '#6b7280', fontSize: 10 }}
                      stroke="rgba(6, 182, 212, 0.1)"
                    />
                    <Radar
                      name="Emotions"
                      dataKey="A"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      fill="#06b6d4"
                      fillOpacity={0.3}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a', 
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white font-mono mb-4">
                Emotion Breakdown
              </h3>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.1)" />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name"
                      tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a', 
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Key Indicators */}
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white font-mono mb-4 flex items-center gap-2">
                <Battery className="w-5 h-5 text-cyan-400" />
                Key Indicators
              </h3>
              <div className="space-y-3">
                {analysis.key_indicators.map((indicator, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-white font-mono text-sm">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relief Exercises */}
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white font-mono mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Recommended Exercises
              </h3>
              <div className="space-y-3">
                {analysis.relief_exercises.map((exercise, index) => {
                  const Icon = exerciseIcons[exercise] || Sparkles;
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg hover:bg-cyan-500/10 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-white font-mono text-sm">{exercise}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
