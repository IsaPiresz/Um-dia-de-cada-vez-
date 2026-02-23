import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

const PHASE_DURATION = { inhale: 4, hold: 4, exhale: 6 };
const PHASE_LABELS: Record<Phase, string> = {
  idle: 'Pronto para começar',
  inhale: 'Inspire... 🌬️',
  hold: 'Segure... ✨',
  exhale: 'Expire... 🍃',
};

export default function CalmMode() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [timer, setTimer] = useState(0);
  const [cycles, setCycles] = useState(0);

  const startBreathing = useCallback(() => {
    setActive(true);
    setPhase('inhale');
    setTimer(PHASE_DURATION.inhale);
    setCycles(0);
  }, []);

  const stop = () => {
    setActive(false);
    setPhase('idle');
    setTimer(0);
  };

  useEffect(() => {
    if (!active) return;
    if (timer <= 0) {
      if (phase === 'inhale') {
        setPhase('hold');
        setTimer(PHASE_DURATION.hold);
      } else if (phase === 'hold') {
        setPhase('exhale');
        setTimer(PHASE_DURATION.exhale);
      } else if (phase === 'exhale') {
        setCycles((c) => c + 1);
        setPhase('inhale');
        setTimer(PHASE_DURATION.inhale);
      }
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [active, timer, phase]);

  const circleScale = phase === 'inhale' ? 'scale-150' : phase === 'hold' ? 'scale-150' : 'scale-100';

  return (
    <div className="max-w-lg mx-auto text-center space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">🧘 Modo Calmo</h1>
        <p className="text-muted-foreground mt-1">
          Um espaço seguro para você se acalmar e respirar.
        </p>
      </div>

      {/* Breathing circle */}
      <div className="flex items-center justify-center py-8">
        <div
          className={`w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center transition-transform duration-[4000ms] ease-in-out ${circleScale}`}
        >
          <div className="w-28 h-28 rounded-full bg-primary/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/50 flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">
                {active ? timer : '🌊'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <p className="text-xl font-semibold text-foreground">{PHASE_LABELS[phase]}</p>
        {cycles > 0 && (
          <p className="text-sm text-muted-foreground">Ciclos completos: {cycles} ⭐</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {!active ? (
          <Button onClick={startBreathing} size="lg">
            Iniciar Respiração 🌬️
          </Button>
        ) : (
          <Button onClick={stop} variant="outline" size="lg">
            Parar
          </Button>
        )}
      </div>

      {/* Calming messages */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border space-y-4">
        <h3 className="font-bold text-foreground">Frases Tranquilizadoras 💙</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>"Você está seguro(a). Tudo vai ficar bem."</p>
          <p>"Respire no seu ritmo. Sem pressa."</p>
          <p>"Este momento vai passar. Você é forte."</p>
          <p>"Estamos aqui com você. Você não está sozinho(a)."</p>
        </div>
      </div>

      {/* Quick tips */}
      <div className="bg-accent/50 rounded-2xl p-5 border text-left">
        <h3 className="font-bold text-foreground mb-3">💡 Dicas Rápidas</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>🎧 Use fones de ouvido em um lugar quieto</li>
          <li>👀 Foque no círculo que expande e contrai</li>
          <li>🪑 Sente-se confortavelmente</li>
          <li>⏱️ Tente pelo menos 3 ciclos completos</li>
        </ul>
      </div>
    </div>
  );
}
