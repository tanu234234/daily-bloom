import { useState, useEffect } from 'react';
import { useWellness } from '@/context/WellnessContext';
import { GOAL_INFO } from '@/types/wellness';
import { ProgressRing } from './ProgressRing';
import { WaterTracker } from './WaterTracker';
import { TodayRoutine } from './TodayRoutine';
import { DietSection } from './DietSection';
import { WeeklyProgress } from './WeeklyProgress';
import { DayProgress } from './DayProgress';
import { SubscriptionModal } from './SubscriptionModal';
import { Button } from '@/components/ui/button';
import { Settings, Crown, Calendar, Utensils, Activity, Home, Sparkles } from 'lucide-react';

type Tab = 'home' | 'routine' | 'diet' | 'progress';

export function Dashboard() {
  const { 
    userProfile, 
    todayProgress, 
    trialDaysLeft, 
    currentDay,
    isSubscribed,
    setIsSubscribed 
  } = useWellness();
  
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showSubscription, setShowSubscription] = useState(false);

  // Show subscription modal after Day 30
  useEffect(() => {
    if (currentDay >= 30 && !isSubscribed) {
      setShowSubscription(true);
    }
  }, [currentDay, isSubscribed]);

  if (!userProfile) return null;

  const goalInfo = GOAL_INFO[userProfile.goal];
  const progressPercentage = Math.round(
    (todayProgress.tasksCompleted / todayProgress.totalTasks) * 100
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const tabs = [
    { id: 'home' as Tab, icon: Home, label: 'Home' },
    { id: 'routine' as Tab, icon: Calendar, label: 'Routine' },
    { id: 'diet' as Tab, icon: Utensils, label: 'Diet' },
    { id: 'progress' as Tab, icon: Activity, label: 'Progress' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 pb-24">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-50" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative max-w-lg mx-auto px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-muted-foreground flex items-center gap-1">
                {getGreeting()}
                <Sparkles className="w-4 h-4 text-primary" />
              </p>
              <h1 className="text-2xl font-bold text-foreground">{userProfile.name}</h1>
            </div>
            <div className="flex gap-2">
              {!isSubscribed && (
                <Button 
                  variant="soft" 
                  size="icon"
                  onClick={() => setShowSubscription(true)}
                  className="relative animate-pulse-soft"
                >
                  <Crown className="w-5 h-5" />
                  {trialDaysLeft <= 7 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-soft-coral text-white text-xs rounded-full flex items-center justify-center">
                      {trialDaysLeft}
                    </span>
                  )}
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Day Progress Hero Card */}
          <DayProgress />
        </div>
      </div>

      {/* Stats Row */}
      <div className="max-w-lg mx-auto px-6 -mt-2">
        <div className="grid grid-cols-3 gap-3">
          <div className="wellness-card text-center py-4">
            <div className="text-2xl font-bold text-primary">{progressPercentage}%</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </div>
          <div className="wellness-card text-center py-4">
            <div className="text-2xl font-bold text-foreground">{todayProgress.tasksCompleted}</div>
            <div className="text-xs text-muted-foreground">Tasks Done</div>
          </div>
          <div className="wellness-card text-center py-4">
            <div className="text-2xl">{goalInfo.icon}</div>
            <div className="text-xs text-muted-foreground truncate px-1">{goalInfo.label}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {activeTab === 'home' && (
          <>
            <WaterTracker />
            <TodayRoutine />
          </>
        )}
        
        {activeTab === 'routine' && <TodayRoutine />}
        
        {activeTab === 'diet' && <DietSection />}
        
        {activeTab === 'progress' && <WeeklyProgress />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border/50">
        <div className="max-w-lg mx-auto px-6 py-3">
          <div className="flex justify-around">
            {tabs.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-300 ${
                  activeTab === id 
                    ? 'text-primary-foreground bg-primary shadow-md scale-105' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal 
        open={showSubscription}
        onClose={() => setShowSubscription(false)}
        onSubscribe={() => {
          setIsSubscribed(true);
          setShowSubscription(false);
        }}
        trialDaysLeft={trialDaysLeft}
        isTrialEnded={currentDay >= 30}
      />
    </div>
  );
}
