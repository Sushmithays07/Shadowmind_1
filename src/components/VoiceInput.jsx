import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useAppContext } from '@/context/AppContext.jsx';
import { cn } from '@/utils/cn.js';

/**
 * VoiceInput component - Handles voice input using Web Speech API
 * Features:
 * - Start/Stop voice recording
 * - Real-time transcript display
 * - Waveform animation when recording
 * - Error handling for unsupported browsers
 * - Visual feedback for listening state
 * 
 * @param {Object} props - Component props
 * @param {function} props.onTranscriptChange - Callback when transcript changes
 */
const VoiceInput = ({ onTranscriptChange }) => {
  const { isRecording, setRecordingState, transcript, updateTranscript } = useAppContext();
  
  // Local state
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  
  // Ref for waveform container
  const waveformRef = useRef(null);

  /**
   * Initialize Speech Recognition
   * Sets up the Web Speech API recognition instance
   */
  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      
      // Configure recognition settings
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';
      
      // Handle recognition start
      rec.onstart = () => {
        setRecordingState(true);
        setError(null);
        setInterimTranscript('');
      };
      
      // Handle recognition results
      rec.onresult = (event) => {
        let finalTranscript = '';
        let interim = '';
        
        // Process results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interim += transcript;
          }
        }
        
        // Update final transcript
        if (finalTranscript) {
          updateTranscript((prev) => {
            const newTranscript = prev ? `${prev} ${finalTranscript.trim()}` : finalTranscript.trim();
            return newTranscript;
          });
        }
        
        // Update interim transcript
        setInterimTranscript(interim);
      };
      
      // Handle recognition errors
      rec.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        // Set user-friendly error message
        let errorMessage = 'An error occurred with speech recognition';
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            break;
          case 'audio-capture':
            errorMessage = 'No microphone found. Please check your microphone.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone access.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your connection.';
            break;
          case 'aborted':
            errorMessage = 'Speech recognition was aborted.';
            break;
          default:
            errorMessage = `Error: ${event.error}`;
        }
        
        setError(errorMessage);
        setRecordingState(false);
      };
      
      // Handle recognition end
      rec.onend = () => {
        setRecordingState(false);
        setInterimTranscript('');
      };
      
      setRecognition(rec);
    } else {
      // Browser doesn't support speech recognition
      setError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
    }
    
    // Cleanup function
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Notify parent component of transcript changes
   */
  useEffect(() => {
    if (onTranscriptChange) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  /**
   * Toggle recording state
   * Starts or stops the speech recognition
   */
  const toggleRecording = useCallback(() => {
    if (!recognition) {
      setError('Speech recognition is not available in this browser');
      return;
    }
    
    if (isRecording) {
      // Stop recording
      recognition.stop();
      setRecordingState(false);
    } else {
      // Clear previous transcript and start recording
      updateTranscript('');
      setInterimTranscript('');
      setError(null);
      
      try {
        recognition.start();
      } catch (err) {
        console.error('Error starting recognition:', err);
        setError('Failed to start speech recognition. Please try again.');
      }
    }
  }, [recognition, isRecording, setRecordingState, updateTranscript]);

  /**
   * WaveformBars component - Animated waveform visualization
   */
  const WaveformBars = () => {
    return (
      <div className="flex items-center justify-center gap-1 h-12">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-cyan-400 rounded-full waveform-bar"
            style={{
              height: '20%',
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Voice Input Panel */}
      <div className="glass-card rounded-xl p-6 mb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2">
            <Mic className="w-5 h-5 text-cyan-400" />
            Voice Input
          </h3>
          <span 
            className={cn(
              'text-sm font-mono px-3 py-1 rounded-full',
              isRecording 
                ? 'text-cyan-400 bg-cyan-500/10 animate-pulse' 
                : 'text-gray-500 bg-gray-800'
            )}
          >
            {isRecording ? 'LISTENING...' : 'READY'}
          </span>
        </div>

        {/* Recording Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={toggleRecording}
            disabled={!recognition}
            className={cn(
              'relative w-20 h-20 rounded-full flex items-center justify-center',
              'transition-all duration-300 transform',
              isRecording
                ? 'bg-red-500/20 border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse'
                : 'bg-cyan-500/20 border-2 border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105',
              !recognition && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isRecording ? (
              <MicOff className="w-8 h-8 text-red-400" />
            ) : (
              <Mic className="w-8 h-8 text-cyan-400" />
            )}
            
            {/* Ripple effect when recording */}
            {isRecording && (
              <>
                <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                <span className="absolute -inset-4 rounded-full bg-red-500/10 animate-ping animation-delay-200" />
              </>
            )}
          </button>
          
          <p className="text-sm text-gray-400 font-mono">
            {isRecording 
              ? 'Click to stop recording' 
              : recognition 
                ? 'Click to start recording' 
                : 'Speech recognition unavailable'}
          </p>
        </div>

        {/* Waveform Animation */}
        {isRecording && (
          <div className="mt-6">
            <WaveformBars />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400 font-mono">{error}</p>
          </div>
        )}

        {/* Live Transcript Display */}
        {(transcript || interimTranscript) && (
          <div className="mt-4 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
            <p className="text-xs text-cyan-500/70 font-mono mb-2">TRANSCRIPT:</p>
            <p className="text-white font-mono text-sm leading-relaxed">
              {transcript}
              {interimTranscript && (
                <span className="text-gray-500"> {interimTranscript}</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceInput;
