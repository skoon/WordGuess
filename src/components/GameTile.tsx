import React, { useEffect, useState } from 'react';
import { Letter } from '../types';

interface GameTileProps {
  letter: Letter;
  isRevealing?: boolean;
  revealDelay?: number;
}

const GameTile: React.FC<GameTileProps> = ({ 
  letter, 
  isRevealing = false,
  revealDelay = 0 
}) => {
  const [revealed, setRevealed] = useState(false);
  
  useEffect(() => {
    if (isRevealing) {
      const timer = setTimeout(() => {
        setRevealed(true);
      }, revealDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isRevealing, revealDelay]);
  
  const getBgColor = () => {
    if (!revealed) return 'bg-white';
    switch (letter.state) {
      case 'correct':
        return 'bg-emerald-500 text-white';
      case 'present':
        return 'bg-amber-400 text-white';
      case 'absent':
        return 'bg-slate-500 text-white';
      default:
        return 'bg-white';
    }
  };
  
  const getBorderColor = () => {
    if (!letter.value) return 'border-slate-300';
    if (!revealed) return 'border-slate-400';
    return 'border-transparent';
  };
  
  const getAnimation = () => {
    if (isRevealing && revealed) return 'animate-flip';
    return '';
  };

  return (
    <div
      className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border-2 ${getBorderColor()} ${getBgColor()} ${getAnimation()} font-bold text-2xl rounded m-1 transition-colors`}
      style={{
        transitionDelay: `${revealDelay}ms`,
      }}
    >
      {letter.value}
    </div>
  );
};

export default GameTile;