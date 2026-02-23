import { Task, CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/types';
import { useApp } from '@/context/AppContext';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { setTasks } = useApp();

  const toggleComplete = () => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const categoryColorMap: Record<string, string> = {
    home: 'border-l-category-home',
    school: 'border-l-category-school',
    therapy: 'border-l-category-therapy',
    leisure: 'border-l-category-leisure',
    health: 'border-l-category-health',
  };

  return (
    <div
      className={`bg-card rounded-xl p-4 shadow-sm border border-border border-l-4 ${categoryColorMap[task.category]} transition-all hover:shadow-md ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={toggleComplete}
          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            task.completed
              ? 'bg-success border-success text-success-foreground'
              : 'border-muted hover:border-primary'
          }`}
          aria-label={task.completed ? 'Desmarcar tarefa' : 'Marcar como concluída'}
        >
          {task.completed && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>{CATEGORY_ICONS[task.category]} {CATEGORY_LABELS[task.category]}</span>
            <span>•</span>
            <span>🕐 {task.time}</span>
            {task.priority === 'high' && <span className="text-destructive font-medium">• Alta</span>}
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={deleteTask}
          className="text-muted-foreground hover:text-destructive transition-colors p-1"
          aria-label="Excluir tarefa"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
