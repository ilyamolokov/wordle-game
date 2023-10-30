import { Game } from "../../@types/types";
import * as Wordle from "./wordle";

describe("scoreGuess", () => {
  it("identifies correct letters", () => {
    expect(Wordle.scoreGuess("a", "a")).toEqual(["C"]);
  });

  it("identifies incorrect letters", () => {
    expect(Wordle.scoreGuess("b", "a")).toEqual(["I"]);
  });

  it("identifies almost letters", () => {
    expect(Wordle.scoreGuess("bx", "ab")).toEqual(["A", "I"]);
  });

  it("it matches letters only once", () => {
    expect(Wordle.scoreGuess("cczy", "abcd")).toEqual(["A", "I", "I", "I"]);
  });

  it("it matches correct letters first", () => {
    expect(Wordle.scoreGuess("zdyd", "abcd")).toEqual(["I", "I", "I", "C"]);
  });

  it.each([
    // guess, answer, result
    // no dupe in answer, dupe in guess
    ["zyxx", "abcd", "IIII"], // 1
    ["cczy", "abcd", "AIII"], // 2
    ["aazy", "abcd", "CIII"], // 3
    ["zdyd", "abcd", "IIIC"], // 4
    // dupe in answer, dupe in guess
    ["zzyx", "abcb", "IIII"], // 5
    ["bzby", "abcb", "AIAI"], // 6
    ["zbby", "abcb", "ICAI"], // 7
    ["zybb", "abcb", "IIAC"], // 8
    ["zbyb", "abcb", "ICIC"], // 9
    // dupe in answer, no dupe in guess
    ["zbxy", "abcb", "ICII"], // 10
    ["bzyx", "abcb", "AIII"], // 11
  ])("guess: %s, answer: %s, result: %s", (guess, answer, result) => {
    expect(Wordle.scoreGuess(guess, answer)).toEqual(result.split(""));
  });
});

describe("validateGuess", () => {
  let game: Game;

  beforeEach(() => {
    const dictionary = ["aaaa", "aabb", "bbaa", "bbbb", "bbba", "aaab"];
    const answer = "aaab";
    game = Wordle.createGame(dictionary, answer, false);
  });

  it("accepts words that ARE in the dictionary", () => {
    expect(Wordle.validateGuess("aaaa", game)).toEqual(true);
  });

  it("rejects words that ARE NOT in the dictionary", () => {
    expect(Wordle.validateGuess("cccc", game)).toEqual(false);
  });

  it("rejects words that have already been guessed", () => {
    game = Wordle.makeGuess("aaaa", game);
    expect(Wordle.validateGuess("aaaa", game)).toEqual(false);
  });

  it("accepts words that do not use known CORRECT letters in EASY mode", () => {
    game = Wordle.makeGuess("aabb", game);
    expect(Wordle.validateGuess("bbaa", game)).toEqual(true);
  });

  it("rejects words that do not use known CORRECT letters in HARD mode", () => {
    game = Wordle.makeGuess("aabb", game);
    game.hardMode = true;
    expect(Wordle.validateGuess("bbaa", game)).toEqual(false);
  });

  it("rejects words that do not use known ALMOST letters in HARD mode", () => {
    game = Wordle.makeGuess("bbba", game);
    game.hardMode = true;
    expect(Wordle.validateGuess("aaaa", game)).toEqual(false);
  });
});
