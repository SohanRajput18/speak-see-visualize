
import { useVoice } from "@/contexts/VoiceContext";
import { VoiceInput } from "@/components/VoiceInput";
import { DataVisualization } from "@/components/DataVisualization";

const Results = () => {
  const { queryResults, transcript, isProcessing } = useVoice();
  
  // Mock data if no results yet
  const mockData = [
    { region: 'North America', revenue: 450000 },
    { region: 'Europe', revenue: 380000 },
    { region: 'Asia', revenue: 520000 },
    { region: 'South America', revenue: 220000 },
    { region: 'Africa', revenue: 180000 },
    { region: 'Australia', revenue: 200000 }
  ];

  const data = queryResults || mockData;
  
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
      </div>
      
      {isProcessing ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-brand-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-4 text-gray-600">Processing your query...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          <DataVisualization 
            data={data} 
            title="Revenue by Region" 
            description="Showing the total revenue broken down by geographic region"
          />
        </div>
      )}
    </div>
  );
};

export default Results;
