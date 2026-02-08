import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, DailyRoutine, DailyProgress, CheatDay, MAX_CHEAT_DAYS_PER_MONTH } from '@/types/wellness';
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
  // Cheat days
  cheatDaysUsed: CheatDay[];
  cheatDaysRemaining: number;
  useCheatDay: (reason?: string) => boolean;
  isCheatDayToday: boolean;
  // Meal swapping
  swappedMeals: Record<string, number>; // mealKey -> alternativeIndex
  swapMeal: (mealKey: string, alternativeIndex: number) => void;
  resetMealSwap: (mealKey: string) => void;
  // Pending tasks for non-skippable logic
  pendingRequiredTasks: string[];
  canProceedToNext: (currentTaskId: string) => boolean;
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
    const today = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem('completedTasksDate');
    // Reset tasks if it's a new day
    if (savedDate !== today) {
      localStorage.setItem('completedTasksDate', today);
      return new Set();
    }
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [waterGlasses, setWaterGlasses] = useState(() => {
    const saved = localStorage.getItem('waterGlasses');
    const today = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem('waterGlassesDate');
    if (savedDate !== today) {
      localStorage.setItem('waterGlassesDate', today);
      return 0;
    }
    return saved ? parseInt(saved) : 0;
  });

  const [isSubscribed, setIsSubscribed] = useState(() => {
    return localStorage.getItem('isSubscribed') === 'true';
  });

  const [trialStart] = useState(() => {
    const saved = localStorage.getItem('trialStart');
    return saved ? new Date(saved) : new Date();
  });

  // Cheat days management
  const [cheatDaysUsed, setCheatDaysUsed] = useState<CheatDay[]>(() => {
    const saved = localStorage.getItem('cheatDaysUsed');
    return saved ? JSON.parse(saved) : [];
  });

  // Meal swapping
  const [swappedMeals, setSwappedMeals] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('swappedMeals');
    const today = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem('swappedMealsDate');
    if (savedDate !== today) {
      localStorage.setItem('swappedMealsDate', today);
      return {};
    }
    return saved ? JSON.parse(saved) : {};
  });

  const daysSinceStart = Math.floor((Date.now() - trialStart.getTime()) / (1000 * 60 * 60 * 24));
  const currentDay = Math.min(30, daysSinceStart + 1);
  const trialDaysLeft = Math.max(0, 30 - daysSinceStart);

  // Calculate cheat days remaining for current month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const cheatDaysThisMonth = cheatDaysUsed.filter(cd => {
    const date = new Date(cd.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  const cheatDaysRemaining = MAX_CHEAT_DAYS_PER_MONTH - cheatDaysThisMonth.length;

  const today = new Date().toISOString().split('T')[0];
  const isCheatDayToday = cheatDaysUsed.some(cd => cd.date === today);

  const todayProgress: DailyProgress = {
    date: new Date().toISOString().split('T')[0],
    tasksCompleted: completedTasks.size,
    totalTasks: dailyRoutine ? 
      dailyRoutine.morningHabits.length + 5 + dailyRoutine.eveningHabits.length : 10,
    waterGlasses,
    workoutDone: completedTasks.has('workout'),
    mealsFollowed: ['breakfast', 'lunch', 'dinner'].filter(m => completedTasks.has(m)).length
  };

  // Get pending required tasks (tasks that must be done before others)
  const getPendingRequiredTasks = (): string[] => {
    if (!dailyRoutine) return [];
    
    const allItems = [
      ...dailyRoutine.morningHabits,
      { id: 'breakfast', required: true },
      { id: 'workout', required: true },
      { id: 'lunch', required: true },
      { id: 'dinner', required: true },
      ...dailyRoutine.eveningHabits
    ];

    const pendingRequired: string[] = [];
    for (const item of allItems) {
      if (item.required && !completedTasks.has(item.id)) {
        pendingRequired.push(item.id);
      }
    }
    return pendingRequired;
  };

  const pendingRequiredTasks = getPendingRequiredTasks();

  // Check if user can proceed to next task
  const canProceedToNext = (currentTaskId: string): boolean => {
    if (isCheatDayToday) return true; // Cheat day allows skipping
    
    if (!dailyRoutine) return true;
    
    const allItems = [
      ...dailyRoutine.morningHabits,
      { id: 'breakfast', required: true },
      { id: 'workout', required: true },
      { id: 'lunch', required: true },
      { id: 'dinner', required: true },
      ...dailyRoutine.eveningHabits
    ];

    const currentIndex = allItems.findIndex(item => item.id === currentTaskId);
    
    // Check if all previous required tasks are completed
    for (let i = 0; i < currentIndex; i++) {
      const item = allItems[i];
      if (item.required && !completedTasks.has(item.id)) {
        return false;
      }
    }
    return true;
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
    localStorage.setItem('completedTasksDate', new Date().toISOString().split('T')[0]);
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('waterGlasses', String(waterGlasses));
    localStorage.setItem('waterGlassesDate', new Date().toISOString().split('T')[0]);
  }, [waterGlasses]);

  useEffect(() => {
    if (!localStorage.getItem('trialStart')) {
      localStorage.setItem('trialStart', new Date().toISOString());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cheatDaysUsed', JSON.stringify(cheatDaysUsed));
  }, [cheatDaysUsed]);

  useEffect(() => {
    localStorage.setItem('swappedMeals', JSON.stringify(swappedMeals));
    localStorage.setItem('swappedMealsDate', new Date().toISOString().split('T')[0]);
  }, [swappedMeals]);

  useEffect(() => {
    localStorage.setItem('isSubscribed', String(isSubscribed));
  }, [isSubscribed]);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    setIsOnboarded(true);
  };

  const updateProgress = (updates: Partial<DailyProgress>) => {
    // Progress is computed, but we can use this for other updates
  };

  const toggleTask = (taskId: string) => {
    // Check if previous required tasks are completed (unless it's a cheat day)
    if (!isCheatDayToday && !canProceedToNext(taskId) && !completedTasks.has(taskId)) {
      return; // Can't complete this task yet
    }

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

  const useCheatDay = (reason?: string): boolean => {
    if (cheatDaysRemaining <= 0) return false;
    if (isCheatDayToday) return false; // Already used today

    const newCheatDay: CheatDay = {
      date: today,
      reason
    };
    setCheatDaysUsed(prev => [...prev, newCheatDay]);
    return true;
  };

  const swapMeal = (mealKey: string, alternativeIndex: number) => {
    setSwappedMeals(prev => ({
      ...prev,
      [mealKey]: alternativeIndex
    }));
  };

  const resetMealSwap = (mealKey: string) => {
    setSwappedMeals(prev => {
      const newSwapped = { ...prev };
      delete newSwapped[mealKey];
      return newSwapped;
    });
  };

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
      setIsSubscribed,
      cheatDaysUsed,
      cheatDaysRemaining,
      useCheatDay,
      isCheatDayToday,
      swappedMeals,
      swapMeal,
      resetMealSwap,
      pendingRequiredTasks,
      canProceedToNext
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
