import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import GameMessage from './components/GameMessage';
import Statistics from './components/Statistics';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    guesses,
    currentGuess,
    solution,
    isGameOver,
    isWinner,
    errorMessage,
    isRevealing,
    keyboardState,
    currentAttempt,
    stats,
    handleKeyPress,
    startNewGame
  } = useGameState();
  
  const [showStats, setShowStats] = useState(false);
  
  // Show error message with animation
  const [showError, setShowError] = useState(false);
  
  useEffect(() => {
    if (errorMessage) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNewGame={startNewGame} />
      
      <main className="flex-1 flex flex-col items-center justify-between max-w-lg mx-auto w-full px-4">
        <div className="w-full">
          {/* Error message toast */}
          {showError && errorMessage && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded transition-opacity">
              {errorMessage}
            </div>
          )}
          
          {/* Game board */}
          <GameBoard 
            guesses={guesses} 
            currentGuess={currentGuess} 
            isRevealing={isRevealing} 
          />
        </div>
        
        {/* Keyboard */}
        <Keyboard 
          onKeyPress={handleKeyPress} 
          keyboardState={keyboardState}
          disabled={isGameOver || isRevealing} 
        />
      </main>
      
      {/* Game over message */}
      <GameMessage 
        isWinner={isWinner}
        isGameOver={isGameOver}
        solution={solution}
        attempts={currentAttempt}
        onNewGame={startNewGame}
      />
      
      {/* Statistics modal */}
      {showStats && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <Statistics 
            games={stats.games}
            wins={stats.wins}
            currentStreak={stats.currentStreak}
            maxStreak={stats.maxStreak}
            distribution={stats.distribution}
          />
          <button
            onClick={() => setShowStats(false)}
            className="absolute top-4 right-4 text-white p-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;