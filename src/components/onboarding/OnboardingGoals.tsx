import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Target } from 'lucide-react';
import { UserGoal, GOAL_INFO } from '@/types/wellness';

interface OnboardingGoalsProps {
  onComplete: (goal: UserGoal) => void;
  onBack: () => void;
}

export function OnboardingGoals({ onComplete, onBack }: OnboardingGoalsProps) {
  const [selectedGoal, setSelectedGoal] = useState<UserGoal | null>(null);

  const goals: UserGoal[] = ['gain-weight', 'low-energy', 'motivation', 'maintain', 'lifestyle'];

  return (
    <div className="min-h-screen gradient-hero p-6">
      <div className="max-w-md mx-auto pt-8">
        {/* Back button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 mx-auto bg-sage-light rounded-2xl flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">What's your main goal?</h2>
          <p className="text-muted-foreground">We'll customize your routine based on this</p>
        </div>

        {/* Goals */}
        <div className="space-y-3 animate-slide-up">
          {goals.map((goal, index) => {
            const info = GOAL_INFO[goal];
            const isSelected = selectedGoal === goal;
            
            return (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-start gap-4 ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-wellness-md scale-[1.02]'
                    : 'wellness-card hover:shadow-wellness-md hover:-translate-y-0.5'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'bg-primary-foreground/20' : 'bg-sage-light'
                }`}>
                  <span className="text-2xl">{info.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
                      {info.label}
                    </h3>
                    {isSelected && (
                      <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {info.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <Button 
          variant="wellness" 
          size="lg" 
          onClick={() => selectedGoal && onComplete(selectedGoal)}
          disabled={!selectedGoal}
          className="w-full mt-8"
        >
          Create My Routine
        </Button>
      </div>
    </div>
  );
}
