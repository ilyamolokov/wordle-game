import { GuessScore } from "../../@types/types";

type GuessProps = {
  word: string;
  score?: GuessScore;
  active?: boolean;
  valid?: boolean;
};

export const Guess = (props: GuessProps) => {
  const { word, score, active, valid = true } = props

  return (
    <div
      className={
        score || active
          ? valid === false
            ? "guess invalid"
            : "guess"
          : "guess inactive"
      }
    >
      {word.split("").map((letter, index) => (
        <div key={index} className={`letter ${score && score[index]}`}>
          <div>{letter}</div>
        </div>
      ))}
    </div>
  );
};
