import { useWellness } from '@/context/WellnessContext';
import { Check, Clock, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function TodayRoutine() {
  const { dailyRoutine, completedTasks, toggleTask, canProceedToNext, isCheatDayToday } = useWellness();

  if (!dailyRoutine) return null;

  const allItems = [
    ...dailyRoutine.morningHabits,
    {
      id: 'breakfast',
      time: dailyRoutine.meals.breakfast.time,
      title: 'Breakfast',
      description: dailyRoutine.meals.breakfast.name,
      icon: '🍳',
      required: true
    },
    {
      id: 'workout',
      time: dailyRoutine.workout.time,
      title: dailyRoutine.workout.name,
      description: `${dailyRoutine.workout.duration} minutes`,
      icon: '🏋️',
      required: true
    },
    {
      id: 'lunch',
      time: dailyRoutine.meals.lunch.time,
      title: 'Lunch',
      description: dailyRoutine.meals.lunch.name,
      icon: '🥗',
      required: true
    },
    {
      id: 'dinner',
      time: dailyRoutine.meals.dinner.time,
      title: 'Dinner',
      description: dailyRoutine.meals.dinner.name,
      icon: '🍽️',
      required: true
    },
    ...dailyRoutine.eveningHabits
  ];

  const handleToggle = (itemId: string, isRequired: boolean) => {
    const canProceed = canProceedToNext(itemId);
    
    if (!canProceed && !completedTasks.has(itemId)) {
      toast.error("Complete previous tasks first!", {
        description: isCheatDayToday 
          ? "Wait, it's a cheat day! You can actually skip this 🍕" 
          : "Healbee wants you to follow the routine step by step 🐝",
        icon: <AlertCircle className="w-5 h-5" />
      });
      return;
    }
    
    toggleTask(itemId);
    
    if (!completedTasks.has(itemId)) {
      toast.success("Great job! Keep buzzing! 🐝", {
        description: "One step closer to your goals!"
      });
    }
  };

  return (
    <div className="healbee-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-bee rounded-xl flex items-center justify-center">
            <span className="text-lg">📋</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">Today's Routine</h3>
            <p className="text-xs text-muted-foreground">Complete tasks in order</p>
          </div>
        </div>
        <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
          {completedTasks.size} / {allItems.length}
        </span>
      </div>

      <div className="space-y-3">
        {allItems.map((item) => {
          const isCompleted = completedTasks.has(item.id);
          const canProceed = canProceedToNext(item.id);
          const isLocked = !canProceed && !isCompleted && !isCheatDayToday;
          const isRequired = item.required;
          
          return (
            <button
              key={item.id}
              onClick={() => handleToggle(item.id, isRequired || false)}
              disabled={isLocked}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
                isCompleted 
                  ? 'bg-mint/30 border-2 border-mint-dark/30' 
                  : isLocked
                  ? 'bg-muted/30 opacity-60 cursor-not-allowed'
                  : 'bg-card hover:bg-muted/50 border-2 border-transparent hover:border-primary/20'
              }`}
            >
              {/* Checkbox */}
              <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                isCompleted 
                  ? 'bg-mint-dark border-mint-dark' 
                  : isLocked
                  ? 'border-muted-foreground/30'
                  : 'border-primary/50'
              }`}>
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : isLocked ? (
                  <Lock className="w-3 h-3 text-muted-foreground/50" />
                ) : null}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                isCompleted ? 'bg-mint/50' : 'bg-honey-light/50'
              }`}>
                <span className="text-2xl">{item.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className={`font-semibold ${isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {item.title}
                  </p>
                  {isRequired && !isCompleted && (
                    <span className="text-[10px] bg-coral/20 text-coral px-2 py-0.5 rounded-full font-medium">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-lg">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </button>
          );
        })}
      </div>

      {/* Motivational Footer */}
      <div className="mt-6 p-4 bg-primary/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🐝</span>
          <p className="text-sm text-foreground">
            {completedTasks.size === allItems.length 
              ? "Amazing! You completed all tasks today! 🎉"
              : completedTasks.size > allItems.length / 2
              ? "You're doing great! Keep buzzing! 💪"
              : "Let's make today count! One task at a time 🌟"}
          </p>
        </div>
      </div>
    </div>
  );
}
