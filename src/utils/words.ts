import { DictionaryMessage } from "../types";

// A list of 5-letter words for the game
export const WORDS = [
  'APPLE', 'BRAVE', 'CHILL', 'DANCE', 'EAGLE', 'FROST', 'GLIDE', 'HAPPY', 'IVORY', 
  'JOKER', 'KNEEL', 'LEMON', 'MAGIC', 'NOBLE', 'OCEAN', 'POWER', 'QUIET', 'RIVER', 
  'SMILE', 'TRAIN', 'UNITY', 'VIVID', 'WATER', 'XENON', 'YOUTH', 'ZESTY', 'BLINK',
  'CRANE', 'DREAM', 'FRESH', 'GLOW', 'HUMPY', 'IDEAL', 'JOLLY', 'KNOWN', 'LIGHT',
  'MOIST', 'NIGHT', 'OVERT', 'PRIDE', 'QUACK', 'ROYAL', 'STONE', 'THINK', 'USHER',
  'VOICE', 'WHOLE', 'XEROX', 'YEARN', 'ZEBRA', 'BRISK', 'CRUMB', 'DWELL', 'FEAST'
];

// Get a random word from the list
export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
};

// Check if a word is in the list of valid words
export const isValidWord = (word: string): boolean => {
  return WORDS.includes(word.toUpperCase());
};

// Fetch word definition from the dictionary API
export const getWordDefinition = async (word: string): Promise<DictionaryMessage> => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data || data.length === 0) {
      return {
        title: "Word Not Found",
        message: `The word "${word}" was not found in the dictionary.`,
        resolution: "Please check the spelling or try a different word."
      };
    }
    return data;
  } catch (error) {
    console.error("Could not fetch word definition:", error);
    return {
      title: "Word Not Found",
      message: `There was a network error.`,
      resolution: "Try again or check the logs."
    };
  }
};