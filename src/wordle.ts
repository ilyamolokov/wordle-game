import {
  CORRECT,
  ALMOST,
  INCORRECT,
  EMPTY,
  GuessScore,
  Game,
} from "./@types/types";

export const createGame = (
  dictionary: string[],
  answer: string,
  hardMode = false,
) => {
  return {
    answer,
    hardMode,
    guesses: [],
    scores: [],
    guessesRemaining: 6,
    dictionary,
    maxWordLength: 4,
  };
};

export const scoreGuess = (guess: string, answer: string): GuessScore => {
  const answerLetters = answer.split("");
  const guessLetters = guess.split("");

  const score: GuessScore = [];

  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      score[i] = CORRECT;
      answerLetters[i] = EMPTY;
      guessLetters[i] = EMPTY;
    }
  }

  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === EMPTY) continue;

    const answerIndex = answerLetters.findIndex(
      (char) => char === guessLetters[i],
    );
    if (answerIndex > -1) {
      score[i] = ALMOST;
      answerLetters[answerIndex] = EMPTY;
    } else {
      score[i] = INCORRECT;
    }
  }

  return score;
};

export const validateGuess = (guess: string, game: Game) => {
  if (!game.dictionary.includes(guess)) return false;
  if (game.guesses.includes(guess)) return false;

  if (game.guesses.length && game.hardMode) {
    const lastGuess = game.guesses[game.guesses.length - 1];
    const lastScore = game.scores[game.scores.length - 1];

    for (let i = 0; i < guess.length; i++) {
      if (lastScore[i] === CORRECT && lastGuess[i] !== guess[i]) return false;

      if (lastScore[i] === ALMOST && !guess.includes(lastGuess[i]))
        return false;
    }
  }

  return true;
};

export const makeGuess = (guess: string, game: Game) => {
  return {
    ...game,
    guesses: game.guesses.concat([guess]),
    scores: game.scores.concat([scoreGuess(guess, game.answer)]),
    guessesRemaining:
      guess === game.answer
        ? 0
        : game.guessesRemaining === 0
        ? 0
        : game.guessesRemaining - 1,
  };
};
