import { ReactNode, createContext, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { UserProfile, Task } from '@/lib/types';

interface AppContextType {
  profile: UserProfile;
  setProfile: (p: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  tasks: Task[];
  setTasks: (t: Task[] | ((prev: Task[]) => Task[])) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const defaultProfile: UserProfile = {
  name: '',
  onboardingDone: false,
  fontSize: 'md',
  highContrast: false,
  reducedStimuli: false,
};

const defaultTasks: Task[] = [
  { id: '1', title: 'Tomar café da manhã', category: 'home', time: '07:30', completed: false, priority: 'high', recurring: 'daily' },
  { id: '2', title: 'Sessão de terapia', category: 'therapy', time: '10:00', completed: false, priority: 'high', recurring: 'weekly' },
  { id: '3', title: 'Estudar matemática', category: 'school', time: '14:00', completed: false, priority: 'medium', recurring: 'daily' },
  { id: '4', title: 'Tempo livre - jogos', category: 'leisure', time: '16:00', completed: false, priority: 'low', recurring: 'daily' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useLocalStorage<UserProfile>('tea-profile', defaultProfile);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tea-tasks', defaultTasks);

  return (
    <AppContext.Provider value={{ profile, setProfile, tasks, setTasks }}>
      <div className={`font-scale-${profile.fontSize} ${profile.highContrast ? 'high-contrast' : ''}`}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
