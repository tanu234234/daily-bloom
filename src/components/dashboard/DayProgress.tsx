import { useWellness } from '@/context/WellnessContext';
import { Sparkles, Flame, Target } from 'lucide-react';

export function DayProgress() {
  const { currentDay, trialDaysLeft } = useWellness();
  
  const motivationalQuotes = [
    "Every journey begins with a single step 🚀",
    "You're building unstoppable momentum! 💪",
    "Consistency is your superpower ⚡",
    "Small daily improvements lead to stunning results ✨",
    "You're stronger than you think 🔥",
    "Progress, not perfection 🌟",
    "Your future self will thank you 🙏",
    "One day at a time, one habit at a time 🌱"
  ];
  
  const quote = motivationalQuotes[currentDay % motivationalQuotes.length];
  
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-6 text-primary-foreground">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium opacity-90">Your Journey</span>
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{trialDaysLeft} days left</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">Day {currentDay}</span>
            <span className="text-xl opacity-70">/ 30</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(currentDay / 30) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs opacity-70">
            <span>Start</span>
            <span>Goal</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl p-3">
          <Target className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{quote}</p>
        </div>
      </div>
    </div>
  );
}
