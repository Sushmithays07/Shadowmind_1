import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Keyboard, Sparkles, ArrowRight, X } from 'lucide-react';
import { useAppContext } from '@/context/AppContext.jsx';
import VoiceInput from '@/components/VoiceInput.jsx';
import Header from '@/components/Header.jsx';
import { cn } from '@/utils/cn.js';

/**
 * InputScreen page - Main input page for voice and text analysis
 * Features:
 * - Tab switching between voice and text input
 * - Voice input with Web Speech API
 * - Text input textarea
 * - Live transcript preview
 * - Analyze button
 * - Tips section
 */
const InputScreen = () => {
  const navigate = useNavigate();
  const { inputText, updateInputText, transcript, setRecordingState } = useAppContext();
  
  // Local state
  const [activeTab, setActiveTab] = useState('voice'); // 'voice' or 'text'
  const [localText, setLocalText] = useState(inputText || transcript);

  // Update local text when transcript changes
  useEffect(() => {
    if (transcript) {
      setLocalText(transcript);
    }
  }, [transcript]);

  /**
   * Handle analyze button click
   */
  const handleAnalyze = () => {
    updateInputText(localText);
    setRecordingState(false);
    navigate('/processing');
  };

  /**
   * Handle transcript changes from VoiceInput
   * @param {string} newTranscript - New transcript text
   */
  const handleTranscriptChange = (newTranscript) => {
    setLocalText(newTranscript);
  };

  /**
   * Clear input text
   */
  const handleClear = () => {
    setLocalText('');
    updateInputText('');
  };

  // Tips data
  const tips = [
    { icon: Mic, title: 'Speak Naturally', desc: 'Talk as you would to a friend' },
    { icon: Sparkles, title: 'Be Honest', desc: 'Authenticity improves analysis' },
    { icon: Keyboard, title: 'Take Your Time', desc: 'There is no character limit' }
  ];

  return (
    <div className="min-h-screen bg-[#070a13] flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
        
        {/* Scan Line */}
        <div className="absolute inset-0 scan-line pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-mono text-sm">AI ANALYSIS READY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono mb-2">
              Share Your <span className="text-gradient-cyan">Thoughts</span>
            </h1>
            <p className="text-gray-500 font-mono text-sm max-w-md mx-auto px-4">
              Speak or type your thoughts, and our AI will analyze your emotional state and provide personalized insights.
            </p>
          </div>

          {/* Input Container */}
          <div className="w-full max-w-2xl px-4">
            {/* Tab Switcher */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-[#0a0f1c] border border-cyan-500/20 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('voice')}
                  className={cn(
                    'flex items-center gap-2 px-4 sm:px-6 py-2 rounded-md font-mono text-sm transition-all duration-300',
                    activeTab === 'voice'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-500 hover:text-gray-300'
                  )}
                >
                  <Mic className="w-4 h-4" />
                  <span className="hidden sm:inline">VOICE</span>
                  <span className="sm:hidden">Voice</span>
                </button>
                <button
                  onClick={() => setActiveTab('text')}
                  className={cn(
                    'flex items-center gap-2 px-4 sm:px-6 py-2 rounded-md font-mono text-sm transition-all duration-300',
                    activeTab === 'text'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-500 hover:text-gray-300'
                  )}
                >
                  <Keyboard className="w-4 h-4" />
                  <span className="hidden sm:inline">TEXT</span>
                  <span className="sm:hidden">Text</span>
                </button>
              </div>
            </div>

            {/* Voice Input Panel */}
            {activeTab === 'voice' && (
              <VoiceInput onTranscriptChange={handleTranscriptChange} />
            )}

            {/* Text Input Panel */}
            {activeTab === 'text' && (
              <div className="glass-card rounded-xl p-4 sm:p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2">
                    <Keyboard className="w-5 h-5 text-cyan-400" />
                    Text Input
                  </h3>
                  <span className="text-sm text-gray-500 font-mono">
                    {localText.length} chars
                  </span>
                </div>
                <textarea
                  value={localText}
                  onChange={(e) => setLocalText(e.target.value)}
                  placeholder="Type your thoughts here..."
                  className="w-full h-32 sm:h-48 bg-[#0a0f1c] border border-cyan-500/30 rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all font-mono resize-none text-sm sm:text-base"
                />
              </div>
            )}

            {/* Combined Display */}
            {(localText || transcript) && (
              <div className="glass-card rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-cyan-400 font-mono">
                    INPUT PREVIEW
                  </h3>
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 font-mono transition-colors"
                  >
                    <X className="w-3 h-3" />
                    CLEAR
                  </button>
                </div>
                <p className="text-white font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {localText || transcript}
                </p>
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!localText.trim()}
              className={cn(
                'w-full py-3 sm:py-4 rounded-lg text-white font-mono font-semibold tracking-wider',
                'flex items-center justify-center gap-3',
                'transition-all duration-300',
                localText.trim()
                  ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 glow-button-cyan'
                  : 'bg-gray-700 cursor-not-allowed opacity-50'
              )}
            >
              <Sparkles className="w-5 h-5" />
              ANALYZE
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Tips */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tips.map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <div 
                    key={i} 
                    className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-lg"
                  >
                    <Icon className="w-5 h-5 text-cyan-400 mb-2" />
                    <p className="text-white font-mono text-sm font-medium">{tip.title}</p>
                    <p className="text-gray-500 font-mono text-xs">{tip.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InputScreen;
