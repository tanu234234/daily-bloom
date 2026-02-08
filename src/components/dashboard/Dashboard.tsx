import { useState } from 'react';
import { useWellness } from '@/context/WellnessContext';
import { GOAL_INFO } from '@/types/wellness';
import { WaterTracker } from './WaterTracker';
import { TodayRoutine } from './TodayRoutine';
import { DietSection } from './DietSection';
import { WeeklyProgress } from './WeeklyProgress';
import { DayProgress } from './DayProgress';
import { SubscriptionModal } from './SubscriptionModal';
import { CheatDayCard } from './CheatDayCard';
import { HealbeeChat } from './HealbeeChat';
import { Button } from '@/components/ui/button';
import { Settings, Crown, Calendar, Utensils, Activity, Home, MessageCircle, Sparkles } from 'lucide-react';

type Tab = 'home' | 'routine' | 'diet' | 'progress' | 'chat';

export function Dashboard() {
  const { 
    userProfile, 
    todayProgress, 
    trialDaysLeft, 
    currentDay,
    isSubscribed,
    setIsSubscribed,
    isCheatDayToday
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
    { id: 'chat' as Tab, icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-honey-light/30 via-background to-background pb-24">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-20 left-0 w-32 h-32 bg-peach/30 rounded-full blur-2xl -translate-x-1/2" />
        
        <div className="relative max-w-lg mx-auto px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-bee flex items-center justify-center shadow-md animate-bounce-soft">
                <span className="text-2xl">🐝</span>
              </div>
              <div>
                <p className="text-muted-foreground flex items-center gap-1 text-sm">
                  {getGreeting()}
                  <Sparkles className="w-3 h-3 text-primary" />
                </p>
                <h1 className="text-xl font-bold text-foreground">{userProfile.name}</h1>
              </div>
            </div>
            <div className="flex gap-2">
              {!isSubscribed && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowSubscription(true)}
                  className="relative bg-primary/10 hover:bg-primary/20 rounded-full"
                >
                  <Crown className="w-5 h-5 text-primary" />
                  {trialDaysLeft <= 7 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {trialDaysLeft}
                    </span>
                  )}
                </Button>
              )}
              <Button variant="ghost" size="icon" className="rounded-full">
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
          <div className="healbee-card text-center py-4">
            <div className="text-2xl font-bold text-primary">{progressPercentage}%</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </div>
          <div className="healbee-card text-center py-4">
            <div className="text-2xl font-bold text-foreground">{todayProgress.tasksCompleted}</div>
            <div className="text-xs text-muted-foreground">Tasks Done</div>
          </div>
          <div className="healbee-card text-center py-4">
            <div className="text-2xl">{goalInfo.icon}</div>
            <div className="text-xs text-muted-foreground truncate px-1">{goalInfo.label}</div>
          </div>
        </div>
      </div>

      {/* Cheat Day Banner */}
      {isCheatDayToday && (
        <div className="max-w-lg mx-auto px-6 mt-4">
          <div className="bg-primary/20 border border-primary/30 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">🍕</span>
            <div>
              <p className="font-semibold text-foreground text-sm">Cheat Day Active!</p>
              <p className="text-xs text-muted-foreground">Enjoy your day, routines are flexible today</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {activeTab === 'home' && (
          <>
            <CheatDayCard />
            <WaterTracker />
            <TodayRoutine />
          </>
        )}
        
        {activeTab === 'routine' && <TodayRoutine />}
        
        {activeTab === 'diet' && <DietSection />}
        
        {activeTab === 'progress' && <WeeklyProgress />}

        {activeTab === 'chat' && <HealbeeChat />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border/50">
        <div className="max-w-lg mx-auto px-4 py-2">
          <div className="flex justify-around">
            {tabs.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 ${
                  activeTab === id 
                    ? 'text-primary-foreground bg-primary shadow-md scale-105' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{label}</span>
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
