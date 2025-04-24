
import { VoiceInput } from "@/components/VoiceInput";
import { QuerySuggestions } from "@/components/QuerySuggestions";

const Index = () => {
  return (
    <div className="container max-w-5xl mx-auto pt-12 pb-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500 mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Voice to Visual Insight
        </h1>
        <p className="text-xl text-blue-500/90 mb-6">Speak your data queries and get instant visualizations</p>
        <p className="text-md text-blue-500/70 mb-10">Your voice is converted to SQL queries that search the database</p>
        
        <div className="mb-12">
          <VoiceInput />
        </div>
        
        <div className="mt-12">
          <QuerySuggestions />
        </div>
      </div>
      
      <div className="glass-morphism rounded-2xl p-8 mt-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">How It Works</h2>
          <div className="mt-4 text-left max-w-2xl mx-auto">
            <ol className="list-decimal list-inside space-y-3">
              {[
                "Speak your query using the microphone button above",
                "Your voice is converted to text using speech recognition",
                "The text is transformed into a PostgreSQL database query",
                "The database is searched based on your query",
                "Results are visualized in charts and tables that match your question"
              ].map((step, index) => (
                <li key={index} className="text-blue-500/80 hover:text-blue-400 transition-colors duration-300">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
