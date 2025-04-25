
import { useVoice } from "@/contexts/VoiceContext";
import { VoiceInput } from "@/components/VoiceInput";
import { DataVisualization } from "@/components/DataVisualization";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Results = () => {
  const { queryResults, transcript, isProcessing } = useVoice();
  const location = useLocation();
  
  // Check if we have a transcript from the location state (from history click)
  const displayTranscript = location.state?.transcript || transcript;
  
  const hasResults = queryResults && queryResults.length > 0;
  
  const getVisualizationTitle = () => {
    if (!displayTranscript) return "Sample Results";
    
    if (displayTranscript.toLowerCase().includes("revenue by region")) {
      return "Revenue by Region";
    } 
    else if (displayTranscript.toLowerCase().includes("asia")) {
      return "Sales Data for Asia";
    }
    else if (displayTranscript.toLowerCase().includes("over")) {
      return "High Revenue Products";
    }
    else if (displayTranscript.toLowerCase().includes("north america")) {
      return "North America Sales Data";
    }
    
    return "Query Results";
  };
  
  return (
    <div className="container max-w-5xl mx-auto pt-8 pb-16 px-4">
      <div className="mb-8">
        <VoiceInput />
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#9b87f5]">
          {displayTranscript ? (
            <>Results for: <span className="text-[#6E59A5]">"{displayTranscript}"</span></>
          ) : (
            'Sample Results'
          )}
        </h2>
        
        {displayTranscript && (
          <p className="text-sm text-[#8E9196] mt-1">
            Your voice query was converted to a PostgreSQL query and executed against the database.
          </p>
        )}
      </div>
      
      {isProcessing ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#9b87f5] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-4 text-[#8A898C]">Converting your voice query to SQL and processing...</p>
          </div>
        </div>
      ) : hasResults ? (
        <div className="grid gap-6">
          <DataVisualization 
            data={queryResults!} 
            title={getVisualizationTitle()} 
            description={`Data visualization based on SQL query generated from your voice input: "${displayTranscript}"`}
          />
        </div>
      ) : (
        <div className="bg-brand-light-purple/50 rounded-2xl p-8 mt-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-[#6E59A5]">No Data to Visualize</h2>
            <p className="text-[#403E43] mt-2">Use the voice input above to ask a question about the data</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
