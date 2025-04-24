
import React, { createContext, useState, useContext, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

interface VoiceContextType {
  isRecording: boolean;
  transcript: string;
  startRecording: () => void;
  stopRecording: () => void;
  isProcessing: boolean;
  queryResults: any[] | null;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};

// Mock data for visualization
const mockResults = [
  { region: 'North America', revenue: 450000 },
  { region: 'Europe', revenue: 380000 },
  { region: 'Asia', revenue: 520000 },
  { region: 'South America', revenue: 220000 },
  { region: 'Africa', revenue: 180000 },
  { region: 'Australia', revenue: 200000 }
];

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [queryResults, setQueryResults] = useState<any[] | null>(null);

  // Mock recognition object to simulate Web Speech API
  let recognition: any = null;

  const startRecording = useCallback(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Use the actual Web Speech API if available
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        toast({
          title: 'Error',
          description: `Speech recognition error: ${event.error}`,
          variant: 'destructive'
        });
        setIsRecording(false);
      };

      recognition.start();
    } else {
      // Mock the speech recognition if not available
      setIsRecording(true);
      setTranscript('');
      
      // Simulate recording for demo purposes
      toast({
        title: 'Demo Mode',
        description: 'Speech recognition is simulated in this demo. Your query will be processed automatically.',
      });
      
      // Simulate a delay before stopping
      setTimeout(() => {
        simulateRecognition();
      }, 2000);
    }
  }, []);

  const simulateRecognition = () => {
    // Set a sample transcript for demonstration
    const sampleQueries = [
      'Show me total revenue by region',
      'What are the top-selling products in Asia?',
      'Compare laptop sales across all regions',
      'Which category generated the most revenue in January?',
      'Show me sales trends for smartphones'
    ];
    const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
    setTranscript(randomQuery);
    
    // Auto stop after setting transcript
    setTimeout(() => {
      stopRecording();
    }, 500);
  };

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    if (recognition) {
      recognition.stop();
    }
    
    // Process the query
    if (transcript) {
      processQuery(transcript);
    }
  }, [transcript]);

  const processQuery = (query: string) => {
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      setQueryResults(mockResults);
      toast({
        title: 'Query processed',
        description: `Successfully processed: "${query}"`,
      });
      
      // Update the URL to navigate to results page
      if (window.location.pathname !== '/results') {
        window.history.pushState({}, '', '/results');
      }
    }, 2000);
  };

  return (
    <VoiceContext.Provider
      value={{
        isRecording,
        transcript,
        startRecording,
        stopRecording,
        isProcessing,
        queryResults
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};
