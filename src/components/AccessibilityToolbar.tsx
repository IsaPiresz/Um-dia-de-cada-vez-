import { useApp } from '@/context/AppContext';

export default function AccessibilityToolbar() {
  const { profile, setProfile } = useApp();

  const changeFontSize = (size: 'sm' | 'md' | 'lg' | 'xl') => {
    setProfile((p) => ({ ...p, fontSize: size }));
  };

  const toggleContrast = () => {
    setProfile((p) => ({ ...p, highContrast: !p.highContrast }));
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'pt-BR';
      utter.rate = 0.9;
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="bg-accent/50 border-b">
      <div className="container mx-auto px-4 py-1.5 flex items-center gap-3 text-xs overflow-x-auto">
        <span className="text-muted-foreground font-medium whitespace-nowrap">♿ Acessibilidade:</span>

        <div className="flex items-center gap-1">
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <button
              key={size}
              onClick={() => changeFontSize(size)}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                profile.fontSize === size
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent text-muted-foreground'
              }`}
              aria-label={`Tamanho da fonte ${size}`}
            >
              A{size === 'sm' ? '⁻' : size === 'lg' ? '⁺' : size === 'xl' ? '⁺⁺' : ''}
            </button>
          ))}
        </div>

        <button
          onClick={toggleContrast}
          className={`px-2 py-1 rounded font-medium transition-colors ${
            profile.highContrast
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-muted-foreground'
          }`}
        >
          🔲 Contraste
        </button>

        <button
          onClick={() => speak('Bem-vindo ao RotinaTEA. Use este aplicativo para gerenciar suas rotinas diárias.')}
          className="px-2 py-1 rounded hover:bg-accent text-muted-foreground font-medium transition-colors"
        >
          🔊 Ler
        </button>
      </div>
    </div>
  );
}
