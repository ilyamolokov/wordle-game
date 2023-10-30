import words from "../constants/words";

export const random = () => {
  return Math.floor(Math.random() * words.length);
};
