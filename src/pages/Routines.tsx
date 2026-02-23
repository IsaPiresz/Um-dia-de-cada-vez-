import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Category, CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/types';
import TaskCard from '@/components/TaskCard';
import { Button } from '@/components/ui/button';

export default function Routines() {
  const { tasks, setTasks } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'home' as Category,
    time: '08:00',
    priority: 'medium' as 'low' | 'medium' | 'high',
    recurring: 'none' as 'none' | 'daily' | 'weekly',
  });

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks((prev) => [
      ...prev,
      { ...newTask, id: Date.now().toString(), completed: false },
    ]);
    setNewTask({ title: '', category: 'home', time: '08:00', priority: 'medium', recurring: 'none' });
    setShowForm(false);
  };

  const filtered = filter === 'all' ? tasks : tasks.filter((t) => t.category === filter);
  const sorted = [...filtered].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">📅 Minhas Rotinas</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Nova Tarefa'}
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-card rounded-2xl p-5 shadow-sm border space-y-4">
          <input
            type="text"
            placeholder="Nome da tarefa..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Categoria</label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Category })}
                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{CATEGORY_ICONS[key as Category]} {label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Horário</label>
              <input
                type="time"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Prioridade</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Repetição</label>
              <select
                value={newTask.recurring}
                onChange={(e) => setNewTask({ ...newTask, recurring: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm"
              >
                <option value="none">Nenhuma</option>
                <option value="daily">Diária</option>
                <option value="weekly">Semanal</option>
              </select>
            </div>
          </div>
          <Button onClick={addTask} className="w-full">
            ✅ Adicionar Tarefa
          </Button>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
          }`}
        >
          Todas
        </button>
        {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filter === cat ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
            }`}
          >
            {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {sorted.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-3">📝</div>
            <p>Nenhuma tarefa encontrada.</p>
            <p className="text-sm">Crie sua primeira rotina!</p>
          </div>
        ) : (
          sorted.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
