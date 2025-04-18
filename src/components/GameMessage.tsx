import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface GameMessageProps {
  isWinner: boolean;
  isGameOver: boolean;
  solution: string;
  attempts: number;
  onNewGame: () => void;
}

const GameMessage: React.FC<GameMessageProps> = ({ 
  isWinner, 
  isGameOver, 
  solution, 
  attempts,
  onNewGame 
}) => {
  if (!isGameOver) return null;
  
  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="text-center mb-4">
          {isWinner ? (
            <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
          ) : (
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
          )}
          <h2 className="text-2xl font-bold mb-2">
            {isWinner ? 'Congratulations!' : 'Game Over'}
          </h2>
          <p className="text-slate-600 mb-4">
            {isWinner
              ? `You guessed the word in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!`
              : `The word was ${solution}. Better luck next time!`}
          </p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={onNewGame}
            className="px-4 py-2 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameMessage;