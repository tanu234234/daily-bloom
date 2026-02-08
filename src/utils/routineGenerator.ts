import { UserProfile, DailyRoutine, UserGoal, RoutineItem, MealPlan, WorkoutPlan, MealAlternative, Meal } from '@/types/wellness';

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
  'lose-weight': {
    wakeUpTime: '6:00 AM',
    bedTime: '10:00 PM',
    waterIntake: 14,
    morningDrink: 'Warm water with lemon and apple cider vinegar',
    workoutFocus: 'Cardio & fat burning'
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

function createMealWithAlternatives(
  time: string,
  name: string,
  items: string[],
  calories: number,
  alternatives: MealAlternative[]
): Meal {
  return { time, name, items, calories, alternatives };
}

const MEAL_PLANS: Record<UserGoal, MealPlan> = {
  'gain-weight': {
    breakfast: createMealWithAlternatives(
      '8:00 AM',
      'Power Breakfast',
      ['4 egg omelette with cheese', 'Whole grain toast with peanut butter', 'Banana smoothie', 'Handful of almonds'],
      800,
      [
        { name: 'Protein Pancakes', items: ['Protein pancakes', 'Greek yogurt', 'Honey drizzle', 'Mixed berries'], calories: 750 },
        { name: 'Avocado Toast Deluxe', items: ['Avocado toast with eggs', 'Smoked salmon', 'Orange juice'], calories: 780 }
      ]
    ),
    morningSnack: createMealWithAlternatives(
      '10:30 AM',
      'Calorie Boost',
      ['Greek yogurt with granola', 'Mixed nuts', 'Dried fruits'],
      350,
      [
        { name: 'Protein Shake', items: ['Whey protein shake', 'Banana', 'Peanut butter'], calories: 400 },
        { name: 'Trail Mix Bowl', items: ['Trail mix', 'Dark chocolate chips', 'Coconut flakes'], calories: 380 }
      ]
    ),
    lunch: createMealWithAlternatives(
      '1:00 PM',
      'Hearty Lunch',
      ['Brown rice with dal', 'Grilled chicken/paneer', 'Mixed vegetables', 'Curd', 'Chapati'],
      900,
      [
        { name: 'Pasta Bowl', items: ['Whole wheat pasta', 'Creamy chicken alfredo', 'Garlic bread', 'Side salad'], calories: 950 },
        { name: 'Rice & Curry', items: ['Biryani', 'Raita', 'Kebabs', 'Naan bread'], calories: 920 }
      ]
    ),
    eveningSnack: createMealWithAlternatives(
      '4:30 PM',
      'Protein Snack',
      ['Protein shake', 'Peanut butter sandwich', 'Banana'],
      400,
      [
        { name: 'Smoothie Bowl', items: ['Acai smoothie bowl', 'Granola topping', 'Chia seeds'], calories: 420 },
        { name: 'Cheese & Crackers', items: ['Cheese slices', 'Whole grain crackers', 'Apple slices'], calories: 380 }
      ]
    ),
    dinner: createMealWithAlternatives(
      '8:00 PM',
      'Muscle Recovery',
      ['Whole wheat roti', 'Egg curry/Paneer', 'Brown rice', 'Mixed salad', 'Milk before bed'],
      750,
      [
        { name: 'Steak Dinner', items: ['Grilled steak', 'Mashed potatoes', 'Steamed broccoli', 'Gravy'], calories: 800 },
        { name: 'Salmon Plate', items: ['Baked salmon', 'Quinoa', 'Asparagus', 'Lemon butter sauce'], calories: 720 }
      ]
    )
  },
  'low-energy': {
    breakfast: createMealWithAlternatives(
      '7:00 AM',
      'Energy Boost Breakfast',
      ['Oatmeal with berries', 'Boiled eggs', 'Fresh orange juice', 'Green tea'],
      500,
      [
        { name: 'Smoothie Bowl', items: ['Açaí bowl', 'Banana', 'Granola', 'Honey drizzle'], calories: 480 },
        { name: 'Avocado Toast', items: ['Avocado on sourdough', 'Poached egg', 'Cherry tomatoes'], calories: 520 }
      ]
    ),
    morningSnack: createMealWithAlternatives(
      '10:00 AM',
      'Vitality Snack',
      ['Apple slices with almond butter', 'Green smoothie'],
      250,
      [
        { name: 'Energy Balls', items: ['Date energy balls', 'Herbal tea'], calories: 220 },
        { name: 'Fruit & Nuts', items: ['Mixed berries', 'Walnuts', 'Coconut water'], calories: 240 }
      ]
    ),
    lunch: createMealWithAlternatives(
      '12:30 PM',
      'Balanced Lunch',
      ['Quinoa salad', 'Grilled fish/tofu', 'Steamed vegetables', 'Lemon water'],
      600,
      [
        { name: 'Buddha Bowl', items: ['Brown rice', 'Chickpeas', 'Roasted veggies', 'Tahini dressing'], calories: 580 },
        { name: 'Mediterranean Plate', items: ['Falafel wrap', 'Hummus', 'Greek salad'], calories: 620 }
      ]
    ),
    eveningSnack: createMealWithAlternatives(
      '4:00 PM',
      'Afternoon Pick-me-up',
      ['Trail mix', 'Coconut water', 'Dark chocolate (2 squares)'],
      200,
      [
        { name: 'Yogurt Parfait', items: ['Greek yogurt', 'Honey', 'Almonds'], calories: 220 },
        { name: 'Fruit Salad', items: ['Fresh fruit mix', 'Lime juice', 'Mint'], calories: 180 }
      ]
    ),
    dinner: createMealWithAlternatives(
      '7:30 PM',
      'Light Dinner',
      ['Vegetable soup', 'Grilled chicken/paneer', 'Multigrain bread', 'Herbal tea'],
      500,
      [
        { name: 'Stir Fry', items: ['Vegetable stir fry', 'Tofu', 'Brown rice', 'Ginger tea'], calories: 480 },
        { name: 'Soup & Salad', items: ['Minestrone soup', 'Caesar salad', 'Garlic bread'], calories: 520 }
      ]
    )
  },
  'motivation': {
    breakfast: createMealWithAlternatives(
      '6:30 AM',
      'Warrior Breakfast',
      ['Protein pancakes', 'Scrambled eggs', 'Fresh fruits', 'Black coffee'],
      550,
      [
        { name: 'Power Oats', items: ['Steel-cut oats', 'Protein powder', 'Banana', 'Almonds'], calories: 520 },
        { name: 'Egg White Wrap', items: ['Egg white wrap', 'Spinach', 'Feta cheese', 'Salsa'], calories: 480 }
      ]
    ),
    morningSnack: createMealWithAlternatives(
      '9:30 AM',
      'Focus Fuel',
      ['Mixed nuts', 'Protein bar', 'Green tea'],
      300,
      [
        { name: 'Apple & PB', items: ['Apple slices', 'Peanut butter', 'Cinnamon'], calories: 280 },
        { name: 'Cheese Sticks', items: ['String cheese', 'Whole grain crackers'], calories: 260 }
      ]
    ),
    lunch: createMealWithAlternatives(
      '12:00 PM',
      'Power Lunch',
      ['Grilled chicken breast', 'Brown rice', 'Broccoli & spinach', 'Buttermilk'],
      650,
      [
        { name: 'Burrito Bowl', items: ['Chicken burrito bowl', 'Black beans', 'Guacamole', 'Salsa'], calories: 680 },
        { name: 'Salmon Salad', items: ['Grilled salmon', 'Mixed greens', 'Avocado', 'Olive oil dressing'], calories: 620 }
      ]
    ),
    eveningSnack: createMealWithAlternatives(
      '3:30 PM',
      'Pre-workout Snack',
      ['Banana', 'Peanut butter', 'Coffee'],
      250,
      [
        { name: 'Rice Cakes', items: ['Rice cakes', 'Almond butter', 'Honey'], calories: 230 },
        { name: 'Protein Shake', items: ['Whey protein', 'Almond milk', 'Ice'], calories: 200 }
      ]
    ),
    dinner: createMealWithAlternatives(
      '7:00 PM',
      'Recovery Dinner',
      ['Salmon/Lentils', 'Sweet potato', 'Mixed greens', 'Chamomile tea'],
      550,
      [
        { name: 'Turkey Bowl', items: ['Ground turkey', 'Quinoa', 'Roasted vegetables'], calories: 520 },
        { name: 'Shrimp Stir Fry', items: ['Shrimp', 'Mixed vegetables', 'Brown rice', 'Ginger sauce'], calories: 580 }
      ]
    )
  },
  'lose-weight': {
    breakfast: createMealWithAlternatives(
      '7:00 AM',
      'Light Start',
      ['Egg white omelette with veggies', 'Whole grain toast', 'Green tea', 'Grapefruit'],
      350,
      [
        { name: 'Smoothie', items: ['Green smoothie', 'Spinach', 'Berries', 'Flax seeds'], calories: 280 },
        { name: 'Overnight Oats', items: ['Low-fat overnight oats', 'Chia seeds', 'Berries'], calories: 320 }
      ]
    ),
    morningSnack: createMealWithAlternatives(
      '10:00 AM',
      'Healthy Bite',
      ['Cucumber sticks', 'Hummus', 'Green tea'],
      150,
      [
        { name: 'Fruit Cup', items: ['Mixed berries', 'Mint leaves'], calories: 120 },
        { name: 'Veggie Sticks', items: ['Carrot sticks', 'Celery', 'Light dip'], calories: 100 }
      ]
    ),
    lunch: createMealWithAlternatives(
      '12:30 PM',
      'Lean Lunch',
      ['Grilled chicken salad', 'Olive oil dressing', 'Lentil soup', 'Lemon water'],
      450,
      [
        { name: 'Poke Bowl', items: ['Salmon poke bowl', 'Cucumber', 'Edamame', 'Light soy sauce'], calories: 420 },
        { name: 'Veggie Wrap', items: ['Whole wheat wrap', 'Grilled vegetables', 'Feta cheese'], calories: 400 }
      ]
    ),
    eveningSnack: createMealWithAlternatives(
      '4:00 PM',
      'Light Snack',
      ['Apple slices', 'Cinnamon', 'Herbal tea'],
      100,
      [
        { name: 'Popcorn', items: ['Air-popped popcorn (no butter)'], calories: 90 },
        { name: 'Cottage Cheese', items: ['Low-fat cottage cheese', 'Cherry tomatoes'], calories: 110 }
      ]
    ),
    dinner: createMealWithAlternatives(
      '7:00 PM',
      'Light Dinner',
      ['Grilled fish', 'Steamed vegetables', 'Clear soup', 'Green tea'],
      400,
      [
        { name: 'Zucchini Noodles', items: ['Zucchini pasta', 'Marinara sauce', 'Grilled chicken'], calories: 380 },
        { name: 'Stuffed Peppers', items: ['Bell peppers', 'Lean ground turkey', 'Quinoa'], calories: 420 }
      ]
    )
  },
  'maintain': {
    breakfast: createMealWithAlternatives(
      '7:30 AM',
      'Balanced Breakfast',
      ['Whole grain cereal with milk', '2 eggs any style', 'Fresh fruit', 'Coffee/tea'],
      450,
      [
        { name: 'French Toast', items: ['Whole wheat French toast', 'Fresh berries', 'Maple syrup'], calories: 480 },
        { name: 'Breakfast Burrito', items: ['Egg burrito', 'Black beans', 'Salsa', 'Cheese'], calories: 500 }
      ]
    ),
    morningSnack: createMealWithAlternatives(
      '10:30 AM',
      'Light Snack',
      ['Yogurt', 'Apple', 'Few almonds'],
      200,
      [
        { name: 'Granola Bar', items: ['Oat granola bar', 'Green tea'], calories: 180 },
        { name: 'Cheese & Fruit', items: ['Cheese cubes', 'Grapes'], calories: 220 }
      ]
    ),
    lunch: createMealWithAlternatives(
      '1:00 PM',
      'Wholesome Lunch',
      ['Dal with rice', 'Roti', 'Mixed vegetables', 'Raita', 'Salad'],
      600,
      [
        { name: 'Sandwich Combo', items: ['Turkey sandwich', 'Side salad', 'Fruit cup'], calories: 580 },
        { name: 'Pasta Primavera', items: ['Whole wheat pasta', 'Grilled vegetables', 'Olive oil'], calories: 620 }
      ]
    ),
    eveningSnack: createMealWithAlternatives(
      '4:30 PM',
      'Evening Refresher',
      ['Sprouts chaat', 'Green tea', 'Roasted chana'],
      180,
      [
        { name: 'Smoothie', items: ['Mango smoothie', 'Chia seeds'], calories: 200 },
        { name: 'Nuts & Dates', items: ['Mixed nuts', 'Medjool dates'], calories: 220 }
      ]
    ),
    dinner: createMealWithAlternatives(
      '8:00 PM',
      'Balanced Dinner',
      ['Chapati', 'Vegetable curry', 'Curd', 'Fruit'],
      450,
      [
        { name: 'Grilled Plate', items: ['Grilled chicken', 'Roasted potatoes', 'Green beans'], calories: 480 },
        { name: 'Fish Tacos', items: ['Fish tacos', 'Cabbage slaw', 'Lime crema'], calories: 500 }
      ]
    )
  },
  'lifestyle': {
    breakfast: createMealWithAlternatives(
      '7:00 AM',
      'Mindful Morning',
      ['Overnight oats with chia seeds', 'Fresh berries', 'Herbal tea', 'Handful of walnuts'],
      400,
      [
        { name: 'Avocado Bowl', items: ['Avocado toast', 'Poached egg', 'Microgreens'], calories: 420 },
        { name: 'Smoothie Bowl', items: ['Açaí bowl', 'Coconut flakes', 'Honey', 'Banana'], calories: 380 }
      ]
    ),
    morningSnack: createMealWithAlternatives(
      '10:00 AM',
      'Nourishing Snack',
      ['Fresh fruit bowl', 'Coconut water'],
      150,
      [
        { name: 'Veggie Juice', items: ['Fresh vegetable juice', 'Ginger shot'], calories: 120 },
        { name: 'Nut Mix', items: ['Raw almonds', 'Dried apricots'], calories: 180 }
      ]
    ),
    lunch: createMealWithAlternatives(
      '12:30 PM',
      'Buddha Bowl',
      ['Quinoa', 'Roasted vegetables', 'Hummus', 'Leafy greens', 'Tahini dressing'],
      550,
      [
        { name: 'Mediterranean Bowl', items: ['Falafel', 'Tabbouleh', 'Tzatziki', 'Pita bread'], calories: 580 },
        { name: 'Asian Bowl', items: ['Brown rice', 'Edamame', 'Tofu', 'Miso dressing'], calories: 520 }
      ]
    ),
    eveningSnack: createMealWithAlternatives(
      '4:00 PM',
      'Zen Snack',
      ['Dates with almond butter', 'Green smoothie'],
      200,
      [
        { name: 'Hummus Plate', items: ['Hummus', 'Veggie sticks', 'Whole grain crackers'], calories: 220 },
        { name: 'Fruit & Cheese', items: ['Apple slices', 'Brie cheese', 'Honey'], calories: 240 }
      ]
    ),
    dinner: createMealWithAlternatives(
      '7:00 PM',
      'Healing Dinner',
      ['Miso soup', 'Steamed vegetables', 'Tofu/Fish', 'Brown rice', 'Golden milk before bed'],
      450,
      [
        { name: 'Veggie Stir Fry', items: ['Mixed vegetable stir fry', 'Cashews', 'Jasmine rice'], calories: 480 },
        { name: 'Soup Night', items: ['Lentil soup', 'Crusty bread', 'Side salad'], calories: 420 }
      ]
    )
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
  'lose-weight': {
    time: '6:30 AM',
    name: 'Fat Burning Cardio',
    duration: 50,
    exercises: [
      { name: 'Warm-up jog', duration: 5 },
      { name: 'High knees', sets: 4, reps: 30 },
      { name: 'Jumping jacks', sets: 4, reps: 40 },
      { name: 'Burpees', sets: 3, reps: 12 },
      { name: 'Mountain climbers', sets: 4, reps: 30 },
      { name: 'Cool-down stretching', duration: 10 }
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
      icon: '🌅',
      required: true
    },
    {
      id: 'morning-drink',
      time: addMinutes(goalConfig.wakeUpTime, 10),
      title: 'Morning Drink',
      description: goalConfig.morningDrink,
      icon: '🥤',
      required: true
    },
    {
      id: 'meditation',
      time: addMinutes(goalConfig.wakeUpTime, 20),
      title: 'Meditation',
      description: '10 minutes of mindfulness',
      icon: '🧘',
      required: true
    },
    {
      id: 'morning-walk',
      time: addMinutes(goalConfig.wakeUpTime, 35),
      title: 'Morning Walk',
      description: '15-20 minute walk to boost circulation',
      icon: '🚶',
      required: true
    }
  ];

  const eveningHabits: RoutineItem[] = [
    {
      id: 'evening-walk',
      time: '7:00 PM',
      title: 'Evening Walk',
      description: 'Light walk after dinner',
      icon: '🌙',
      required: false
    },
    {
      id: 'screen-off',
      time: addMinutes(goalConfig.bedTime, -60),
      title: 'Screen Off',
      description: 'No screens before bed for better sleep',
      icon: '📵',
      required: true
    },
    {
      id: 'night-routine',
      time: addMinutes(goalConfig.bedTime, -30),
      title: 'Night Routine',
      description: 'Prepare for restful sleep',
      icon: '🌜',
      required: true
    },
    {
      id: 'sleep',
      time: goalConfig.bedTime,
      title: 'Sleep',
      description: 'Get 7-8 hours of quality rest',
      icon: '😴',
      required: true
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
