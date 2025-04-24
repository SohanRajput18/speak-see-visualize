
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
      className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full hover:bg-brand-light-purple hover:border-brand-purple transition-colors"
    >
      "{query}"
    </button>
  );
};

export function QuerySuggestions() {
  const suggestions = [
    "Show me total revenue by region",
    "What are the top-selling products in Asia?",
    "Compare laptop sales across all regions",
    "Which category generated the most revenue in January?",
    "Show me sales trends for smartphones"
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-3 text-sm text-gray-500">
        Try asking
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((query, index) => (
          <Suggestion key={index} query={query} />
        ))}
      </div>
    </div>
  );
}
