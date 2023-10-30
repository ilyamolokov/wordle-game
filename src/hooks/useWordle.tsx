import * as Wordle from "../utils/wordle/wordle";
import { useState, useEffect, useCallback } from "react";
import words from "../constants/words";
import { random } from "../utils/random";
import { isLetter } from "../utils/isLetter";
import { Game } from "../@types/types";

export const useWordle = (): [Game, string, boolean] => {
  const [game, setGame] = useState<Game>(
    Wordle.createGame(words, words[random()], true)
  );
  const [guess, _setGuess] = useState("");
  const [valid, setValid] = useState(true);

  const setGuess = useCallback(
    (guess: string) => {
      _setGuess(guess);
      setValid(
        guess.length !== game.maxWordLength || Wordle.validateGuess(guess, game)
      );
    },
    [game]
  );

  const handleKey = useCallback(
    (e: any) => {
      const char: string = e.key.toLowerCase();
      if (char === "enter") {
        if (Wordle.validateGuess(guess, game)) {
          setGame(Wordle.makeGuess(guess, game));
          setGuess("");
        } else {
          setGuess(guess);
        }
      } else if (char === "backspace") {
        setGuess(guess.slice(0, -1));
      } else if (isLetter(char) && guess.length < game.maxWordLength) {
        setGuess(guess + char);
      }
    },
    [game, guess, setGuess]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return [game, guess, valid];
};
