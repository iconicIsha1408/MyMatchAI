import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, Sparkles, Zap, Gauge, ShieldCheck } from "lucide-react";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroImage = heroRef.current.querySelector(".hero-image") as HTMLElement;
        const heroContent = heroRef.current.querySelector(".hero-content") as HTMLElement;
        
        if (heroImage && heroContent) {
          // Parallax for the image
          heroImage.style.transform = `translateY(${scrollY * 0.2}px)`;
          
          // Fade out effect for the content as user scrolls
          heroContent.style.opacity = String(1 - scrollY * 0.003);
          heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Subtle animation for features on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      const featureElements = featuresRef.current.querySelectorAll(".feature-card");
      featureElements.forEach((element) => {
        element.classList.add("opacity-0");
        observer.observe(element);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen overflow-hidden flex items-center"
      >
        <div 
          className="hero-image absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop')",
            filter: "brightness(0.65)"
          }}
        ></div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="hero-content max-w-3xl text-white">
            <div className="inline-block bg-primary/80 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
              AI-Powered Recommendations
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Style, Your Way – Smart Picks, Just for You!
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Experience personalized recommendations tailored to your unique preferences, 
              powered by cutting-edge AI to discover products, services, and content you'll love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="rounded-full">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full text-white border-white hover:text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
            <ArrowRight className="h-5 w-5 text-white -rotate-90" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-24 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Personalization Reimagined</h2>
            <p className="text-lg text-muted-foreground">
              SuggestorX analyzes your preferences and behaviors to deliver a truly personalized experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Sparkles className="h-6 w-6 text-primary" />}
              title="AI-Powered Personalization"
              description="Our sophisticated algorithms learn your preferences to provide hyper-personalized recommendations."
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6 text-primary" />}
              title="Real-time Adaptation"
              description="Recommendations evolve with your changing interests and behaviors."
            />
            <FeatureCard 
              icon={<Gauge className="h-6 w-6 text-primary" />}
              title="Engagement Optimization"
              description="Discover content, products, and services tailored to maximize your engagement."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6 text-primary" />}
              title="Privacy First"
              description="Your data is secure with our privacy-centric approach to personalization."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Personalized Recommendations?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Create your account today and discover a world of recommendations tailored just for you.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="rounded-full">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                SuggestorX
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                AI-Powered Personalization Platform
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SuggestorX. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="feature-card glass-card p-6 rounded-xl hover-lift">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
