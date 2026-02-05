import { useWellness } from '@/context/WellnessContext';
import { Apple, Coffee, ChefHat } from 'lucide-react';

export function DietSection() {
  const { dailyRoutine } = useWellness();

  if (!dailyRoutine) return null;

  const meals = [
    { key: 'breakfast', meal: dailyRoutine.meals.breakfast, icon: '🍳', color: 'bg-golden/20 text-golden' },
    { key: 'morningSnack', meal: dailyRoutine.meals.morningSnack, icon: '🍎', color: 'bg-soft-coral/20 text-soft-coral' },
    { key: 'lunch', meal: dailyRoutine.meals.lunch, icon: '🥗', color: 'bg-primary/20 text-primary' },
    { key: 'eveningSnack', meal: dailyRoutine.meals.eveningSnack, icon: '🥜', color: 'bg-warm-beige text-foreground' },
    { key: 'dinner', meal: dailyRoutine.meals.dinner, icon: '🍽️', color: 'bg-soft-purple/20 text-soft-purple' },
  ];

  return (
    <div className="wellness-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <ChefHat className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-lg">Today's Diet</h3>
          <p className="text-sm text-muted-foreground">Balanced nutrition for your goal</p>
        </div>
      </div>

      <div className="space-y-4">
        {meals.map(({ key, meal, icon, color }) => (
          <div key={key} className="p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                <span className="text-lg">{icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{meal.name}</h4>
                  <span className="text-xs text-muted-foreground">{meal.time}</span>
                </div>
                {meal.calories && (
                  <span className="text-xs text-primary font-medium">{meal.calories} cal</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {meal.items.map((item, i) => (
                <span 
                  key={i}
                  className="text-xs bg-card px-2 py-1 rounded-lg text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
