import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recommendation } from "@/data/recommendations";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  TrendingUp, 
  Lightbulb, 
  Briefcase, 
  CreditCard,
  Film,
  Layers
} from "lucide-react";

type RecommendationCardProps = {
  recommendation: Recommendation;
  className?: string;
};

const RecommendationCard = ({ recommendation, className = "" }: RecommendationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Layers className="h-4 w-4" />;
      case 'service':
        return <Briefcase className="h-4 w-4" />;
      case 'content':
        return <Film className="h-4 w-4" />;
      case 'financial':
        return <CreditCard className="h-4 w-4" />;
      case 'experience':
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    if (score >= 80) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    if (score >= 70) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
  };

  const getImageUrl = () => {
    // Check if the image URL starts with http or https
    if (recommendation.imageUrl.startsWith('http')) {
      return recommendation.imageUrl;
    }
    
    // Otherwise use a placeholder
    return 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=500&auto=format&fit=crop';
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isHovered ? 'scale-[1.02]' : 'scale-100'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={getImageUrl()}
          alt={recommendation.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div className="absolute top-3 right-3">
          <Badge className={`flex items-center gap-1 px-2 py-1 text-xs font-medium ${getBadgeColor(recommendation.relevanceScore)}`}>
            <TrendingUp className="h-3.5 w-3.5" />
            {recommendation.relevanceScore}% Match
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            {getTypeIcon(recommendation.type)}
            {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}
          </Badge>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-1">{recommendation.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{recommendation.description}</p>
      </CardContent>
      
      <CardFooter className="px-5 py-4 border-t bg-secondary/10">
        <Button 
          className="w-full"
          variant="default"
          size="sm"
        >
          {recommendation.callToAction}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
