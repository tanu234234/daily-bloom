import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Zap } from 'lucide-react';

interface OnboardingWelcomeProps {
  onStart: () => void;
}

export function OnboardingWelcome({ onStart }: OnboardingWelcomeProps) {
  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center animate-fade-in">
        {/* Logo/Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto gradient-primary rounded-3xl flex items-center justify-center shadow-wellness-lg animate-float">
            <Sparkles className="w-12 h-12 text-primary-foreground" />
          </div>
          <div className="absolute -right-2 top-0 w-8 h-8 bg-soft-coral rounded-full flex items-center justify-center shadow-wellness-sm">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -left-2 bottom-0 w-8 h-8 bg-soft-blue rounded-full flex items-center justify-center shadow-wellness-sm">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to <span className="text-gradient">Wellness</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Your personal guide to a healthier, more balanced life. 
          Let's create a routine that works for you.
        </p>

        {/* Features */}
        <div className="space-y-4 mb-10">
          {[
            { icon: '🌅', text: 'Personalized daily routines' },
            { icon: '🥗', text: 'Customized diet plans' },
            { icon: '💪', text: 'Workout recommendations' },
            { icon: '📊', text: 'Track your progress' }
          ].map((feature, i) => (
            <div 
              key={i}
              className="flex items-center gap-3 wellness-card py-3 px-4 animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-foreground font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button 
          variant="wellness" 
          size="xl" 
          onClick={onStart}
          className="w-full group"
        >
          Get Started
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>

        {/* Trial info */}
        <p className="text-sm text-muted-foreground mt-4">
          🎁 Start your 30-day free trial today
        </p>
      </div>
    </div>
  );
}
