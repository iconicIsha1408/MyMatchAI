
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { User, InterestCategory, Interest } from "@/data/users";
import { Checkbox } from "@/components/ui/checkbox";

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(1, {
    message: "Last name must be at least 1 character.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().optional(),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  age: z.coerce.number().min(18, {
    message: "You must be at least 18 years old.",
  }).max(120, {
    message: "Age must be less than 120.",
  }),
  gender: z.string().optional(),
  occupation: z.string().min(1, {
    message: "Please enter your occupation.",
  }),
  location: z.string().min(1, {
    message: "Please enter your location.",
  }),
  interests: z.array(z.string()).optional(),
  socialMediaActivity: z.enum(["low", "medium", "high"]),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const allInterests: Record<string, Interest> = {
  homeLoan: {
    id: 'homeLoan',
    name: 'Home Loan',
    category: 'financial'
  },
  retirementSavings: {
    id: 'retirementSavings',
    name: 'Retirement Savings',
    category: 'financial'
  },
  etfs: {
    id: 'etfs',
    name: 'ETFs',
    category: 'financial'
  },
  budgetShopping: {
    id: 'budgetShopping',
    name: 'Budget Shopping',
    category: 'shopping'
  },
  dining: {
    id: 'dining',
    name: 'Dining',
    category: 'lifestyle'
  },
  mortgagePayments: {
    id: 'mortgagePayments',
    name: 'Mortgage Payments',
    category: 'financial'
  },
  sports: {
    id: 'sports',
    name: 'Sports',
    category: 'lifestyle'
  },
  travel: {
    id: 'travel',
    name: 'Travel',
    category: 'travel'
  },
  gadgets: {
    id: 'gadgets',
    name: 'Gadgets',
    category: 'technology'
  },
  discounts: {
    id: 'discounts',
    name: 'Discounts',
    category: 'shopping'
  },
  newArrivals: {
    id: 'newArrivals',
    name: 'New Arrivals',
    category: 'shopping'
  },
  travelCreditCards: {
    id: 'travelCreditCards',
    name: 'Travel Credit Cards',
    category: 'financial'
  },
  books: {
    id: 'books',
    name: 'Books',
    category: 'lifestyle'
  },
  meditation: {
    id: 'meditation',
    name: 'Meditation',
    category: 'health'
  },
  yoga: {
    id: 'yoga',
    name: 'Yoga',
    category: 'health'
  }
};

const interestsByCategory: Record<InterestCategory, Interest[]> = {
  financial: [
    allInterests.homeLoan,
    allInterests.retirementSavings,
    allInterests.etfs,
    allInterests.mortgagePayments,
    allInterests.travelCreditCards,
  ],
  lifestyle: [
    allInterests.dining,
    allInterests.sports,
    allInterests.books,
  ],
  shopping: [
    allInterests.budgetShopping,
    allInterests.discounts,
    allInterests.newArrivals,
  ],
  travel: [
    allInterests.travel,
  ],
  technology: [
    allInterests.gadgets,
  ],
  health: [
    allInterests.meditation,
    allInterests.yoga,
  ],
  entertainment: []
};

export function ProfileForm() {
  const { user, updateUserProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.bio || "",
      age: user?.age || 18,
      gender: user?.gender || "",
      occupation: user?.occupation || "",
      location: user?.location || "",
      interests: user?.interests.map(i => i.id) || [],
      socialMediaActivity: user?.socialMediaActivity || "medium",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    
    try {
      // Convert interests from string[] to Interest[] objects
      const updatedInterests = data.interests?.map(interestId => {
        return Object.values(allInterests).find(interest => interest.id === interestId);
      }).filter(Boolean) as Interest[];
      
      // Update user profile
      updateUserProfile({
        ...data,
        interests: updatedInterests,
      } as Partial<User>);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Non-binary">Non-binary</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="New York City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMediaActivity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Media Activity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-1 md:col-span-2">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Interests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(interestsByCategory).map(([category, interests]) => (
              interests.length > 0 && (
                <div key={category} className="space-y-2">
                  <h4 className="text-sm font-medium capitalize">{category}</h4>
                  <div className="space-y-2">
                    {interests.map((interest) => (
                      <FormField
                        key={interest.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={interest.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(interest.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value || [], interest.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== interest.id
                                          ) || []
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {interest.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Update profile"}
        </Button>
      </form>
    </Form>
  );
}
