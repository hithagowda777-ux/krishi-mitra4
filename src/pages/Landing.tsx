import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sprout, 
  BarChart3, 
  MessageSquare, 
  Shield, 
  Users, 
  TrendingUp,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import heroImage from '@/assets/hero-farm.jpg';

export default function Landing() {
  const features = [
    {
      icon: Sprout,
      title: 'Crop Management',
      description: 'Track your crops from sowing to harvest with detailed insights and recommendations.',
    },
    {
      icon: TrendingUp,
      title: 'Market Prices',
      description: 'Real-time market prices for all crops across different mandis and states.',
    },
    {
      icon: MessageSquare,
      title: 'AI Assistant',
      description: 'Get personalized guidance on farming practices, pest control, and more.',
    },
    {
      icon: Shield,
      title: 'Insurance & Schemes',
      description: 'Access PM-KISAN, crop insurance, and other government schemes easily.',
    },
    {
      icon: BarChart3,
      title: 'Farm Analytics',
      description: 'Visualize your farm performance and make data-driven decisions.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with other farmers and agricultural experts for advice.',
    },
  ];

  const benefits = [
    'Easy-to-use interface in multiple languages',
    'Real-time weather alerts and advisories',
    'Direct access to government schemes',
    'Expert AI recommendations for better yield',
    'Market price updates to maximize profits',
    'Complete farm record management',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 mb-8 animate-fade-in">
              <Sprout className="w-5 h-5 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Your Digital Farming Companion</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up leading-tight">
              Grow Smarter with{' '}
              <span className="text-accent">Krishi Sakshi</span>
            </h1>

            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Empowering farmers with AI-powered insights, real-time market prices, 
              and easy access to government schemes. Your complete farming assistant.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Start Free Today
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {[
                { value: '10K+', label: 'Active Farmers' },
                { value: '500+', label: 'Villages Covered' },
                { value: '₹2Cr+', label: 'Benefits Claimed' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary-foreground">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary-foreground/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to <span className="text-primary">Farm Better</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From crop planning to market analysis, get all the tools and information 
              you need in one simple app.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl glass-card hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why Farmers Love <span className="text-primary">Krishi Sakshi</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of farmers who are already benefiting from smarter 
                farming practices and better market access.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/signup">
                  <Button variant="hero" size="lg">
                    Join Now – It's Free
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-large">
                <img 
                  src={heroImage} 
                  alt="Happy farmers using Krishi Sakshi" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-large max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">+35%</div>
                    <div className="text-sm text-muted-foreground">Average Yield Increase</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Join Krishi Sakshi today and get access to all features absolutely free. 
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button variant="accent" size="xl">
                Create Free Account
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Already have an account?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sprout className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-background">Krishi Sakshi</span>
            </div>
            <div className="text-background/70 text-sm">
              © 2025 Krishi Sakshi. Empowering Indian Farmers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
