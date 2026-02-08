export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'low' | 'medium' | 'high';
  goal: UserGoal;
}

export type UserGoal = 
  | 'gain-weight'
  | 'low-energy'
  | 'motivation'
  | 'lose-weight'
  | 'maintain'
  | 'lifestyle';

export interface DailyRoutine {
  wakeUpTime: string;
  bedTime: string;
  morningHabits: RoutineItem[];
  meals: MealPlan;
  workout: WorkoutPlan;
  waterIntake: number; // glasses
  eveningHabits: RoutineItem[];
}

export interface RoutineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: string;
  completed?: boolean;
  required?: boolean; // non-skippable tasks
}

export interface MealPlan {
  breakfast: Meal;
  morningSnack: Meal;
  lunch: Meal;
  eveningSnack: Meal;
  dinner: Meal;
}

export interface Meal {
  time: string;
  name: string;
  items: string[];
  alternatives?: MealAlternative[]; // Alternative dish options
  calories?: number;
}

export interface MealAlternative {
  name: string;
  items: string[];
  calories?: number;
}

export interface WorkoutPlan {
  time: string;
  name: string;
  duration: number; // minutes
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  duration?: number;
}

export interface DailyProgress {
  date: string;
  tasksCompleted: number;
  totalTasks: number;
  waterGlasses: number;
  workoutDone: boolean;
  mealsFollowed: number;
}

export interface WeeklyProgress {
  week: number;
  days: DailyProgress[];
  overallScore: number;
}

export interface CheatDay {
  date: string;
  reason?: string;
}

export const MAX_CHEAT_DAYS_PER_MONTH = 2;

export const GOAL_INFO: Record<UserGoal, { label: string; description: string; icon: string }> = {
  'gain-weight': {
    label: 'Gain Weight',
    description: 'Build healthy muscle mass and increase body weight naturally',
    icon: '💪'
  },
  'low-energy': {
    label: 'Boost Energy',
    description: 'Combat fatigue and feel energized throughout the day',
    icon: '⚡'
  },
  'motivation': {
    label: 'Stay Motivated',
    description: 'Build discipline and overcome laziness with structured habits',
    icon: '🔥'
  },
  'lose-weight': {
    label: 'Lose Weight',
    description: 'Shed excess weight with healthy eating and exercise',
    icon: '🏃'
  },
  'maintain': {
    label: 'Maintain Fitness',
    description: 'Keep your current fitness level with balanced routines',
    icon: '⚖️'
  },
  'lifestyle': {
    label: 'Better Lifestyle',
    description: 'Improve overall wellness with healthy daily habits',
    icon: '🌟'
  }
};
