import { useWellness } from '@/context/WellnessContext';
import { Check, Clock } from 'lucide-react';

export function TodayRoutine() {
  const { dailyRoutine, completedTasks, toggleTask } = useWellness();

  if (!dailyRoutine) return null;

  const allItems = [
    ...dailyRoutine.morningHabits,
    {
      id: 'breakfast',
      time: dailyRoutine.meals.breakfast.time,
      title: 'Breakfast',
      description: dailyRoutine.meals.breakfast.name,
      icon: '🍳'
    },
    {
      id: 'workout',
      time: dailyRoutine.workout.time,
      title: dailyRoutine.workout.name,
      description: `${dailyRoutine.workout.duration} minutes`,
      icon: '🏋️'
    },
    {
      id: 'lunch',
      time: dailyRoutine.meals.lunch.time,
      title: 'Lunch',
      description: dailyRoutine.meals.lunch.name,
      icon: '🥗'
    },
    {
      id: 'dinner',
      time: dailyRoutine.meals.dinner.time,
      title: 'Dinner',
      description: dailyRoutine.meals.dinner.name,
      icon: '🍽️'
    },
    ...dailyRoutine.eveningHabits
  ];

  return (
    <div className="wellness-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground text-lg">Today's Routine</h3>
        <span className="text-sm text-muted-foreground">
          {completedTasks.size} / {allItems.length} done
        </span>
      </div>

      <div className="space-y-3">
        {allItems.map((item, index) => {
          const isCompleted = completedTasks.has(item.id);
          
          return (
            <button
              key={item.id}
              onClick={() => toggleTask(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                isCompleted 
                  ? 'bg-sage-light/50' 
                  : 'bg-muted/50 hover:bg-muted'
              }`}
            >
              {/* Checkbox */}
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                isCompleted 
                  ? 'bg-primary border-primary' 
                  : 'border-border'
              }`}>
                {isCompleted && <Check className="w-4 h-4 text-primary-foreground" />}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-xl">{item.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <p className={`font-medium ${isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
