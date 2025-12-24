
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Snowfall from './components/Snowfall';
import ChristmasDecor from './components/ChristmasDecor';
import { NAMES, TIMER_DURATION_SECONDS } from './constants';

const App: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION_SECONDS);
  
  const timerRef = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    // Add current name to history before switching
    setHistory((prev) => [NAMES[currentIndex], ...prev].slice(0, 2));
    setCurrentIndex((prev) => (prev + 1) % NAMES.length);
    setTimeLeft(TIMER_DURATION_SECONDS);
  }, [currentIndex]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleNext();
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, timeLeft, handleNext]);

  const startTimer = () => {
    setIsActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center p-4">
      <Snowfall />
      <ChristmasDecor />

      <main className="relative z-20 w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Header Section */}
        <div className="w-full bg-red-700/80 p-6 flex flex-col items-center border-b border-white/10">
          <h1 className="text-4xl md:text-6xl font-christmas text-white text-center drop-shadow-lg">
            🎁 Noël Magique 🎄
          </h1>
          <p className="text-white/80 mt-2 text-center text-sm md:text-base italic">
            Un nouveau nom toutes les 3 minutes
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 w-full flex flex-col items-center text-center space-y-8">
          {!isActive ? (
            <div className="py-12 flex flex-col items-center space-y-6">
              <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] animate-pulse">
                <span className="text-5xl">🎅</span>
              </div>
              <p className="text-white text-lg font-medium max-w-sm">
                Prêt pour la distribution ? Appuyez sur le bouton pour lancer le décompte magique !
              </p>
              <button
                onClick={startTimer}
                className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-green-600 font-christmas text-3xl rounded-full shadow-lg hover:bg-green-700 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                Lancer le Temps de Noël !
              </button>
            </div>
          ) : (
            <>
              {/* Current Name Display */}
              <div className="flex flex-col items-center space-y-4 w-full">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 w-full">
                  <span className="text-red-400 text-sm uppercase tracking-widest font-bold">C'est le tour de...</span>
                  <div className="mt-2 text-6xl md:text-8xl font-christmas text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] capitalize animate-bounce">
                    {NAMES[currentIndex]}
                  </div>
                </div>
              </div>

              {/* History Section (The 2 previous names) */}
              {history.length > 0 && (
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Précédemment :</span>
                  <div className="flex items-center space-x-2">
                    {history.map((name, i) => (
                      <div 
                        key={i} 
                        className="text-xs capitalize text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10 flex items-center space-x-1"
                        style={{ opacity: i === 0 ? 0.8 : 0.4 }}
                      >
                        <span className="text-[8px]">❄️</span>
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timer Circular Display */}
              <div className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="stroke-white/10 fill-none"
                    strokeWidth="6"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="stroke-red-600 fill-none transition-all duration-1000 ease-linear"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * (timeLeft / TIMER_DURATION_SECONDS))}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-mono font-bold text-white">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Restant</span>
                </div>
              </div>

              {/* Next Name Preview */}
              <div className="flex items-center space-x-4 text-white/60 text-xs">
                <span>Prochain:</span>
                <span className="capitalize font-bold text-white/80">{NAMES[(currentIndex + 1) % NAMES.length]}</span>
              </div>
            </>
          )}
        </div>

        {/* Footer Area */}
        <div className="w-full bg-white/5 py-4 flex items-center justify-center space-x-6">
           <span className="text-xl">🕯️</span>
           <span className="text-xl">🍪</span>
           <span className="text-xl">🥛</span>
           <span className="text-xl">⭐</span>
        </div>
      </main>

      {/* Background Ambience */}
      <div className="fixed inset-0 bg-radial-gradient from-red-900/10 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default App;
