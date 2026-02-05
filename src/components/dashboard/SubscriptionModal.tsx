import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, Crown, Sparkles, Star, Zap } from 'lucide-react';

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  onSubscribe: () => void;
  trialDaysLeft: number;
  isTrialEnded?: boolean;
}

const plans = [
  {
    name: 'Monthly',
    price: '$9.99',
    period: '/month',
    features: ['Full routine access', 'All diet plans', 'Progress tracking', 'Water reminders'],
    popular: false,
    icon: Star
  },
  {
    name: 'Quarterly',
    price: '$24.99',
    period: '/3 months',
    features: ['Everything in Monthly', 'Priority support', 'Custom meal plans', 'Save 17%'],
    popular: true,
    icon: Zap
  }
];

export function SubscriptionModal({ open, onClose, onSubscribe, trialDaysLeft, isTrialEnded }: SubscriptionModalProps) {
  return (
    <Dialog open={open} onOpenChange={isTrialEnded ? undefined : onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border-0">
        {/* Header with animated gradient */}
        <div className="relative gradient-primary p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_50%)]" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto bg-primary-foreground/20 backdrop-blur rounded-2xl flex items-center justify-center mb-4 animate-float">
              <Crown className="w-10 h-10 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl font-bold text-primary-foreground mb-2">
              {isTrialEnded ? '🎉 You Completed 30 Days!' : 'Upgrade to Premium'}
            </DialogTitle>
            {isTrialEnded ? (
              <p className="text-primary-foreground/90">
                Amazing progress! Continue your journey with Premium
              </p>
            ) : trialDaysLeft > 0 ? (
              <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
                <Sparkles className="w-4 h-4" />
                <span>Your trial ends in {trialDaysLeft} days</span>
              </div>
            ) : (
              <p className="text-primary-foreground/80">
                Your trial has ended
              </p>
            )}
          </div>
        </div>

        {/* Plans */}
        <div className="p-6 space-y-4 bg-gradient-to-b from-card to-background">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                plan.popular 
                  ? 'border-primary bg-gradient-to-br from-primary/5 to-accent/10 shadow-lg' 
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-4 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </span>
              )}
              
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <plan.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{plan.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </div>
              </div>
              
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? 'wellness' : 'outline'} 
                className={`w-full ${plan.popular ? 'shadow-md' : ''}`}
                onClick={onSubscribe}
              >
                Choose {plan.name}
              </Button>
            </div>
          ))}

          {!isTrialEnded && (
            <button 
              onClick={onClose}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Maybe later
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
