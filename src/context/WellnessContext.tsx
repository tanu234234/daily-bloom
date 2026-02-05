import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, DailyRoutine, DailyProgress, UserGoal } from '@/types/wellness';
import { generateRoutine } from '@/utils/routineGenerator';

interface WellnessContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  dailyRoutine: DailyRoutine | null;
  todayProgress: DailyProgress;
  updateProgress: (updates: Partial<DailyProgress>) => void;
  completedTasks: Set<string>;
  toggleTask: (taskId: string) => void;
  waterGlasses: number;
  addWater: () => void;
  resetWater: () => void;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  trialDaysLeft: number;
  currentDay: number;
  isSubscribed: boolean;
  setIsSubscribed: (value: boolean) => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export function WellnessProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('isOnboarded') === 'true';
  });

  const [dailyRoutine, setDailyRoutine] = useState<DailyRoutine | null>(null);
  
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedTasks');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [waterGlasses, setWaterGlasses] = useState(() => {
    const saved = localStorage.getItem('waterGlasses');
    return saved ? parseInt(saved) : 0;
  });

  const [isSubscribed, setIsSubscribed] = useState(() => {
    return localStorage.getItem('isSubscribed') === 'true';
  });

  const [trialStart] = useState(() => {
    const saved = localStorage.getItem('trialStart');
    return saved ? new Date(saved) : new Date();
  });

  const daysSinceStart = Math.floor((Date.now() - trialStart.getTime()) / (1000 * 60 * 60 * 24));
  const currentDay = Math.min(30, daysSinceStart + 1);
  const trialDaysLeft = Math.max(0, 30 - daysSinceStart);

  const todayProgress: DailyProgress = {
    date: new Date().toISOString().split('T')[0],
    tasksCompleted: completedTasks.size,
    totalTasks: dailyRoutine ? 
      dailyRoutine.morningHabits.length + 5 + dailyRoutine.eveningHabits.length : 10,
    waterGlasses,
    workoutDone: completedTasks.has('workout'),
    mealsFollowed: ['breakfast', 'lunch', 'dinner'].filter(m => completedTasks.has(m)).length
  };

  useEffect(() => {
    if (userProfile) {
      const routine = generateRoutine(userProfile);
      setDailyRoutine(routine);
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('isOnboarded', String(isOnboarded));
  }, [isOnboarded]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify([...completedTasks]));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('waterGlasses', String(waterGlasses));
  }, [waterGlasses]);

  useEffect(() => {
    if (!localStorage.getItem('trialStart')) {
      localStorage.setItem('trialStart', new Date().toISOString());
    }
  }, []);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    setIsOnboarded(true);
  };

  const updateProgress = (updates: Partial<DailyProgress>) => {
    // Progress is computed, but we can use this for other updates
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const addWater = () => {
    if (dailyRoutine && waterGlasses < dailyRoutine.waterIntake) {
      setWaterGlasses(prev => prev + 1);
    }
  };

  const resetWater = () => setWaterGlasses(0);

  return (
    <WellnessContext.Provider value={{
      userProfile,
      setUserProfile,
      dailyRoutine,
      todayProgress,
      updateProgress,
      completedTasks,
      toggleTask,
      waterGlasses,
      addWater,
      resetWater,
      isOnboarded,
      setIsOnboarded,
      trialDaysLeft,
      currentDay,
      isSubscribed,
      setIsSubscribed
    }}>
      {children}
    </WellnessContext.Provider>
  );
}

export function useWellness() {
  const context = useContext(WellnessContext);
  if (context === undefined) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
}
