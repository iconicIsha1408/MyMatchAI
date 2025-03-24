
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import UserCard from "@/components/UserCard";
import RecommendationCard from "@/components/RecommendationCard";
import TransactionHistory from "@/components/TransactionHistory";
import { getPersonalizedRecommendations, Recommendation } from "@/data/recommendations";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Sparkles, CreditCard, ShoppingBag, Lightbulb, Heart, Receipt } from "lucide-react";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  useEffect(() => {
    if (user) {
      // Simulate API call delay
      setLoadingRecommendations(true);
      setTimeout(() => {
        const personalized = getPersonalizedRecommendations(user, 9);
        setRecommendations(personalized);
        setLoadingRecommendations(false);
      }, 1000);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary/20 rounded-full"></div>
          <div className="mt-4 h-4 w-24 bg-primary/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const currentDate = new Date();
  const greeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            {greeting()}, {user.firstName}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here are your personalized recommendations for {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - User Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <UserCard user={user} />
            
            {/* Transaction History */}
            <TransactionHistory transactions={user.purchaseHistory} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Transaction-Based Recommendations Alert */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
              <Receipt className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Smart Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Your recommendations are personalized based on your transaction history, interests, and activity.
                </p>
              </div>
            </div>
            
            {/* Recommendation Categories */}
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Top Recommendations
                </h2>
                <TabsList className="grid grid-cols-4 sm:w-[400px]">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                {loadingRecommendations ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="h-80 animate-pulse">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                        <CardContent className="p-5">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((recommendation) => (
                      <RecommendationCard
                        key={recommendation.id}
                        recommendation={recommendation}
                      />
                    ))}
                  </div>
                )}
                
                {!loadingRecommendations && recommendations.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No recommendations available at this time.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="financial" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {!loadingRecommendations &&
                    recommendations
                      .filter((rec) => rec.type === 'financial')
                      .map((recommendation) => (
                        <RecommendationCard
                          key={recommendation.id}
                          recommendation={recommendation}
                        />
                      ))}
                </div>
                
                {!loadingRecommendations && 
                  recommendations.filter((rec) => rec.type === 'financial').length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No financial recommendations available at this time.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="products" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {!loadingRecommendations &&
                    recommendations
                      .filter((rec) => rec.type === 'product')
                      .map((recommendation) => (
                        <RecommendationCard
                          key={recommendation.id}
                          recommendation={recommendation}
                        />
                      ))}
                </div>
                
                {!loadingRecommendations && 
                  recommendations.filter((rec) => rec.type === 'product').length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No product recommendations available at this time.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="lifestyle" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {!loadingRecommendations &&
                    recommendations
                      .filter((rec) => (
                        rec.category === 'lifestyle' || 
                        rec.category === 'health' || 
                        rec.type === 'experience'
                      ))
                      .map((recommendation) => (
                        <RecommendationCard
                          key={recommendation.id}
                          recommendation={recommendation}
                        />
                      ))}
                </div>
                
                {!loadingRecommendations && 
                  recommendations.filter((rec) => (
                    rec.category === 'lifestyle' || 
                    rec.category === 'health' || 
                    rec.type === 'experience'
                  )).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No lifestyle recommendations available at this time.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            {/* Insights Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Personalized Insights
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-500" />
                      Financial Patterns
                    </CardTitle>
                    <CardDescription>
                      Analysis based on your financial activity and transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {user.interests.some(i => i.category === 'financial') || user.purchaseHistory.some(p => p.category === 'Books' && p.productName.includes('Financial')) ? (
                        <>
                          <li className="flex items-start gap-2 text-sm">
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
                            <div>
                              <span className="font-medium">Transaction insights:</span> Based on your {user.purchaseHistory.length > 0 ? `${user.purchaseHistory[0].productName} purchase` : 'financial interests'}, you might benefit from our premium financial advisory services.
                            </div>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</div>
                            <div>
                              <span className="font-medium">Spending pattern detected:</span> Your transaction history suggests you prioritize {user.purchaseHistory.some(p => parseFloat(p.price.toString()) > 100) ? 'quality over quantity' : 'value-based purchases'}.
                            </div>
                          </li>
                        </>
                      ) : (
                        <li className="text-sm text-muted-foreground">
                          Add financial interests or make financial-related purchases to receive personalized financial insights.
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-purple-500" />
                      Shopping Preferences
                    </CardTitle>
                    <CardDescription>
                      Derived from your purchase patterns and transaction history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {user.interests.some(i => i.category === 'shopping') || user.purchaseHistory.length > 0 ? (
                        <>
                          <li className="flex items-start gap-2 text-sm">
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">1</div>
                            <div>
                              <span className="font-medium">Transaction-based insight:</span> Your purchases in {user.purchaseHistory.length > 0 ? user.purchaseHistory[0].category : 'shopping categories'} indicate preferences for {user.purchaseHistory.some(p => p.category === 'Gadgets') ? 'tech-forward products' : 'practical, high-quality items'}.
                            </div>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">2</div>
                            <div>
                              <span className="font-medium">Purchase timing:</span> You tend to make purchases {user.purchaseHistory.length > 1 ? 'regularly throughout the month' : 'strategically when needed'}.
                            </div>
                          </li>
                        </>
                      ) : (
                        <li className="text-sm text-muted-foreground">
                          Complete purchases to receive personalized shopping insights based on your transaction patterns.
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Lifestyle Insights */}
                <Card className="md:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Lifestyle Analysis
                    </CardTitle>
                    <CardDescription>
                      Based on your preferences, transaction history, and engagement patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Transaction-Based Observations</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm">
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">1</div>
                            <div>
                              {user.purchaseHistory.some(p => p.category === 'Books' || p.category === 'Digital' || p.category === 'Fitness') ? (
                                <span>Your purchases of {user.purchaseHistory.find(p => p.category === 'Books' || p.category === 'Digital' || p.category === 'Fitness')?.productName} suggest a focus on personal development and wellness.</span>
                              ) : user.purchaseHistory.some(p => p.category === 'Sports' || p.category === 'Gadgets') ? (
                                <span>Your transactions for {user.purchaseHistory.find(p => p.category === 'Sports' || p.category === 'Gadgets')?.productName} indicate an active, tech-savvy lifestyle.</span>
                              ) : (
                                <span>Your transaction history suggests balanced spending across various lifestyle categories.</span>
                              )}
                            </div>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">2</div>
                            <div>
                              {user.purchaseHistory.length > 2 ? (
                                <span>Your frequent purchases across multiple categories indicate diverse interests and active lifestyle management.</span>
                              ) : user.purchaseHistory.length > 0 ? (
                                <span>Your focused purchasing in specific categories suggests targeted lifestyle optimization.</span>
                              ) : (
                                <span>Begin making purchases to unlock transaction-based lifestyle insights.</span>
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">AI-Powered Recommendations</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm">
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">1</div>
                            <div>
                              {user.purchaseHistory.some(p => parseFloat(p.price.toString()) > 200) ? (
                                <span>Based on your premium purchases, consider our high-tier membership services for exclusive benefits and priority support.</span>
                              ) : (
                                <span>Based on your transaction patterns, our value-tier services would align best with your current purchasing behavior.</span>
                              )}
                            </div>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">2</div>
                            <div>
                              {user.purchaseHistory.some(p => p.category === 'Gadgets' || p.category === 'Digital') ? (
                                <span>Your tech-related transactions indicate you would benefit from our digital-first premium services with integrated technology features.</span>
                              ) : user.purchaseHistory.some(p => p.category === 'Fitness' || p.category === 'Books') ? (
                                <span>Your wellness-focused transactions suggest our holistic lifestyle services would provide optimal value for your preferences.</span>
                              ) : (
                                <span>Based on your current transaction profile, our flexible service packages would provide the best balance of features and value.</span>
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
