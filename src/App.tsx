import "./App.css";
import { useWordle } from "./hooks/useWordle";
import { Guess } from "./components/Guess/Guess";

function App() {
  const [game, guess, valid] = useWordle();

  const emptyRows = Array(Math.max(0, game.guessesRemaining - 1))
    .fill(0)
    .map((_, index) => (
      <Guess key={index} word={"".padStart(game.maxWordLength)} />
    ));

  return (
    <div className="app">
      {game.guesses.map((guess, index) => (
        <Guess key={index} word={guess} score={game.scores[index]} />
      ))}
      {game.guessesRemaining > 0 && (
        <Guess
          key="guess"
          active
          valid={valid}
          word={guess.padEnd(game.maxWordLength)}
        />
      )}
      {emptyRows}
    </div>
  );
}

export default App;
