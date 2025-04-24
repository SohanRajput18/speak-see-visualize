
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
      className="px-4 py-2 text-sm bg-secondary/80 border border-secondary-foreground/20 rounded-full 
      hover:bg-secondary/90 
      text-white 
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
    "Which regions had declining sales in 2024?",
    "Show me customer growth trends in Europe",
    "What's the average order value by product category?",
    "Compare month-over-month sales performance",
    "What are the top 5 selling products?",
    "Show me marketing ROI by channel",
    "What was our revenue last month?",
    "How many new customers did we acquire in Q1?",
    "Which sales reps performed above target?",
    "Visualize customer retention rates by segment"
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-3 text-sm text-muted-foreground">
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
