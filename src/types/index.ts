export type LetterState = 'correct' | 'present' | 'absent' | 'unused';

export interface GuessRow {
  letters: Letter[];
  submitted: boolean;
}

export interface Letter {
  value: string;
  state: LetterState;
}

export interface KeyboardKey {
  value: string;
  state: LetterState;
  width?: number; // For special keys like Enter, Backspace
}
export interface DictionaryMessage {
  title: string;
  message: string;
  resolution:string;
}