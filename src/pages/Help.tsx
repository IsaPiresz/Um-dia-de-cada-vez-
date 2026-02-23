import { Link } from 'react-router-dom';

export default function Help() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="text-5xl mb-4">🆘</div>
        <h1 className="text-2xl font-bold text-foreground">Preciso de Ajuda</h1>
        <p className="text-muted-foreground mt-1">
          Você não está sozinho(a). Aqui estão alguns recursos que podem ajudar.
        </p>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border space-y-3">
        <h2 className="font-bold text-foreground">🧘 Se você está ansioso(a) agora:</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>1. Respire fundo, devagar</li>
          <li>2. Conte 5 coisas que você pode ver</li>
          <li>3. Conte 4 coisas que você pode tocar</li>
          <li>4. Conte 3 coisas que você pode ouvir</li>
          <li>5. Use o <Link to="/calmo" className="text-primary font-medium hover:underline">Modo Calmo</Link> do app</li>
        </ul>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border space-y-3">
        <h2 className="font-bold text-foreground">📞 Canais de Apoio</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-xl bg-accent/50">
            <p className="font-semibold text-foreground">CVV – Centro de Valorização da Vida</p>
            <p className="text-primary font-bold text-lg">188</p>
            <p className="text-muted-foreground">Ligação gratuita, 24 horas</p>
          </div>
          <div className="p-3 rounded-xl bg-accent/50">
            <p className="font-semibold text-foreground">CAPS – Centro de Atenção Psicossocial</p>
            <p className="text-muted-foreground">Procure a unidade mais próxima na sua cidade</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border space-y-3">
        <h2 className="font-bold text-foreground">📚 Dicas para Cuidadores</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>💙 Mantenha uma rotina previsível</li>
          <li>🗣️ Use comunicação clara e objetiva</li>
          <li>⏱️ Dê tempo para processamento</li>
          <li>🌟 Celebre cada conquista, por menor que seja</li>
          <li>🧘 Cuide de si também – sua saúde importa</li>
        </ul>
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
