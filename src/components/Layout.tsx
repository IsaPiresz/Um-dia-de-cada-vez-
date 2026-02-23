import { Link, useLocation } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import { useApp } from '@/context/AppContext';
import AccessibilityToolbar from './AccessibilityToolbar';

const NAV_ITEMS = [
  { path: '/', label: 'Início', icon: '🏠' },
  { path: '/rotinas', label: 'Rotinas', icon: '📅' },
  { path: '/calmo', label: 'Modo Calmo', icon: '🧘' },
  { path: '/relatorios', label: 'Relatórios', icon: '📊' },
  { path: '/sobre', label: 'Sobre', icon: 'ℹ️' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { profile } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <span className="text-2xl">💙</span>
            <span>RotinaTEA</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t bg-card p-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Accessibility toolbar */}
      <AccessibilityToolbar />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 page-enter">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-lg">💙</span>
              <span className="font-semibold">RotinaTEA</span>
              <span>— Promovendo inclusão e autonomia</span>
            </div>
            <div className="flex gap-4">
              <Link to="/sobre" className="hover:text-primary transition-colors">Sobre</Link>
              <Link to="/ajuda" className="hover:text-primary transition-colors">Ajuda</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
