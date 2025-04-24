
import { VoiceInput } from "@/components/VoiceInput";
import { QuerySuggestions } from "@/components/QuerySuggestions";

const Index = () => {
  return (
    <div className="container max-w-5xl mx-auto pt-12 pb-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-brand-purple mb-4">Voice to Visual Insight</h1>
        <p className="text-xl text-gray-600 mb-10">Speak your data queries and get instant visualizations</p>
        
        <div className="mb-12">
          <VoiceInput />
        </div>
        
        <div className="mt-12">
          <QuerySuggestions />
        </div>
      </div>
      
      <div className="bg-brand-light-purple/50 rounded-2xl p-8 mt-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-brand-purple">No Data to Visualize</h2>
          <p className="text-gray-600 mt-2">Use the voice input above to ask a question about the data</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
