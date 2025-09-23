export const chooseRandomNumber = (numbers: number[]) => {
  return numbers[Math.floor(Math.random() * numbers.length)];
};
