import { UserProfile, DailyRoutine, UserGoal, RoutineItem, MealPlan, WorkoutPlan } from '@/types/wellness';

const ROUTINES_BY_GOAL: Record<UserGoal, {
  wakeUpTime: string;
  bedTime: string;
  waterIntake: number;
  morningDrink: string;
  workoutFocus: string;
}> = {
  'gain-weight': {
    wakeUpTime: '7:00 AM',
    bedTime: '10:30 PM',
    waterIntake: 10,
    morningDrink: 'Banana shake with honey and almonds',
    workoutFocus: 'Strength training'
  },
  'low-energy': {
    wakeUpTime: '6:00 AM',
    bedTime: '10:00 PM',
    waterIntake: 12,
    morningDrink: 'Warm lemon water with ginger',
    workoutFocus: 'Light cardio & stretching'
  },
  'motivation': {
    wakeUpTime: '5:30 AM',
    bedTime: '10:00 PM',
    waterIntake: 10,
    morningDrink: 'Green tea with honey',
    workoutFocus: 'High-intensity interval training'
  },
  'maintain': {
    wakeUpTime: '6:30 AM',
    bedTime: '10:30 PM',
    waterIntake: 8,
    morningDrink: 'Warm water with lemon',
    workoutFocus: 'Balanced workout'
  },
  'lifestyle': {
    wakeUpTime: '6:00 AM',
    bedTime: '10:00 PM',
    waterIntake: 10,
    morningDrink: 'Herbal tea or warm water',
    workoutFocus: 'Yoga & mindful movement'
  }
};

const MEAL_PLANS: Record<UserGoal, MealPlan> = {
  'gain-weight': {
    breakfast: {
      time: '8:00 AM',
      name: 'Power Breakfast',
      items: ['4 egg omelette with cheese', 'Whole grain toast with peanut butter', 'Banana smoothie', 'Handful of almonds'],
      calories: 800
    },
    morningSnack: {
      time: '10:30 AM',
      name: 'Calorie Boost',
      items: ['Greek yogurt with granola', 'Mixed nuts', 'Dried fruits'],
      calories: 350
    },
    lunch: {
      time: '1:00 PM',
      name: 'Hearty Lunch',
      items: ['Brown rice with dal', 'Grilled chicken/paneer', 'Mixed vegetables', 'Curd', 'Chapati'],
      calories: 900
    },
    eveningSnack: {
      time: '4:30 PM',
      name: 'Protein Snack',
      items: ['Protein shake', 'Peanut butter sandwich', 'Banana'],
      calories: 400
    },
    dinner: {
      time: '8:00 PM',
      name: 'Muscle Recovery',
      items: ['Whole wheat roti', 'Egg curry/Paneer', 'Brown rice', 'Mixed salad', 'Milk before bed'],
      calories: 750
    }
  },
  'low-energy': {
    breakfast: {
      time: '7:00 AM',
      name: 'Energy Boost Breakfast',
      items: ['Oatmeal with berries', 'Boiled eggs', 'Fresh orange juice', 'Green tea'],
      calories: 500
    },
    morningSnack: {
      time: '10:00 AM',
      name: 'Vitality Snack',
      items: ['Apple slices with almond butter', 'Green smoothie'],
      calories: 250
    },
    lunch: {
      time: '12:30 PM',
      name: 'Balanced Lunch',
      items: ['Quinoa salad', 'Grilled fish/tofu', 'Steamed vegetables', 'Lemon water'],
      calories: 600
    },
    eveningSnack: {
      time: '4:00 PM',
      name: 'Afternoon Pick-me-up',
      items: ['Trail mix', 'Coconut water', 'Dark chocolate (2 squares)'],
      calories: 200
    },
    dinner: {
      time: '7:30 PM',
      name: 'Light Dinner',
      items: ['Vegetable soup', 'Grilled chicken/paneer', 'Multigrain bread', 'Herbal tea'],
      calories: 500
    }
  },
  'motivation': {
    breakfast: {
      time: '6:30 AM',
      name: 'Warrior Breakfast',
      items: ['Protein pancakes', 'Scrambled eggs', 'Fresh fruits', 'Black coffee'],
      calories: 550
    },
    morningSnack: {
      time: '9:30 AM',
      name: 'Focus Fuel',
      items: ['Mixed nuts', 'Protein bar', 'Green tea'],
      calories: 300
    },
    lunch: {
      time: '12:00 PM',
      name: 'Power Lunch',
      items: ['Grilled chicken breast', 'Brown rice', 'Broccoli & spinach', 'Buttermilk'],
      calories: 650
    },
    eveningSnack: {
      time: '3:30 PM',
      name: 'Pre-workout Snack',
      items: ['Banana', 'Peanut butter', 'Coffee'],
      calories: 250
    },
    dinner: {
      time: '7:00 PM',
      name: 'Recovery Dinner',
      items: ['Salmon/Lentils', 'Sweet potato', 'Mixed greens', 'Chamomile tea'],
      calories: 550
    }
  },
  'maintain': {
    breakfast: {
      time: '7:30 AM',
      name: 'Balanced Breakfast',
      items: ['Whole grain cereal with milk', '2 eggs any style', 'Fresh fruit', 'Coffee/tea'],
      calories: 450
    },
    morningSnack: {
      time: '10:30 AM',
      name: 'Light Snack',
      items: ['Yogurt', 'Apple', 'Few almonds'],
      calories: 200
    },
    lunch: {
      time: '1:00 PM',
      name: 'Wholesome Lunch',
      items: ['Dal with rice', 'Roti', 'Mixed vegetables', 'Raita', 'Salad'],
      calories: 600
    },
    eveningSnack: {
      time: '4:30 PM',
      name: 'Evening Refresher',
      items: ['Sprouts chaat', 'Green tea', 'Roasted chana'],
      calories: 180
    },
    dinner: {
      time: '8:00 PM',
      name: 'Light Dinner',
      items: ['Chapati', 'Vegetable curry', 'Curd', 'Fruit'],
      calories: 450
    }
  },
  'lifestyle': {
    breakfast: {
      time: '7:00 AM',
      name: 'Mindful Morning',
      items: ['Overnight oats with chia seeds', 'Fresh berries', 'Herbal tea', 'Handful of walnuts'],
      calories: 400
    },
    morningSnack: {
      time: '10:00 AM',
      name: 'Nourishing Snack',
      items: ['Fresh fruit bowl', 'Coconut water'],
      calories: 150
    },
    lunch: {
      time: '12:30 PM',
      name: 'Buddha Bowl',
      items: ['Quinoa', 'Roasted vegetables', 'Hummus', 'Leafy greens', 'Tahini dressing'],
      calories: 550
    },
    eveningSnack: {
      time: '4:00 PM',
      name: 'Zen Snack',
      items: ['Dates with almond butter', 'Green smoothie'],
      calories: 200
    },
    dinner: {
      time: '7:00 PM',
      name: 'Healing Dinner',
      items: ['Miso soup', 'Steamed vegetables', 'Tofu/Fish', 'Brown rice', 'Golden milk before bed'],
      calories: 450
    }
  }
};

const WORKOUTS: Record<UserGoal, WorkoutPlan> = {
  'gain-weight': {
    time: '6:00 PM',
    name: 'Strength Training',
    duration: 60,
    exercises: [
      { name: 'Compound lifts (squats, deadlifts)', sets: 4, reps: 8 },
      { name: 'Bench press', sets: 4, reps: 10 },
      { name: 'Rows', sets: 3, reps: 12 },
      { name: 'Shoulder press', sets: 3, reps: 10 },
      { name: 'Core work', duration: 10 }
    ]
  },
  'low-energy': {
    time: '7:00 AM',
    name: 'Energizing Movement',
    duration: 30,
    exercises: [
      { name: 'Light stretching', duration: 5 },
      { name: 'Brisk walking', duration: 15 },
      { name: 'Yoga sun salutations', sets: 5 },
      { name: 'Deep breathing', duration: 5 }
    ]
  },
  'motivation': {
    time: '6:00 AM',
    name: 'HIIT Challenge',
    duration: 45,
    exercises: [
      { name: 'Burpees', sets: 4, reps: 15 },
      { name: 'Mountain climbers', sets: 4, reps: 30 },
      { name: 'Jump squats', sets: 4, reps: 20 },
      { name: 'Push-ups', sets: 4, reps: 15 },
      { name: 'Plank', duration: 3 }
    ]
  },
  'maintain': {
    time: '6:30 AM',
    name: 'Balanced Workout',
    duration: 45,
    exercises: [
      { name: 'Cardio warm-up', duration: 10 },
      { name: 'Full body circuit', sets: 3, reps: 12 },
      { name: 'Core exercises', duration: 10 },
      { name: 'Stretching', duration: 5 }
    ]
  },
  'lifestyle': {
    time: '6:30 AM',
    name: 'Mindful Yoga',
    duration: 45,
    exercises: [
      { name: 'Pranayama breathing', duration: 5 },
      { name: 'Surya Namaskar', sets: 10 },
      { name: 'Standing poses', duration: 15 },
      { name: 'Floor poses', duration: 10 },
      { name: 'Savasana meditation', duration: 10 }
    ]
  }
};

export function generateRoutine(profile: UserProfile): DailyRoutine {
  const goalConfig = ROUTINES_BY_GOAL[profile.goal];
  const mealPlan = MEAL_PLANS[profile.goal];
  const workout = WORKOUTS[profile.goal];

  // Adjust water intake based on activity level
  let waterIntake = goalConfig.waterIntake;
  if (profile.activityLevel === 'high') waterIntake += 2;
  if (profile.activityLevel === 'low') waterIntake -= 1;

  const morningHabits: RoutineItem[] = [
    {
      id: 'wake-up',
      time: goalConfig.wakeUpTime,
      title: 'Wake Up',
      description: 'Start your day fresh and energized',
      icon: '🌅'
    },
    {
      id: 'morning-drink',
      time: addMinutes(goalConfig.wakeUpTime, 10),
      title: 'Morning Drink',
      description: goalConfig.morningDrink,
      icon: '🥤'
    },
    {
      id: 'meditation',
      time: addMinutes(goalConfig.wakeUpTime, 20),
      title: 'Meditation',
      description: '10 minutes of mindfulness',
      icon: '🧘'
    },
    {
      id: 'morning-walk',
      time: addMinutes(goalConfig.wakeUpTime, 35),
      title: 'Morning Walk',
      description: '15-20 minute walk to boost circulation',
      icon: '🚶'
    }
  ];

  const eveningHabits: RoutineItem[] = [
    {
      id: 'evening-walk',
      time: '7:00 PM',
      title: 'Evening Walk',
      description: 'Light walk after dinner',
      icon: '🌙'
    },
    {
      id: 'screen-off',
      time: addMinutes(goalConfig.bedTime, -60),
      title: 'Screen Off',
      description: 'No screens before bed for better sleep',
      icon: '📵'
    },
    {
      id: 'night-routine',
      time: addMinutes(goalConfig.bedTime, -30),
      title: 'Night Routine',
      description: 'Prepare for restful sleep',
      icon: '🌜'
    },
    {
      id: 'sleep',
      time: goalConfig.bedTime,
      title: 'Sleep',
      description: 'Get 7-8 hours of quality rest',
      icon: '😴'
    }
  ];

  return {
    wakeUpTime: goalConfig.wakeUpTime,
    bedTime: goalConfig.bedTime,
    morningHabits,
    meals: mealPlan,
    workout,
    waterIntake,
    eveningHabits
  };
}

function addMinutes(time: string, minutes: number): string {
  const [timePart, period] = time.split(' ');
  const [hours, mins] = timePart.split(':').map(Number);
  
  let totalMinutes = hours * 60 + mins + minutes;
  if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
  if (period === 'AM' && hours === 12) totalMinutes -= 12 * 60;
  
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  const newPeriod = newHours >= 12 ? 'PM' : 'AM';
  const displayHours = newHours === 0 ? 12 : newHours > 12 ? newHours - 12 : newHours;
  
  return `${displayHours}:${newMins.toString().padStart(2, '0')} ${newPeriod}`;
}
