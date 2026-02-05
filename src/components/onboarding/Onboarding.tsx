import { useState } from 'react';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingDetails } from './OnboardingDetails';
import { OnboardingGoals } from './OnboardingGoals';
import { useWellness } from '@/context/WellnessContext';
import { UserGoal, UserProfile } from '@/types/wellness';

type Step = 'welcome' | 'details' | 'goals';

export function Onboarding() {
  const [step, setStep] = useState<Step>('welcome');
  const [partialProfile, setPartialProfile] = useState<Partial<UserProfile>>({});
  const { setUserProfile } = useWellness();

  const handleDetailsComplete = (data: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    height: number;
    weight: number;
    activityLevel: 'low' | 'medium' | 'high';
  }) => {
    setPartialProfile(data);
    setStep('goals');
  };

  const handleGoalComplete = (goal: UserGoal) => {
    const fullProfile: UserProfile = {
      ...partialProfile as Omit<UserProfile, 'goal'>,
      goal
    };
    setUserProfile(fullProfile);
  };

  return (
    <>
      {step === 'welcome' && (
        <OnboardingWelcome onStart={() => setStep('details')} />
      )}
      {step === 'details' && (
        <OnboardingDetails 
          onNext={handleDetailsComplete}
          onBack={() => setStep('welcome')}
        />
      )}
      {step === 'goals' && (
        <OnboardingGoals 
          onComplete={handleGoalComplete}
          onBack={() => setStep('details')}
        />
      )}
    </>
  );
}
