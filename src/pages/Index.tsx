import { VoiceInput } from "@/components/VoiceInput";
import { QuerySuggestions } from "@/components/QuerySuggestions";

const Index = () => {
  return (
    <div className="container max-w-5xl mx-auto pt-12 pb-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1EAEDB] glow mb-4">Voice to Visual Insight</h1>
        <p className="text-xl text-[#8E9196] mb-6">Speak your data queries and get instant visualizations</p>
        <p className="text-md text-[#8A898C] mb-10">Your voice is converted to SQL queries that search the database</p>
        
        <div className="mb-12">
          <VoiceInput />
        </div>
        
        <div className="mt-12">
          <QuerySuggestions />
        </div>
      </div>
      
      <div className="bg-brand-light-purple/50 rounded-2xl p-8 mt-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-[#6E59A5]">How It Works</h2>
          <div className="mt-4 text-left max-w-2xl mx-auto">
            <ol className="list-decimal list-inside space-y-2">
              <li className="text-[#403E43]">Speak your query using the microphone button above</li>
              <li className="text-[#403E43]">Your voice is converted to text using speech recognition</li>
              <li className="text-[#403E43]">The text is transformed into a PostgreSQL database query</li>
              <li className="text-[#403E43]">The database is searched based on your query</li>
              <li className="text-[#403E43]">Results are visualized in charts and tables that match your question</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
