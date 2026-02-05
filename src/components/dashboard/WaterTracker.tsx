import { useWellness } from '@/context/WellnessContext';
import { Droplets, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WaterTracker() {
  const { waterGlasses, addWater, dailyRoutine } = useWellness();
  const targetGlasses = dailyRoutine?.waterIntake || 8;
  const progress = (waterGlasses / targetGlasses) * 100;

  return (
    <div className="wellness-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-soft-blue/20 rounded-xl flex items-center justify-center">
            <Droplets className="w-5 h-5 text-soft-blue" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Hydration</h3>
            <p className="text-sm text-muted-foreground">
              {waterGlasses} / {targetGlasses} glasses
            </p>
          </div>
        </div>
        <Button 
          variant="soft" 
          size="icon"
          onClick={addWater}
          disabled={waterGlasses >= targetGlasses}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-soft-blue rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Water glasses visualization */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {Array.from({ length: targetGlasses }).map((_, i) => (
          <div 
            key={i}
            className={`w-8 h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
              i < waterGlasses 
                ? 'bg-soft-blue/20 border-soft-blue' 
                : 'border-border'
            }`}
          >
            {i < waterGlasses && (
              <Droplets className="w-4 h-4 text-soft-blue" />
            )}
          </div>
        ))}
      </div>

      {waterGlasses >= targetGlasses && (
        <p className="text-sm text-primary font-medium mt-3 flex items-center gap-2">
          <span>🎉</span> Great job! You've reached your daily goal!
        </p>
      )}
    </div>
  );
}
