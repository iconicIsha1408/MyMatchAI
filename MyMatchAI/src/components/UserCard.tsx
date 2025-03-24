
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/data/users";
import { 
  MapPin, 
  Briefcase, 
  Activity,
  Heart,
  MessageSquare
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UserCardProps {
  user: User;
  className?: string;
}

const UserCard = ({ user, className = "" }: UserCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getSocialActivityColor = (activity: string) => {
    switch(activity) {
      case 'high': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'low': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="h-28 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      <CardContent className="pt-0 relative">
        <div className="flex justify-between">
          <div className="-mt-12 mb-4">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage 
                src={user.avatar || "https://i.pravatar.cc/300"} 
                onLoad={() => setImageLoaded(true)}
                className={`${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              />
              <AvatarFallback className="text-xl">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-end gap-1 mt-2">
            <Badge variant="outline" className={`flex items-center gap-1 ${getSocialActivityColor(user.socialMediaActivity)}`}>
              <MessageSquare className="h-3 w-3" />
              {user.socialMediaActivity.charAt(0).toUpperCase() + user.socialMediaActivity.slice(1)} Activity
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Briefcase className="h-4 w-4" />
              <span>{user.occupation}</span>
            </div>
          </div>

          <div className="text-sm">{user.bio}</div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Activity className="h-4 w-4 text-blue-500" />
                <span>Engagement Score</span>
              </div>
              <span className="text-sm font-medium">{user.engagementScore}%</span>
            </div>
            <Progress value={user.engagementScore} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Sentiment Score</span>
              </div>
              <span className="text-sm font-medium">{user.sentimentScore}/10</span>
            </div>
            <Progress value={user.sentimentScore * 10} className="h-2" />
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Top Interests</div>
            <div className="flex flex-wrap gap-1">
              {user.interests.slice(0, 5).map((interest) => (
                <Badge key={interest.id} variant="secondary" className="text-xs">
                  {interest.name}
                </Badge>
              ))}
              {user.interests.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{user.interests.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
