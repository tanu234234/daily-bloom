import { useWellness } from '@/context/WellnessContext';
import { TrendingUp } from 'lucide-react';

export function WeeklyProgress() {
  const { todayProgress } = useWellness();
  
  // Mock weekly data based on current progress
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1; // Adjust for Monday start

  const weekData = days.map((day, i) => {
    if (i < adjustedToday) {
      // Past days - random progress between 60-100
      return { day, progress: Math.floor(Math.random() * 40) + 60 };
    } else if (i === adjustedToday) {
      // Today
      const progress = (todayProgress.tasksCompleted / todayProgress.totalTasks) * 100;
      return { day, progress: Math.round(progress), isToday: true };
    } else {
      // Future days
      return { day, progress: 0, isFuture: true };
    }
  });

  const avgProgress = Math.round(
    weekData.filter(d => !d.isFuture).reduce((acc, d) => acc + d.progress, 0) / 
    weekData.filter(d => !d.isFuture).length || 0
  );

  return (
    <div className="wellness-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sage-light rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Weekly Progress</h3>
            <p className="text-sm text-muted-foreground">{avgProgress}% average completion</p>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end justify-between gap-2 h-32">
        {weekData.map(({ day, progress, isToday, isFuture }) => (
          <div key={day} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full relative bg-muted rounded-lg overflow-hidden"
              style={{ height: '100%' }}
            >
              <div 
                className={`absolute bottom-0 w-full rounded-lg transition-all duration-500 ${
                  isToday 
                    ? 'gradient-primary' 
                    : isFuture 
                      ? 'bg-muted' 
                      : 'bg-sage-light'
                }`}
                style={{ height: `${progress}%` }}
              />
            </div>
            <span className={`text-xs font-medium ${
              isToday ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
