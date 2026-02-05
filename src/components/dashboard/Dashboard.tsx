import { useState } from 'react';
import { useWellness } from '@/context/WellnessContext';
import { GOAL_INFO } from '@/types/wellness';
import { ProgressRing } from './ProgressRing';
import { WaterTracker } from './WaterTracker';
import { TodayRoutine } from './TodayRoutine';
import { DietSection } from './DietSection';
import { WeeklyProgress } from './WeeklyProgress';
import { SubscriptionModal } from './SubscriptionModal';
import { Button } from '@/components/ui/button';
import { Settings, Crown, Calendar, Utensils, Activity, Home } from 'lucide-react';

type Tab = 'home' | 'routine' | 'diet' | 'progress';

export function Dashboard() {
  const { 
    userProfile, 
    todayProgress, 
    trialDaysLeft, 
    isSubscribed,
    setIsSubscribed 
  } = useWellness();
  
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showSubscription, setShowSubscription] = useState(false);

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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-hero">
        <div className="max-w-lg mx-auto px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-muted-foreground">{getGreeting()}</p>
              <h1 className="text-2xl font-bold text-foreground">{userProfile.name}</h1>
            </div>
            <div className="flex gap-2">
              {!isSubscribed && (
                <Button 
                  variant="soft" 
                  size="icon"
                  onClick={() => setShowSubscription(true)}
                  className="relative"
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

          {/* Goal & Progress Card */}
          <div className="wellness-card flex items-center gap-6">
            <ProgressRing progress={progressPercentage} size={100}>
              <div className="text-center">
                <span className="text-2xl font-bold text-foreground">{progressPercentage}%</span>
                <p className="text-xs text-muted-foreground">Done</p>
              </div>
            </ProgressRing>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{goalInfo.icon}</span>
                <span className="font-semibold text-foreground">{goalInfo.label}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{goalInfo.description}</p>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-semibold text-foreground">{todayProgress.tasksCompleted}</span>
                  <span className="text-muted-foreground"> / {todayProgress.totalTasks} tasks</span>
                </div>
              </div>
            </div>
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
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-lg mx-auto px-6 py-3">
          <div className="flex justify-around">
            {tabs.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
                  activeTab === id 
                    ? 'text-primary bg-sage-light' 
                    : 'text-muted-foreground hover:text-foreground'
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
      />
    </div>
  );
}
