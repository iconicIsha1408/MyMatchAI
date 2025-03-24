
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { ProfileForm } from "@/components/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, ShieldCheck, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const { user, isLoading } = useAuth();

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex items-center mb-10">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar || "https://i.pravatar.cc/300"} />
                  <AvatarFallback>{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <TabsList className="grid grid-cols-1 w-full">
                <TabsTrigger value="profile" className="justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Profile Information
                </TabsTrigger>
                <TabsTrigger value="privacy" className="justify-start">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Privacy & Data
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <Card className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsContent value="profile" className="m-0">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="privacy" className="m-0">
                <CardHeader>
                  <CardTitle>Privacy & Data</CardTitle>
                  <CardDescription>
                    Manage your privacy settings and data preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Collection</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="recommendation-data">Recommendation Data</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow us to collect data to improve your recommendations
                          </p>
                        </div>
                        <Switch id="recommendation-data" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="browsing-data">Browsing History</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow us to use your browsing history for better suggestions
                          </p>
                        </div>
                        <Switch id="browsing-data" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="third-party">Third-Party Sharing</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow sharing data with trusted partners for enhanced services
                          </p>
                        </div>
                        <Switch id="third-party" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Privacy Controls</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="profile-visibility">Profile Visibility</Label>
                          <p className="text-sm text-muted-foreground">
                            Make your profile visible to our recommendation system
                          </p>
                        </div>
                        <Switch id="profile-visibility" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="interest-visibility">Interest Visibility</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow us to use your interests for personalization
                          </p>
                        </div>
                        <Switch id="interest-visibility" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full sm:w-auto">Save Privacy Settings</Button>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when we notify you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="rec-emails">Recommendation Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new personalized recommendations
                          </p>
                        </div>
                        <Switch id="rec-emails" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="news-emails">News & Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive newsletter and platform updates
                          </p>
                        </div>
                        <Switch id="news-emails" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-emails">Marketing & Promotions</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive special offers and promotions
                          </p>
                        </div>
                        <Switch id="marketing-emails" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">In-App Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="new-rec-notifs">New Recommendations</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when new recommendations are ready
                          </p>
                        </div>
                        <Switch id="new-rec-notifs" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="insight-notifs">New Insights</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about new personalized insights
                          </p>
                        </div>
                        <Switch id="insight-notifs" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full sm:w-auto">Save Notification Settings</Button>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
