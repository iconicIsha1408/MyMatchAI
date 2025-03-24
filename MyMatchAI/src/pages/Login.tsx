
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";
import { getUserByEmail } from "@/data/users";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Check if user exists (demo data)
      const userExists = getUserByEmail(data.email);
      
      if (!userExists) {
        toast({
          title: "User not found",
          description: "Please check your email or try one of our demo accounts.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // Error is already handled in the login function
    } finally {
      setIsSubmitting(false);
    }
  };

  // For demo purposes - fill form with demo user data
  const fillDemoUser = (email: string) => {
    form.setValue("email", email);
    form.setValue("password", "demopassword");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          
          {/* Left Side - Image */}
          <div className="lg:w-1/2 relative overflow-hidden hidden lg:block">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1581092160607-9bd64359454c?q=80&w=1170&auto=format&fit=crop')",
                filter: "brightness(0.85)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/60 to-indigo-600/30 mix-blend-multiply" />
            </div>
            <div className="relative h-full flex flex-col justify-end p-12 text-white">
              <div className="max-w-md">
                <h2 className="text-3xl font-bold mb-4">Welcome to SuggestorX</h2>
                <p className="text-white/90 mb-8">
                  Sign in to experience personalized recommendations tailored to your unique preferences.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Side - Login Form */}
          <div className="lg:w-1/2 p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <p className="text-muted-foreground mt-2">
                  Enter your details below to access your account
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="johndoe@example.com" 
                            type="email" 
                            autoComplete="email" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="••••••••" 
                            type="password" 
                            autoComplete="current-password" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-muted-foreground">
                      Demo Accounts
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => fillDemoUser("isha@example.com")}
                  >
                    Isha Gupta (Software Engineer)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => fillDemoUser("nikitha@example.com")}
                  >
                    Nikitha M (Manager)
                  </Button>
                </div>
                
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <p>For demo purposes, any password will work with these accounts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
