
import { useNavigate } from "react-router-dom";

interface SuggestionProps {
  query: string;
}

const Suggestion = ({ query }: SuggestionProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // In a real app, we would process this query
    // For now, just navigate to results
    navigate('/results');
  };
  
  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full 
      hover:bg-brand-light-purple hover:border-brand-purple 
      text-[#221F26] hover:text-[#7E69AB] 
      transition-colors"
    >
      "{query}"
    </button>
  );
};

export function QuerySuggestions() {
  const suggestions = [
    "Show me total revenue by region",
    "What were the sales in Asia for last quarter?",
    "Find products with revenue over $300,000",
    "Compare quarterly sales for electronics in North America",
    "Which regions had declining sales in 2024?"
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-3 text-sm text-[#8E9196]">
        Try asking these database queries
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((query, index) => (
          <Suggestion key={index} query={query} />
        ))}
      </div>
    </div>
  );
}
