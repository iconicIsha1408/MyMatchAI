
import { User, InterestCategory } from './users';

export type RecommendationType = 
  | 'product' 
  | 'service' 
  | 'content'
  | 'financial'
  | 'experience';

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  type: RecommendationType;
  category: InterestCategory;
  imageUrl: string;
  relevanceScore: number; // 1-100
  callToAction: string;
  url: string;
};

// Base recommendations pool
const recommendationsPool: Recommendation[] = [
  // Financial recommendations
  {
    id: 'rec1',
    title: 'First-Time Home Buyer Program',
    description: 'Special rates and assistance for first-time home buyers in metropolitan areas.',
    type: 'financial',
    category: 'financial',
    imageUrl: '/rec-home-loan.jpg',
    relevanceScore: 95,
    callToAction: 'Learn More',
    url: '#'
  },
  {
    id: 'rec2',
    title: 'High-Yield Retirement Account',
    description: 'Start building your retirement wealth early with our high-yield retirement accounts designed for young professionals.',
    type: 'financial',
    category: 'financial',
    imageUrl: '/rec-retirement.jpg',
    relevanceScore: 90,
    callToAction: 'Open Account',
    url: '#'
  },
  {
    id: 'rec3',
    title: 'Tech Industry ETF Bundle',
    description: 'Curated ETF bundle focused on high-growth technology companies with low management fees.',
    type: 'financial',
    category: 'financial',
    imageUrl: '/rec-etf.jpg',
    relevanceScore: 85,
    callToAction: 'Invest Now',
    url: '#'
  },
  
  // Shopping recommendations
  {
    id: 'rec4',
    title: 'Smart Budget Shopping Assistant',
    description: 'AI-powered tool that finds the best deals based on your shopping habits and preferences.',
    type: 'service',
    category: 'shopping',
    imageUrl: '/rec-budget.jpg',
    relevanceScore: 88,
    callToAction: 'Try Free',
    url: '#'
  },
  {
    id: 'rec5',
    title: 'Exclusive Restaurant Discounts',
    description: 'Get 20% off at top-rated restaurants in your area with our dining pass subscription.',
    type: 'service',
    category: 'lifestyle',
    imageUrl: '/rec-dining.jpg',
    relevanceScore: 82,
    callToAction: 'Get Discount',
    url: '#'
  },
  
  // Gadget recommendations
  {
    id: 'rec6',
    title: 'Latest Tech Gadget Bundle',
    description: 'Curated collection of the newest smart home devices compatible with your existing tech.',
    type: 'product',
    category: 'technology',
    imageUrl: '/rec-gadgets.jpg',
    relevanceScore: 92,
    callToAction: 'Shop Now',
    url: '#'
  },
  
  // Travel recommendations
  {
    id: 'rec7',
    title: 'Adventure Travel Package',
    description: 'Customized travel experiences for active lifestyles with special financing options.',
    type: 'experience',
    category: 'travel',
    imageUrl: '/rec-travel.jpg',
    relevanceScore: 87,
    callToAction: 'Explore Packages',
    url: '#'
  },
  
  // Discount recommendations
  {
    id: 'rec8',
    title: 'Premium Shopper Membership',
    description: 'Exclusive access to early sales, special discounts, and limited collections at your favorite brands.',
    type: 'service',
    category: 'shopping',
    imageUrl: '/rec-discounts.jpg',
    relevanceScore: 94,
    callToAction: 'Join Now',
    url: '#'
  },
  
  // New arrivals
  {
    id: 'rec9',
    title: 'New Season Fashion Alert',
    description: 'Be the first to know about new arrivals from designer collections curated for your style profile.',
    type: 'service',
    category: 'shopping',
    imageUrl: '/rec-fashion.jpg',
    relevanceScore: 89,
    callToAction: 'Preview Collection',
    url: '#'
  },
  
  // Travel credit cards
  {
    id: 'rec10',
    title: 'Elite Travel Rewards Card',
    description: 'Premium travel credit card with enhanced points on flights, hotels, and exclusive lounge access worldwide.',
    type: 'financial',
    category: 'financial',
    imageUrl: '/rec-travel-card.jpg',
    relevanceScore: 96,
    callToAction: 'Apply Now',
    url: '#'
  },
  
  // Books
  {
    id: 'rec11',
    title: 'Curated Book Subscription',
    description: 'Personalized monthly book selections based on your reading preferences with exclusive author interviews.',
    type: 'service',
    category: 'lifestyle',
    imageUrl: '/rec-books.jpg',
    relevanceScore: 93,
    callToAction: 'Subscribe',
    url: '#'
  },
  
  // Meditation
  {
    id: 'rec12',
    title: 'Premium Meditation Retreat',
    description: 'All-inclusive meditation retreat packages at luxury wellness resorts with special financing available.',
    type: 'experience',
    category: 'health',
    imageUrl: '/rec-meditation.jpg',
    relevanceScore: 91,
    callToAction: 'Book Retreat',
    url: '#'
  },
  
  // Yoga
  {
    id: 'rec13',
    title: 'Advanced Yoga Program',
    description: 'Personalized yoga instruction and wellness planning with certified experts for your specific needs.',
    type: 'service',
    category: 'health',
    imageUrl: '/rec-yoga.jpg',
    relevanceScore: 90,
    callToAction: 'Join Program',
    url: '#'
  },
  
  // Mortgage
  {
    id: 'rec14',
    title: 'Mortgage Refinancing Analyzer',
    description: 'AI tool that continually monitors rates and your mortgage to recommend optimal refinancing opportunities.',
    type: 'financial',
    category: 'financial',
    imageUrl: '/rec-mortgage.jpg',
    relevanceScore: 88,
    callToAction: 'Analyze My Mortgage',
    url: '#'
  },
  
  // Sports
  {
    id: 'rec15',
    title: 'Premium Sports Membership',
    description: 'VIP access to sporting events, exclusive workout classes, and athlete-designed training programs.',
    type: 'service',
    category: 'lifestyle',
    imageUrl: '/rec-sports.jpg',
    relevanceScore: 86,
    callToAction: 'Get Access',
    url: '#'
  }
];

// Function to get personalized recommendations based on user profile
export const getPersonalizedRecommendations = (user: User, limit: number = 6): Recommendation[] => {
  if (!user) return [];
  
  // Extract user interests
  const userInterests = user.interests.map(interest => interest.id);
  const userCategories = user.interests.map(interest => interest.category);
  
  // Calculate recommendation scores based on user profile
  const scoredRecommendations = recommendationsPool.map(recommendation => {
    let score = recommendation.relevanceScore;
    
    // Boost score for recommendations that match user interests directly
    const matchesDirectInterest = userInterests.some(interest => 
      recommendation.title.toLowerCase().includes(interest.toLowerCase()) || 
      recommendation.description.toLowerCase().includes(interest.toLowerCase())
    );
    
    if (matchesDirectInterest) {
      score += 20;
    }
    
    // Boost score for recommendations in user's preferred categories
    if (userCategories.includes(recommendation.category)) {
      score += 15;
    }
    
    // Adjust based on user engagement
    score += (user.engagementScore / 10);
    
    // Adjust based on sentiment
    score += (user.sentimentScore * 2);
    
    // Age-based adjustments
    if (user.age < 25 && recommendation.type === 'product') {
      score += 10;
    }
    
    if (user.age > 30 && recommendation.type === 'financial') {
      score += 10;
    }
    
    // Occupation-based adjustments
    if (user.occupation.toLowerCase().includes('engineer') && recommendation.category === 'technology') {
      score += 8;
    }
    
    if (user.occupation.toLowerCase().includes('manager') && recommendation.type === 'service') {
      score += 8;
    }
    
    // Location-based adjustments
    if (user.location.includes('New York') && recommendation.title.includes('Metropolitan')) {
      score += 5;
    }
    
    if (user.location.includes('San Francisco') && recommendation.category === 'health') {
      score += 5;
    }
    
    // NEW: Transaction-based adjustments
    if (user.purchaseHistory.length > 0) {
      // Check for recent high-value purchases
      const recentHighValuePurchases = user.purchaseHistory.filter(
        purchase => parseFloat(purchase.price.toString()) > 100
      );
      
      if (recentHighValuePurchases.length > 0 && recommendation.category === 'financial') {
        score += 15; // Boost financial recommendations for users with high-value purchases
      }
      
      // Check for category matches between purchases and recommendations
      user.purchaseHistory.forEach(purchase => {
        if (
          recommendation.title.toLowerCase().includes(purchase.category.toLowerCase()) ||
          recommendation.description.toLowerCase().includes(purchase.category.toLowerCase())
        ) {
          score += 10; // Boost recommendations that match purchase categories
        }
      });
      
      // Check for frequent purchasing behavior
      if (user.purchaseHistory.length >= 3 && recommendation.type === 'service') {
        score += 5; // Boost service recommendations for frequent shoppers
      }
    }
    
    return {
      ...recommendation,
      relevanceScore: Math.min(100, score) // Cap at 100
    };
  });
  
  // Sort by score and limit
  return scoredRecommendations
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
};
