import { useWellness } from '@/context/WellnessContext';
import { MAX_CHEAT_DAYS_PER_MONTH } from '@/types/wellness';
import { Button } from '@/components/ui/button';
import { Pizza, Gift, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

export function CheatDayCard() {
  const { cheatDaysRemaining, useCheatDay, isCheatDayToday, cheatDaysUsed } = useWellness();
  const [showDialog, setShowDialog] = useState(false);
  const [reason, setReason] = useState('');

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const handleUseCheatDay = () => {
    const success = useCheatDay(reason);
    if (success) {
      toast.success("Cheat Day Activated! 🍕", {
        description: "Enjoy your day! Routines are flexible today.",
      });
      setShowDialog(false);
      setReason('');
    } else {
      toast.error("Can't use cheat day", {
        description: "You've used all your cheat days this month.",
      });
    }
  };

  if (isCheatDayToday) {
    return null; // Banner is shown in Dashboard already
  }

  return (
    <div className="healbee-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-coral/20 rounded-xl flex items-center justify-center">
            <Pizza className="w-6 h-6 text-coral" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Cheat Days</h3>
            <p className="text-sm text-muted-foreground">
              {cheatDaysRemaining} of {MAX_CHEAT_DAYS_PER_MONTH} left in {currentMonth}
            </p>
          </div>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              disabled={cheatDaysRemaining <= 0}
              className="rounded-xl border-coral/50 text-coral hover:bg-coral/10"
            >
              <Gift className="w-4 h-4 mr-1" />
              Use Today
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-2xl">🍕</span> Use a Cheat Day?
              </DialogTitle>
              <DialogDescription className="text-left">
                On cheat days, you can skip routines without Healbee reminding you. 
                Use them wisely - you only get {MAX_CHEAT_DAYS_PER_MONTH} per month!
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="bg-honey-light/50 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-honey-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">What happens on a cheat day?</p>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• You can skip any routine task</li>
                      <li>• No reminders for missed tasks</li>
                      <li>• Progress won't be affected negatively</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Cheat days remaining: <span className="font-bold text-coral">{cheatDaysRemaining}</span>
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowDialog(false)} className="rounded-xl">
                Keep Going
              </Button>
              <Button 
                onClick={handleUseCheatDay}
                className="rounded-xl bg-coral hover:bg-coral/90 text-white"
              >
                <Pizza className="w-4 h-4 mr-1" />
                Activate Cheat Day
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: MAX_CHEAT_DAYS_PER_MONTH }).map((_, index) => {
          const isUsed = index < (MAX_CHEAT_DAYS_PER_MONTH - cheatDaysRemaining);
          return (
            <div
              key={index}
              className={`w-8 h-2 rounded-full transition-all ${
                isUsed ? 'bg-coral' : 'bg-muted'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
