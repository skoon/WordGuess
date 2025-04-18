import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  onNewGame: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewGame }) => {
  return (
    <header className="w-full px-6 py-4 border-b border-slate-200 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-emerald-500" />
        <h1 className="text-2xl font-bold text-slate-800">WordGuess</h1>
      </div>
      <button
        onClick={onNewGame}
        className="px-4 py-2 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 transition-colors duration-200"
      >
        New Game
      </button>
    </header>
  );
};

export default Header;