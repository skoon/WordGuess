import React from 'react';
import GameTile from './GameTile';
import { GuessRow } from '../types';

interface GameBoardProps {
  guesses: GuessRow[];
  currentGuess: string;
  isRevealing: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  guesses, 
  currentGuess, 
  isRevealing 
}) => {
  // Create a padded current guess
  const paddedGuess = currentGuess.padEnd(5, '');
  
  // Find the active row index
  const activeRowIndex = guesses.findIndex(row => !row.submitted);
  
  return (
    <div className="flex flex-col items-center justify-center gap-1 my-4">
      {guesses.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.submitted 
            ? row.letters.map((letter, letterIndex) => (
                <GameTile 
                  key={letterIndex} 
                  letter={letter}
                  isRevealing={isRevealing && rowIndex === activeRowIndex - 1}
                  revealDelay={letterIndex * 300}
                />
              ))
            : Array.from({ length: 5 }).map((_, letterIndex) => (
                <GameTile 
                  key={letterIndex} 
                  letter={{ 
                    value: rowIndex === activeRowIndex ? paddedGuess[letterIndex] || '' : '', 
                    state: 'unused' 
                  }}
                />
              ))
          }
        </div>
      ))}
    </div>
  );
};

export default GameBoard;