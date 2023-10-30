import words from "../words";

export const random = () => {
  return Math.floor(Math.random() * words.length);
};
