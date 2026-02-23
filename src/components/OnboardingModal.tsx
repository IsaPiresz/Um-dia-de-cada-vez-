import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

const STEPS = [
  {
    icon: '💙',
    title: 'Bem-vindo ao Um Dia De Cada Vez!',
    description: 'Um aplicativo pensado para ajudar você a organizar sua rotina de forma simples, acolhedora e no seu ritmo.',
  },
  {
    icon: '📅',
    title: 'Organize suas Rotinas',
    description: 'Crie tarefas por categoria, defina horários e acompanhe seu progresso durante o dia.',
  },
  {
    icon: '🧘',
    title: 'Modo Calmo',
    description: 'Sempre que precisar, acesse o Modo Calmo para exercícios de respiração e relaxamento.',
  },
  {
    icon: '♿',
    title: 'Acessível para Todos',
    description: 'Ajuste o tamanho da fonte, ative o alto contraste ou use a leitura por voz. O app se adapta a você.',
  },
];

export default function OnboardingModal() {
  const { profile, setProfile } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  if (profile.onboardingDone) return null;

  const isLastStep = step === STEPS.length;

  const finish = () => {
    setProfile((p) => ({ ...p, name: name || 'Amigo(a)', onboardingDone: true }));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 text-center space-y-6">
        {!isLastStep ? (
          <>
            <div className="text-6xl">{STEPS[step].icon}</div>
            <h2 className="text-2xl font-bold text-foreground">{STEPS[step].title}</h2>
            <p className="text-muted-foreground leading-relaxed">{STEPS[step].description}</p>

            {/* Step indicators */}
            <div className="flex justify-center gap-2">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === step ? 'w-8 bg-primary' : 'w-2 bg-accent'
                  }`}
                />
              ))}
            </div>

            <Button onClick={() => setStep(step + 1)} className="w-full">
              Próximo →
            </Button>
          </>
        ) : (
          <>
            <div className="text-6xl">🌟</div>
            <h2 className="text-2xl font-bold text-foreground">Como podemos te chamar?</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome ou apelido"
              className="w-full px-4 py-3 rounded-xl border bg-background text-foreground text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <Button onClick={finish} className="w-full">
              Começar! 🚀
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
