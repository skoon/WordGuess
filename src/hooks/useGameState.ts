import { useState, useEffect, useCallback } from 'react';
import { GuessRow, Letter, LetterState } from '../types';
import { getRandomWord, isValidWord } from '../utils/words';
import { evaluateGuess, isWinningGuess, getKeyboardState } from '../utils/gameLogic';

// Initialize empty guesses array with 6 rows
const initializeGuesses = (): GuessRow[] => {
  return Array.from({ length: 6 }, () => ({
    letters: Array.from({ length: 5 }, () => ({ value: '', state: 'unused' })),
    submitted: false
  }));
};

interface GameStats {
  games: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  distribution: number[];
}

// Initialize game statistics
const initializeStats = (): GameStats => {
  const storedStats = localStorage.getItem('wordGuessStats');
  if (storedStats) {
    return JSON.parse(storedStats);
  }
  return {
    games: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: [0, 0, 0, 0, 0, 0]
  };
};

export const useGameState = () => {
  // Game target word
  const [solution, setSolution] = useState(() => getRandomWord());
  
  // Game board state
  const [guesses, setGuesses] = useState<GuessRow[]>(initializeGuesses);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  
  // Game status
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Statistics
  const [stats, setStats] = useState<GameStats>(initializeStats);
  
  // Get current attempt number (1-indexed)
  const currentAttempt = guesses.filter(guess => guess.submitted).length + 1;
  
  // Generate keyboard state based on all submitted guesses
  const keyboardState = getKeyboardState(
    guesses
      .filter(row => row.submitted)
      .map(row => row.letters)
  );
  
  // Start a new game
  const startNewGame = useCallback(() => {
    setGuesses(initializeGuesses());
    setCurrentGuess('');
    setSolution(getRandomWord());
    setIsGameOver(false);
    setIsWinner(false);
    setErrorMessage('');
    setIsRevealing(false);
  }, []);
  
  // Handle keyboard input
  const handleKeyPress = useCallback((key: string) => {
    if (isGameOver || isRevealing) return;
    
    setErrorMessage('');
    
    if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setErrorMessage('Word must be 5 letters');
        return;
      }
      
      if (!isValidWord(currentGuess)) {
        setErrorMessage('Not in word list');
        return;
      }
      
      const newGuesses = [...guesses];
      const currentGuessIndex = newGuesses.findIndex(guess => !guess.submitted);
      
      if (currentGuessIndex !== -1) {
        // Evaluate the guess
        const evaluation = evaluateGuess(currentGuess, solution);
        newGuesses[currentGuessIndex] = {
          letters: evaluation,
          submitted: true
        };
        
        setGuesses(newGuesses);
        setIsRevealing(true);
        
        // Set timeout to allow for flip animation
        setTimeout(() => {
          setIsRevealing(false);
          
          // Check if the guess is correct
          const win = isWinningGuess(evaluation);
          if (win) {
            setIsWinner(true);
            setIsGameOver(true);
            
            // Update stats
            const newStats = { ...stats };
            newStats.games += 1;
            newStats.wins += 1;
            newStats.currentStreak += 1;
            newStats.maxStreak = Math.max(newStats.currentStreak, newStats.maxStreak);
            newStats.distribution[currentAttempt - 1] += 1;
            
            setStats(newStats);
            localStorage.setItem('wordGuessStats', JSON.stringify(newStats));
          } 
          // Check if out of guesses
          else if (currentGuessIndex === newGuesses.length - 1) {
            setIsGameOver(true);
            
            // Update stats
            const newStats = { ...stats };
            newStats.games += 1;
            newStats.currentStreak = 0;
            
            setStats(newStats);
            localStorage.setItem('wordGuessStats', JSON.stringify(newStats));
          }
          
          setCurrentGuess('');
        }, 1800); // Wait for all tiles to flip
      }
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, guesses, solution, isGameOver, isRevealing, stats, currentAttempt]);
  
  // Handle physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver || isRevealing) return;
      
      const key = e.key.toUpperCase();
      
      if (key === 'BACKSPACE' || key === 'ENTER' || (/^[A-Z]$/.test(key) && currentGuess.length < 5)) {
        e.preventDefault();
        handleKeyPress(key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, isGameOver, isRevealing]);
  
  return {
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
  };
};