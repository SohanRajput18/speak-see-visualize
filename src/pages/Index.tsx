
import { VoiceInput } from "@/components/VoiceInput";
import { QuerySuggestions } from "@/components/QuerySuggestions";
import { Database, LineChart, Lightbulb, Share2 } from "lucide-react";

const Index = () => {
  return (
    <div className="container max-w-5xl mx-auto pt-12 pb-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1EAEDB] mb-4 [text-shadow:_0_0_15px_rgba(30,174,219,0.5)]">Voice to Visual <span className="text-[#1EAEDB] [text-shadow:_0_0_15px_rgba(30,174,219,0.5)]">Insight</span></h1>
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
      
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-[#6E59A5] text-center mb-8">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary/10 p-6 rounded-xl border border-secondary-foreground/10 flex flex-col items-center text-center hover:bg-secondary/20 transition-all">
            <div className="h-12 w-12 bg-[#1EAEDB]/20 rounded-full flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-[#1EAEDB]" />
            </div>
            <h3 className="font-medium text-lg text-[#1EAEDB] mb-2">Query History</h3>
            <p className="text-[#8A898C]">All your past queries are saved for easy reference and reuse. Access them anytime to track your data exploration journey.</p>
          </div>
          
          <div className="bg-secondary/10 p-6 rounded-xl border border-secondary-foreground/10 flex flex-col items-center text-center hover:bg-secondary/20 transition-all">
            <div className="h-12 w-12 bg-[#1EAEDB]/20 rounded-full flex items-center justify-center mb-4">
              <LineChart className="h-6 w-6 text-[#1EAEDB]" />
            </div>
            <h3 className="font-medium text-lg text-[#1EAEDB] mb-2">Smart Visualizations</h3>
            <p className="text-[#8A898C]">Our AI automatically selects the most appropriate visualization type for your data, delivering instant insights through charts and graphs.</p>
          </div>
          
          <div className="bg-secondary/10 p-6 rounded-xl border border-secondary-foreground/10 flex flex-col items-center text-center hover:bg-secondary/20 transition-all">
            <div className="h-12 w-12 bg-[#1EAEDB]/20 rounded-full flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-[#1EAEDB]" />
            </div>
            <h3 className="font-medium text-lg text-[#1EAEDB] mb-2">Insight Suggestions</h3>
            <p className="text-[#8A898C]">Discover trends and patterns you might have missed with AI-powered suggestions that highlight important insights in your data.</p>
          </div>
          
          <div className="bg-secondary/10 p-6 rounded-xl border border-secondary-foreground/10 flex flex-col items-center text-center hover:bg-secondary/20 transition-all">
            <div className="h-12 w-12 bg-[#1EAEDB]/20 rounded-full flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6 text-[#1EAEDB]" />
            </div>
            <h3 className="font-medium text-lg text-[#1EAEDB] mb-2">Easy Sharing</h3>
            <p className="text-[#8A898C]">Share your visualizations with team members through exportable reports and direct links for collaborative data analysis.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
