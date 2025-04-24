
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronRight, Clock, BarChart, PieChart, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  queries: string[];
}

const Category = ({ title, icon, queries }: CategoryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="mb-4">
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="flex items-center gap-2 text-left text-[#9b87f5] font-medium mb-2 hover:text-[#6E59A5] transition-colors"
      >
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        {icon}
        {title}
      </button>
      
      {isExpanded && (
        <div className={cn("flex flex-wrap gap-2 mb-3 ml-6", 
          isExpanded ? "animate-accordion-down" : "animate-accordion-up")}>
          {queries.map((query, index) => (
            <Suggestion key={index} query={query} />
          ))}
        </div>
      )}
    </div>
  );
};

export function QuerySuggestions() {
  const salesQueries = [
    "Show me total revenue by region",
    "What were the sales in Asia for last quarter?", 
    "Find products with revenue over $300,000",
    "Compare quarterly sales for electronics in North America",
    "Which regions had declining sales in 2024?"
  ];
  
  const productQueries = [
    "Which products have the highest profit margin?",
    "Show inventory levels across all warehouses",
    "Compare product category performance year over year",
    "What's the average delivery time by product category?",
    "Identify products with sales growth above 15%"
  ];
  
  const customerQueries = [
    "Show customer retention rates by region",
    "What's our customer lifetime value trend?",
    "Display new customer acquisition cost over time",
    "Which customer segments are most profitable?",
    "Compare repeat purchase rates across demographics"
  ];
  
  const recentQueries = [
    "Total revenue by country",
    "Monthly sales trend for Q2",
    "Market share analysis by segment",
    "Product returns by category"
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-3 text-sm text-muted-foreground">
        Try asking these database queries
      </div>
      
      <div className="bg-secondary/10 rounded-lg p-4 border border-secondary-foreground/20">
        <Category 
          title="Recent Queries" 
          icon={<Clock className="h-4 w-4" />} 
          queries={recentQueries} 
        />
        
        <Category 
          title="Sales Analytics" 
          icon={<BarChart className="h-4 w-4" />} 
          queries={salesQueries} 
        />
        
        <Category 
          title="Product Insights" 
          icon={<PieChart className="h-4 w-4" />} 
          queries={productQueries} 
        />
        
        <Category 
          title="Customer Analytics" 
          icon={<TrendingUp className="h-4 w-4" />} 
          queries={customerQueries} 
        />
      </div>
    </div>
  );
}
