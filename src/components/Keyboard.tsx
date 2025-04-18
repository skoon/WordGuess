import React from 'react';
import { LetterState } from '../types';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyboardState: Record<string, LetterState>;
  disabled?: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ 
  onKeyPress, 
  keyboardState,
  disabled = false 
}) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];
  
  const getKeyColor = (key: string) => {
    if (!keyboardState[key]) return 'bg-slate-200 text-slate-800 hover:bg-slate-300';
    
    switch (keyboardState[key]) {
      case 'correct':
        return 'bg-emerald-500 text-white hover:bg-emerald-600';
      case 'present':
        return 'bg-amber-400 text-white hover:bg-amber-500';
      case 'absent':
        return 'bg-slate-500 text-white hover:bg-slate-600';
      default:
        return 'bg-slate-200 text-slate-800 hover:bg-slate-300';
    }
  };
  
  const getKeyWidth = (key: string) => {
    if (key === 'ENTER' || key === 'BACKSPACE') return 'w-16';
    return 'w-9';
  };
  
  return (
    <div className="w-full max-w-lg mx-auto px-2 mb-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              disabled={disabled}
              className={`${getKeyWidth(key)} h-14 m-0.5 rounded font-medium flex items-center justify-center transition-colors ${getKeyColor(key)} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {key === 'BACKSPACE' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;