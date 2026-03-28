import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const AppContext = createContext(null);

/**
 * Custom hook to use the AppContext
 * @returns {Object} - The context value
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

/**
 * AppProvider component - Provides global state management for the application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AppProvider = ({ children }) => {
  // User authentication state
  const [user, setUser] = useState(null);
  
  // Input text state
  const [inputText, setInputText] = useState('');
  
  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  
  // Transcript from voice input
  const [transcript, setTranscript] = useState('');

  // Analysis data structure with default values
  const [analysis, setAnalysis] = useState({
    emotions: {
      joy: 60,
      stress: 20,
      fatigue: 10,
      anger: 5,
      fear: 5
    },
    wellbeing_score: 78,
    wellbeing_status: 'Stable',
    emotional_stability: 70,
    speech_coherence: 82,
    mistake_risk_score: 32,
    stress: 20,
    fatigue: 15,
    speech_metadata: {
      speaking_pace: 'Moderate',
      speech_intensity: 'Medium',
      sentiment_score: 0.65,
      dominant_emotion: 'Joy'
    },
    key_indicators: ['Overthinking', 'Cognitive fatigue'],
    relief_exercises: ['Breathing exercise', 'Short walk', 'Journaling', 'Meditation']
  });

  /**
   * Login function - Sets the user data
   * @param {Object} userData - User data object
   */
  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  /**
   * Logout function - Clears user data and resets state
   */
  const logout = useCallback(() => {
    setUser(null);
    setInputText('');
    setTranscript('');
    setIsRecording(false);
  }, []);

  /**
   * Update input text
   * @param {string} text - Input text
   */
  const updateInputText = useCallback((text) => {
    setInputText(text);
  }, []);

  /**
   * Update transcript
   * @param {string|function} text - Transcript text or updater function
   */
  const updateTranscript = useCallback((text) => {
    if (typeof text === 'function') {
      setTranscript((prev) => text(prev));
    } else {
      setTranscript(text);
    }
  }, []);

  /**
   * Set recording state
   * @param {boolean} state - Recording state
   */
  const setRecordingState = useCallback((state) => {
    setIsRecording(state);
  }, []);

  /**
   * Generate analysis based on input text
   * @param {string} text - Input text to analyze
   * @returns {Object} - Generated analysis data
   */
  const generateAnalysis = useCallback((text) => {
    // Calculate word count
    const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
    
    // Generate seed from text for consistent random values
    const seed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    /**
     * Random number generator based on seed
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} - Random number between min and max
     */
    const random = (min, max) => {
      const x = Math.sin(seed * 9999) * 10000;
      return Math.floor(min + (x - Math.floor(x)) * (max - min));
    };

    // Generate emotion values
    const joy = Math.min(100, Math.max(10, 40 + random(0, 50)));
    const stress = Math.min(100, Math.max(5, 15 + random(0, 40)));
    const fatigue = Math.min(100, Math.max(5, 10 + random(0, 30)));
    const anger = Math.min(100, Math.max(0, 5 + random(0, 20)));
    const fear = Math.min(100, Math.max(0, 5 + random(0, 25)));

    // Calculate wellbeing score
    const wellbeingScore = Math.floor(
      joy * 0.4 + (100 - stress) * 0.3 + (100 - fatigue) * 0.3
    );

    // Determine wellbeing status
    let wellbeingStatus = 'Stable';
    if (wellbeingScore >= 80) wellbeingStatus = 'Excellent';
    else if (wellbeingScore >= 60) wellbeingStatus = 'Good';
    else if (wellbeingScore >= 40) wellbeingStatus = 'Moderate';
    else wellbeingStatus = 'Needs Attention';

    // Calculate other metrics
    const emotionalStability = Math.floor(100 - (stress + anger + fear) / 3);
    const speechCoherence = Math.min(100, Math.floor(60 + wordCount / 10));
    const mistakeRisk = Math.floor((stress + fatigue) / 2);

    // Generate key indicators
    const indicators = [];
    if (stress > 30) indicators.push('Elevated stress');
    if (fatigue > 25) indicators.push('Cognitive fatigue');
    if (anger > 15) indicators.push('Emotional tension');
    if (fear > 15) indicators.push('Anxiety signals');
    if (indicators.length === 0) indicators.push('Balanced state');

    // Generate relief exercises
    const exercises = [];
    if (stress > 25) exercises.push('Breathing exercise');
    if (fatigue > 20) exercises.push('Short walk');
    if (anger > 10) exercises.push('Journaling');
    if (fear > 10) exercises.push('Meditation');
    if (exercises.length === 0) exercises.push('Mindfulness practice');

    // Determine dominant emotion
    const dominantEmotion = Object.entries({ joy, stress, fatigue, anger, fear })
      .sort((a, b) => b[1] - a[1])[0][0];

    // Create new analysis object
    const newAnalysis = {
      emotions: { joy, stress, fatigue, anger, fear },
      wellbeing_score: wellbeingScore,
      wellbeing_status: wellbeingStatus,
      emotional_stability: emotionalStability,
      speech_coherence: speechCoherence,
      mistake_risk_score: mistakeRisk,
      stress: stress,
      fatigue: fatigue,
      speech_metadata: {
        speaking_pace: wordCount > 50 ? 'Fast' : wordCount > 20 ? 'Moderate' : 'Slow',
        speech_intensity: stress > 30 ? 'High' : 'Medium',
        sentiment_score: joy / 100,
        dominant_emotion: dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1)
      },
      key_indicators: indicators,
      relief_exercises: exercises
    };

    setAnalysis(newAnalysis);
    return newAnalysis;
  }, []);

  // Context value object
  const value = {
    user,
    inputText,
    transcript,
    isRecording,
    analysis,
    login,
    logout,
    updateInputText,
    updateTranscript,
    setRecordingState,
    generateAnalysis
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
