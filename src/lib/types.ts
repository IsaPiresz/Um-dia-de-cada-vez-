export type Category = 'home' | 'school' | 'therapy' | 'leisure' | 'health';

export interface Task {
  id: string;
  title: string;
  category: Category;
  time: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  recurring: 'none' | 'daily' | 'weekly';
}

export interface UserProfile {
  name: string;
  avatar?: string;
  onboardingDone: boolean;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  highContrast: boolean;
  reducedStimuli: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  home: 'Casa',
  school: 'Escola',
  therapy: 'Terapia',
  leisure: 'Lazer',
  health: 'Saúde',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  home: '🏠',
  school: '📚',
  therapy: '🧠',
  leisure: '🎮',
  health: '💚',
};

export const MOTIVATIONAL_PHRASES = [
  "Cada passo conta. Você está indo muito bem! 💙",
  "Hoje é um novo dia cheio de possibilidades! ✨",
  "Você é capaz de coisas incríveis! 🌟",
  "Uma tarefa de cada vez. Sem pressa! 🌈",
  "Estamos orgulhosos de você! 💪",
  "Respire fundo. Tudo vai ficar bem. 🌊",
  "Seu esforço faz diferença! 🎯",
  "Você não está sozinho(a). Estamos juntos! 💙",
];
