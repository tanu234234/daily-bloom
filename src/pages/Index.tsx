import { WellnessProvider, useWellness } from '@/context/WellnessContext';
import { Onboarding } from '@/components/onboarding/Onboarding';
import { Dashboard } from '@/components/dashboard/Dashboard';

function WellnessApp() {
  const { isOnboarded } = useWellness();
  
  return isOnboarded ? <Dashboard /> : <Onboarding />;
}

const Index = () => {
  return (
    <WellnessProvider>
      <WellnessApp />
    </WellnessProvider>
  );
};

export default Index;
