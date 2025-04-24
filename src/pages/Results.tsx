
import { useVoice } from "@/contexts/VoiceContext";
import { VoiceInput } from "@/components/VoiceInput";
import { DataVisualization } from "@/components/DataVisualization";

const Results = () => {
  const { queryResults, transcript, isProcessing } = useVoice();
  
  // If no results, show empty state
  const hasResults = queryResults && queryResults.length > 0;
  
  // Determine visualization title based on query
  const getVisualizationTitle = () => {
    if (!transcript) return "Sample Results";
    
    if (transcript.toLowerCase().includes("revenue by region")) {
      return "Revenue by Region";
    } 
    else if (transcript.toLowerCase().includes("asia")) {
      return "Sales Data for Asia";
    }
    else if (transcript.toLowerCase().includes("over")) {
      return "High Revenue Products";
    }
    else if (transcript.toLowerCase().includes("north america")) {
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
        <h2 className="text-xl font-semibold">
          {transcript ? (
            <>Results for: <span className="text-brand-purple">"{transcript}"</span></>
          ) : (
            'Sample Results'
          )}
        </h2>
        
        {transcript && (
          <p className="text-sm text-gray-500 mt-1">
            Your voice query was converted to a PostgreSQL query and executed against the database.
          </p>
        )}
      </div>
      
      {isProcessing ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-brand-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-4 text-gray-600">Converting your voice query to SQL and processing...</p>
          </div>
        </div>
      ) : hasResults ? (
        <div className="grid gap-6">
          <DataVisualization 
            data={queryResults!} 
            title={getVisualizationTitle()} 
            description={`Data visualization based on SQL query generated from your voice input: "${transcript}"`}
          />
        </div>
      ) : (
        <div className="bg-brand-light-purple/50 rounded-2xl p-8 mt-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-brand-purple">No Data to Visualize</h2>
            <p className="text-gray-600 mt-2">Use the voice input above to ask a question about the data</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
