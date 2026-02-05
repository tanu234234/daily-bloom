import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, Crown, X } from 'lucide-react';

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  onSubscribe: () => void;
  trialDaysLeft: number;
}

const plans = [
  {
    name: 'Monthly',
    price: '$9.99',
    period: '/month',
    features: ['Full routine access', 'All diet plans', 'Progress tracking', 'Water reminders'],
    popular: false
  },
  {
    name: 'Quarterly',
    price: '$24.99',
    period: '/3 months',
    features: ['Everything in Monthly', 'Priority support', 'Custom meal plans', 'Save 17%'],
    popular: true
  }
];

export function SubscriptionModal({ open, onClose, onSubscribe, trialDaysLeft }: SubscriptionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border-0">
        {/* Header */}
        <div className="gradient-primary p-6 text-center">
          <div className="w-16 h-16 mx-auto bg-primary-foreground/20 rounded-2xl flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary-foreground mb-2">
            Upgrade to Premium
          </DialogTitle>
          {trialDaysLeft > 0 ? (
            <p className="text-primary-foreground/80">
              Your trial ends in {trialDaysLeft} days
            </p>
          ) : (
            <p className="text-primary-foreground/80">
              Your trial has ended
            </p>
          )}
        </div>

        {/* Plans */}
        <div className="p-6 space-y-4">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative p-4 rounded-2xl border-2 transition-all ${
                plan.popular 
                  ? 'border-primary bg-sage-light/30' 
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              
              <h4 className="font-semibold text-foreground mb-2">{plan.name}</h4>
              
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? 'wellness' : 'outline'} 
                className="w-full mt-4"
                onClick={onSubscribe}
              >
                Choose {plan.name}
              </Button>
            </div>
          ))}

          <button 
            onClick={onClose}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
