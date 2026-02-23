import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="text-5xl mb-4">💙</div>
        <h1 className="text-3xl font-bold text-foreground">Sobre o Um Dia De Cada Vez</h1>
        <p className="text-muted-foreground mt-2">
          Promovendo autonomia, organização e inclusão digital.
        </p>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border space-y-4">
        <h2 className="text-xl font-bold text-foreground">🎯 Nossa Missão</h2>
        <p className="text-muted-foreground leading-relaxed">
          O Um Dia De Cada Vez foi desenvolvido com carinho para auxiliar pessoas com Transtorno do
          Espectro Autista (TEA), seus familiares, cuidadores e educadores na organização
          de rotinas diárias de forma acolhedora e acessível.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Acreditamos que uma rotina previsível e bem organizada pode reduzir a ansiedade,
          promover autonomia e melhorar significativamente a qualidade de vida.
        </p>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border space-y-4">
        <h2 className="text-xl font-bold text-foreground">🧠 O que é o TEA?</h2>
        <p className="text-muted-foreground leading-relaxed">
          O Transtorno do Espectro Autista (TEA) é uma condição de neurodesenvolvimento
          que afeta a comunicação social e pode incluir padrões de comportamento repetitivos.
          Cada pessoa no espectro é única, com suas próprias necessidades e potencialidades.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>💙 Aproximadamente 1 em cada 36 crianças é diagnosticada com TEA</li>
          <li>🌈 O espectro é amplo e diverso</li>
          <li>🤝 Inclusão e compreensão fazem toda a diferença</li>
          <li>📚 Intervenção precoce melhora significativamente os resultados</li>
        </ul>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border space-y-4">
        <h2 className="text-xl font-bold text-foreground">✨ Funcionalidades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: '📅', text: 'Gerenciamento de rotinas' },
            { icon: '🧘', text: 'Modo calmo com respiração guiada' },
            { icon: '📊', text: 'Relatórios de progresso' },
            { icon: '♿', text: 'Acessibilidade avançada' },
            { icon: '🏆', text: 'Sistema de gamificação' },
            { icon: '🔊', text: 'Leitura por voz (TTS)' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-foreground">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent/50 rounded-2xl p-6 border text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">💌 Contato</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Dúvidas, sugestões ou feedback? Entre em contato conosco.
        </p>
        <p className="text-primary font-medium">contato@umdiadecadavez.com.br</p>
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          ← Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
