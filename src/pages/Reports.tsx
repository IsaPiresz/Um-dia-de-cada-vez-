import { useApp } from '@/context/AppContext';
import { CATEGORY_LABELS, CATEGORY_ICONS, Category } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

export default function Reports() {
  const { tasks } = useApp();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Per-category stats
  const categories = Object.keys(CATEGORY_LABELS) as Category[];
  const catStats = categories.map((cat) => {
    const catTasks = tasks.filter((t) => t.category === cat);
    const catCompleted = catTasks.filter((t) => t.completed).length;
    return {
      category: cat,
      total: catTasks.length,
      completed: catCompleted,
      pct: catTasks.length > 0 ? Math.round((catCompleted / catTasks.length) * 100) : 0,
    };
  }).filter((s) => s.total > 0);

  // Gamification
  const stars = Math.floor(completed / 2);
  const medals = Math.floor(completed / 5);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground">📊 Relatórios e Progresso</h1>

      {/* Overall */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-foreground">Progresso Geral</h2>
          <span className="text-2xl font-bold text-primary">{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-4" />
        <p className="text-sm text-muted-foreground mt-2">
          {completed} de {total} tarefas concluídas
        </p>
      </div>

      {/* Per category */}
      <div className="space-y-3">
        <h2 className="font-bold text-foreground">Por Categoria</h2>
        {catStats.map((stat) => (
          <div key={stat.category} className="bg-card rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">
                {CATEGORY_ICONS[stat.category]} {CATEGORY_LABELS[stat.category]}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.completed}/{stat.total}
              </span>
            </div>
            <Progress value={stat.pct} className="h-2" />
          </div>
        ))}
        {catStats.length === 0 && (
          <p className="text-center text-muted-foreground py-6">Nenhuma tarefa cadastrada ainda.</p>
        )}
      </div>

      {/* Gamification */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border text-center">
        <h2 className="font-bold text-foreground mb-4">🏆 Suas Conquistas</h2>
        <div className="flex justify-center gap-8">
          <div>
            <div className="text-3xl mb-1">⭐</div>
            <p className="text-2xl font-bold text-warning">{stars}</p>
            <p className="text-xs text-muted-foreground">Estrelas</p>
          </div>
          <div>
            <div className="text-3xl mb-1">🏅</div>
            <p className="text-2xl font-bold text-primary">{medals}</p>
            <p className="text-xs text-muted-foreground">Medalhas</p>
          </div>
          <div>
            <div className="text-3xl mb-1">✅</div>
            <p className="text-2xl font-bold text-success">{completed}</p>
            <p className="text-xs text-muted-foreground">Concluídas</p>
          </div>
        </div>
        {stars > 0 && (
          <p className="text-sm text-primary mt-4 font-medium">
            Incrível! Continue assim! 🎉
          </p>
        )}
      </div>
    </div>
  );
}
