
import React, { createContext, useState, useContext, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface QueryHistoryItem {
  transcript: string;
  results: any[] | null;
  timestamp: Date;
}

interface VoiceContextType {
  isRecording: boolean;
  transcript: string;
  startRecording: () => void;
  stopRecording: () => void;
  isProcessing: boolean;
  queryResults: any[] | null;
  queryHistory: QueryHistoryItem[];
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [queryResults, setQueryResults] = useState<any[] | null>(null);
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);

  let recognition: any = null;

  const saveQueryToDatabase = async (transcript: string, results: any[] | null, sqlQuery: string) => {
    try {
      // Only attempt to save to the database if we have transcript text
      if (transcript && transcript.trim() !== '') {
        // Add to local history even if database save fails
        setQueryHistory(prev => [{
          transcript,
          results,
          timestamp: new Date()
        }, ...prev]);

        const { error } = await supabase
          .from('voice_queries')
          .insert({
            transcript,
            results,
            sql_query: sqlQuery
          });

        if (error) {
          console.error('Error saving query:', error);
        } else {
          toast({
            title: 'Query saved',
            description: 'Your voice query has been saved successfully',
          });
        }
      }
    } catch (error) {
      console.error('Error saving query:', error);
    }
  };

  const startRecording = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
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
      setIsRecording(true);
      setTranscript('');
      setTimeout(() => {
        simulateRecognition();
      }, 2000);
    }
  }, []);

  const simulateRecognition = () => {
    const sampleQueries = [
      'Show me total revenue by region',
      'What were the sales in Asia for last quarter?',
      'Find products with revenue over $300,000',
      'Compare quarterly sales for electronics in North America',
      'Which regions had declining sales in 2024?'
    ];
    const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
    setTranscript(randomQuery);
    
    setTimeout(() => {
      stopRecording();
    }, 500);
  };

  const processQuery = async (query: string) => {
    if (!query || query.trim() === '') return;
    
    setIsProcessing(true);
    
    let sqlQuery = "";
    let results = null;
    
    if (query.toLowerCase().includes("revenue by region")) {
      sqlQuery = "SELECT region, SUM(revenue) as revenue FROM sales GROUP BY region ORDER BY revenue DESC";
      results = [
        { region: 'North America', revenue: 450000 },
        { region: 'Europe', revenue: 380000 },
        { region: 'Asia', revenue: 520000 },
        { region: 'South America', revenue: 220000 },
        { region: 'Africa', revenue: 180000 },
        { region: 'Australia', revenue: 200000 }
      ];
    } 
    else if (query.toLowerCase().includes("asia")) {
      sqlQuery = "SELECT * FROM sales WHERE region = 'Asia'";
      results = [{ region: 'Asia', revenue: 520000 }];
    }
    else if (query.toLowerCase().includes("over")) {
      sqlQuery = "SELECT * FROM sales WHERE revenue > 300000";
      results = [
        { region: 'North America', revenue: 450000 },
        { region: 'Europe', revenue: 380000 },
        { region: 'Asia', revenue: 520000 }
      ];
    }
    else {
      sqlQuery = "SELECT region, SUM(revenue) as revenue FROM sales GROUP BY region";
      results = [
        { region: 'North America', revenue: 450000 },
        { region: 'Europe', revenue: 380000 },
        { region: 'Asia', revenue: 520000 }
      ];
    }
    
    // Save query and results to database
    await saveQueryToDatabase(query, results, sqlQuery);
    
    setTimeout(() => {
      setIsProcessing(false);
      setQueryResults(results);
      toast({
        title: 'Query processed',
        description: `Successfully processed: "${query}" into SQL: "${sqlQuery}"`,
      });
    }, 2000);
  };

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    if (recognition) {
      recognition.stop();
    }
    
    if (transcript && transcript.trim() !== '') {
      processQuery(transcript);
    }
  }, [transcript]);

  return (
    <VoiceContext.Provider
      value={{
        isRecording,
        transcript,
        startRecording,
        stopRecording,
        isProcessing,
        queryResults,
        queryHistory
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};
