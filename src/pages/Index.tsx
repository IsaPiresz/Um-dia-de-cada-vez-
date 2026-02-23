import { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { MOTIVATIONAL_PHRASES, CATEGORY_ICONS } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import TaskCard from '@/components/TaskCard';

export default function Dashboard() {
  const { profile, tasks } = useApp();

  const now = new Date();
  const hours = now.getHours();
  const greeting = hours < 12 ? 'Bom dia' : hours < 18 ? 'Boa tarde' : 'Boa noite';

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const phrase = useMemo(
    () => MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)],
    []
  );

  const upcomingTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 3);

  const dateStr = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Greeting card */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {greeting}, {profile.name || 'Amigo(a)'} 👋
            </h1>
            <p className="text-muted-foreground text-sm capitalize">{dateStr}</p>
          </div>
          <div className="text-3xl">
            {hours < 12 ? '🌅' : hours < 18 ? '☀️' : '🌙'}
          </div>
        </div>
        <p className="text-sm text-primary italic mt-3">{phrase}</p>
      </div>

      {/* Progress */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-foreground">Progresso do Dia</h2>
          <span className="text-sm font-semibold text-primary">
            {completedCount}/{totalCount} ✅
          </span>
        </div>
        <Progress value={progress} className="h-3" />
        {progress === 100 && (
          <p className="text-sm text-success font-medium mt-2">
            🎉 Parabéns! Todas as tarefas foram concluídas!
          </p>
        )}
        {progress >= 50 && progress < 100 && (
          <p className="text-sm text-primary font-medium mt-2">
            ⭐ Mais da metade! Continue assim!
          </p>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/rotinas"
          className="bg-card rounded-2xl p-5 shadow-sm border hover:shadow-md transition-shadow text-center"
        >
          <div className="text-3xl mb-2">📅</div>
          <p className="font-semibold text-sm text-foreground">Minhas Rotinas</p>
        </Link>
        <Link
          to="/calmo"
          className="bg-card rounded-2xl p-5 shadow-sm border hover:shadow-md transition-shadow text-center"
        >
          <div className="text-3xl mb-2">🧘</div>
          <p className="font-semibold text-sm text-foreground">Modo Calmo</p>
        </Link>
      </div>

      {/* Upcoming tasks */}
      {upcomingTasks.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-bold text-foreground">Próximas Atividades</h2>
          {upcomingTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          <Link
            to="/rotinas"
            className="block text-center text-sm text-primary font-medium hover:underline"
          >
            Ver todas as rotinas →
          </Link>
        </div>
      )}

      {/* Help button */}
      <Link
        to="/ajuda"
        className="block bg-accent rounded-2xl p-4 text-center border hover:shadow-sm transition-shadow"
      >
        <span className="text-lg">🆘</span>
        <p className="font-semibold text-sm text-accent-foreground mt-1">Preciso de Ajuda</p>
      </Link>
    </div>
  );
}
