
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

// Add types for the Web Speech API
interface Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

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
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
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
      'What were the sales in Asia for last quarter?',
      'Find products with revenue over $300,000',
      'Compare quarterly sales for electronics in North America',
      'Which regions had declining sales in 2024?'
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
    
    // In a real implementation, this would send the query to the backend
    // where it would be converted to SQL and executed against a PostgreSQL database
    console.log(`Converting query to SQL: "${query}"`);
    
    // Example of what would happen on the backend:
    let sqlQuery = "";
    let results = null;
    
    // Simple mock SQL generation based on common query patterns
    if (query.toLowerCase().includes("revenue by region")) {
      sqlQuery = "SELECT region, SUM(revenue) as revenue FROM sales GROUP BY region ORDER BY revenue DESC";
      results = mockResults;
    } 
    else if (query.toLowerCase().includes("asia")) {
      sqlQuery = "SELECT * FROM sales WHERE region = 'Asia'";
      results = mockResults.filter(item => item.region === 'Asia');
    }
    else if (query.toLowerCase().includes("over")) {
      sqlQuery = "SELECT * FROM sales WHERE revenue > 300000";
      results = mockResults.filter(item => item.revenue > 300000);
    }
    else if (query.toLowerCase().includes("north america")) {
      sqlQuery = "SELECT * FROM sales WHERE region = 'North America'";
      results = mockResults.filter(item => item.region === 'North America');
    }
    else {
      // Default fallback
      sqlQuery = "SELECT region, SUM(revenue) as revenue FROM sales GROUP BY region";
      results = mockResults;
    }
    
    console.log(`Generated SQL: ${sqlQuery}`);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      setQueryResults(results);
      toast({
        title: 'Query processed',
        description: `Successfully processed: "${query}" into SQL: "${sqlQuery}"`,
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
