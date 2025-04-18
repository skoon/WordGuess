import { Letter, LetterState } from '../types';

// Evaluate a guess against the target word
export const evaluateGuess = (guess: string, targetWord: string): Letter[] => {
  const result: Letter[] = [];
  const targetLetters = targetWord.split('');
  
  // First, mark correct letters
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i].toUpperCase();
    
    if (letter === targetLetters[i]) {
      result.push({ value: letter, state: 'correct' });
      // Mark this position as processed
      targetLetters[i] = '#';
    } else {
      // Temporarily mark as absent, we'll check for 'present' state in the next step
      result.push({ value: letter, state: 'absent' });
    }
  }
  
  // Then, check for present letters (wrong position)
  for (let i = 0; i < result.length; i++) {
    // Skip already correct letters
    if (result[i].state === 'correct') continue;
    
    const letter = result[i].value;
    const indexInTarget = targetLetters.indexOf(letter);
    
    if (indexInTarget !== -1) {
      result[i].state = 'present';
      // Mark this position as processed
      targetLetters[indexInTarget] = '#';
    }
  }
  
  return result;
};

// Check if the game is won (all letters are correct)
export const isWinningGuess = (evaluation: Letter[]): boolean => {
  return evaluation.every(letter => letter.state === 'correct');
};

// Generate keyboard state based on all guesses
export const getKeyboardState = (guesses: Letter[][]): Record<string, LetterState> => {
  const keyboardState: Record<string, LetterState> = {};
  
  for (const guess of guesses) {
    for (const letter of guess) {
      const currentState = keyboardState[letter.value] || 'unused';
      
      // Prioritize 'correct' > 'present' > 'absent' > 'unused'
      if (letter.state === 'correct') {
        keyboardState[letter.value] = 'correct';
      } else if (letter.state === 'present' && currentState !== 'correct') {
        keyboardState[letter.value] = 'present';
      } else if (letter.state === 'absent' && currentState !== 'correct' && currentState !== 'present') {
        keyboardState[letter.value] = 'absent';
      }
    }
  }
  
  return keyboardState;
};