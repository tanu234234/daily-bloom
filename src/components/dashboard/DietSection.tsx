import { useWellness } from '@/context/WellnessContext';
import { ChefHat, RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function DietSection() {
  const { dailyRoutine, swappedMeals, swapMeal, resetMealSwap, completedTasks, toggleTask } = useWellness();
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  if (!dailyRoutine) return null;

  const meals = [
    { key: 'breakfast', meal: dailyRoutine.meals.breakfast, icon: '🍳', color: 'bg-honey-light' },
    { key: 'morningSnack', meal: dailyRoutine.meals.morningSnack, icon: '🍎', color: 'bg-peach' },
    { key: 'lunch', meal: dailyRoutine.meals.lunch, icon: '🥗', color: 'bg-mint' },
    { key: 'eveningSnack', meal: dailyRoutine.meals.eveningSnack, icon: '🥜', color: 'bg-lavender' },
    { key: 'dinner', meal: dailyRoutine.meals.dinner, icon: '🍽️', color: 'bg-sky' },
  ];

  const getMealData = (key: string, meal: typeof meals[0]['meal']) => {
    const swapIndex = swappedMeals[key];
    if (swapIndex !== undefined && meal.alternatives && meal.alternatives[swapIndex]) {
      return meal.alternatives[swapIndex];
    }
    return { name: meal.name, items: meal.items, calories: meal.calories };
  };

  return (
    <div className="healbee-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 gradient-bee rounded-xl flex items-center justify-center">
          <ChefHat className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-lg">Today's Diet</h3>
          <p className="text-sm text-muted-foreground">Tap a meal to see alternatives</p>
        </div>
      </div>

      <div className="space-y-4">
        {meals.map(({ key, meal, icon, color }) => {
          const currentMeal = getMealData(key, meal);
          const hasAlternatives = meal.alternatives && meal.alternatives.length > 0;
          const isExpanded = expandedMeal === key;
          const isCompleted = completedTasks.has(key);
          const isSwapped = swappedMeals[key] !== undefined;

          return (
            <div key={key} className="space-y-2">
              <button
                onClick={() => setExpandedMeal(isExpanded ? null : key)}
                className={`w-full p-4 rounded-2xl text-left transition-all ${
                  isCompleted 
                    ? 'bg-mint/20 border-2 border-mint-dark/30' 
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <span className="text-2xl">{icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{currentMeal.name}</h4>
                        {isSwapped && (
                          <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                            Swapped
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{meal.time}</span>
                    </div>
                    {currentMeal.calories && (
                      <span className="text-xs text-primary font-semibold">{currentMeal.calories} cal</span>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {currentMeal.items.slice(0, 3).map((item, i) => (
                        <span 
                          key={i}
                          className="text-xs bg-card px-2 py-1 rounded-lg text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                      {currentMeal.items.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{currentMeal.items.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  {hasAlternatives && (
                    <RefreshCw className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </button>

              {/* Alternatives */}
              {isExpanded && hasAlternatives && (
                <div className="ml-4 space-y-2 animate-fade-in">
                  <p className="text-xs text-muted-foreground font-medium px-2">Don't like it? Try these alternatives:</p>
                  
                  {/* Original option if swapped */}
                  {isSwapped && (
                    <button
                      onClick={() => resetMealSwap(key)}
                      className="w-full p-3 bg-card rounded-xl text-left border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Back to: {meal.name}</span>
                      </div>
                    </button>
                  )}

                  {meal.alternatives?.map((alt, index) => {
                    const isSelected = swappedMeals[key] === index;
                    return (
                      <button
                        key={index}
                        onClick={() => swapMeal(key, index)}
                        className={`w-full p-3 rounded-xl text-left transition-all ${
                          isSelected 
                            ? 'bg-primary/20 border-2 border-primary' 
                            : 'bg-card hover:bg-muted/50 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground text-sm">{alt.name}</p>
                            <p className="text-xs text-muted-foreground">{alt.items.join(', ')}</p>
                            {alt.calories && (
                              <span className="text-xs text-primary font-medium">{alt.calories} cal</span>
                            )}
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-primary" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Mark as done button */}
              {['breakfast', 'lunch', 'dinner'].includes(key) && (
                <Button
                  variant={isCompleted ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => toggleTask(key)}
                  className="ml-4 rounded-xl"
                >
                  {isCompleted ? (
                    <>
                      <Check className="w-4 h-4 mr-1" /> Completed
                    </>
                  ) : (
                    'Mark as done'
                  )}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Healbee Tip */}
      <div className="mt-6 p-4 bg-honey-light/50 rounded-2xl">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🐝</span>
          <div>
            <p className="text-sm font-medium text-foreground">Healbee Tip:</p>
            <p className="text-sm text-muted-foreground">
              Don't like a meal? Tap it to see alternatives! Swapping keeps your nutrition balanced.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
