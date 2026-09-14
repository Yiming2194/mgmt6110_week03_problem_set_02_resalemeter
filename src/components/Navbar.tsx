import { Building2, Layers, TrendingUp } from 'lucide-react';

interface NavbarProps {
  activeScreen: 'screen1' | 'screen2';
  onSelectScreen: (screen: 'screen1' | 'screen2') => void;
}

export default function Navbar({ activeScreen, onSelectScreen }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Logo & Product Identity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-inner font-bold text-xl">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                    ResaleMeter
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                    HDB Resale
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Singapore HDB Resale Price Range & Trend Benchmarker
                </p>
              </div>
            </div>

            {/* Prototype notice badge for mobile */}
            <span className="sm:hidden text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-medium">
              Mock Data
            </span>
          </div>

          {/* Screen Navigation Tabs */}
          <nav aria-label="Screen navigation" className="flex items-center p-1 bg-slate-800/90 rounded-xl border border-slate-700/60 w-full sm:w-auto">
            <button
              id="nav-screen-1"
              type="button"
              onClick={() => onSelectScreen('screen1')}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
                activeScreen === 'screen1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="whitespace-nowrap">1. Town Explorer</span>
            </button>

            <button
              id="nav-screen-2"
              type="button"
              onClick={() => onSelectScreen('screen2')}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
                activeScreen === 'screen2'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="whitespace-nowrap">2. Compare (Up to 3)</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
