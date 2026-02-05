import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, User } from 'lucide-react';

interface OnboardingDetailsProps {
  onNext: (data: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    height: number;
    weight: number;
    activityLevel: 'low' | 'medium' | 'high';
  }) => void;
  onBack: () => void;
}

export function OnboardingDetails({ onNext, onBack }: OnboardingDetailsProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<'low' | 'medium' | 'high' | ''>('');

  const isValid = name && age && gender && height && weight && activityLevel;

  const handleSubmit = () => {
    if (isValid) {
      onNext({
        name,
        age: parseInt(age),
        gender: gender as 'male' | 'female' | 'other',
        height: parseInt(height),
        weight: parseInt(weight),
        activityLevel: activityLevel as 'low' | 'medium' | 'high'
      });
    }
  };

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
            <User className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about yourself</h2>
          <p className="text-muted-foreground">This helps us create your personalized routine</p>
        </div>

        {/* Form */}
        <div className="space-y-6 animate-slide-up">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl border-border bg-card"
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age" className="text-foreground font-medium">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="h-12 rounded-xl border-border bg-card"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Gender</Label>
            <div className="grid grid-cols-3 gap-3">
              {(['male', 'female', 'other'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`h-12 rounded-xl font-medium transition-all duration-200 ${
                    gender === g
                      ? 'bg-primary text-primary-foreground shadow-wellness-sm'
                      : 'bg-card border border-border text-foreground hover:border-primary'
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height" className="text-foreground font-medium">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-12 rounded-xl border-border bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-foreground font-medium">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="65"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-12 rounded-xl border-border bg-card"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Activity Level</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'low', label: 'Low', emoji: '🚶' },
                { value: 'medium', label: 'Medium', emoji: '🏃' },
                { value: 'high', label: 'High', emoji: '🏋️' }
              ].map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActivityLevel(level.value as 'low' | 'medium' | 'high')}
                  className={`h-16 rounded-xl font-medium transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                    activityLevel === level.value
                      ? 'bg-primary text-primary-foreground shadow-wellness-sm'
                      : 'bg-card border border-border text-foreground hover:border-primary'
                  }`}
                >
                  <span className="text-xl">{level.emoji}</span>
                  <span className="text-sm">{level.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <Button 
            variant="wellness" 
            size="lg" 
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full mt-8 group"
          >
            Continue
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
