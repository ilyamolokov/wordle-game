export const CORRECT = "C";
export const ALMOST = "A";
export const INCORRECT = "I";

export const EMPTY = "";

export type LetterScore = typeof CORRECT | typeof ALMOST | typeof INCORRECT;
export type GuessScore = Array<LetterScore>;

export type Game = {
  answer: string;
  hardMode: boolean;
  guesses: string[];
  scores: GuessScore[];
  guessesRemaining: number;
  dictionary: string[];
  maxWordLength: number;
};
