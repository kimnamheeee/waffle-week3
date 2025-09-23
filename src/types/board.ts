export type Cell = number | null;
export const INITIAL_BOARD: Cell[][] = Array.from({ length: 4 }, () =>
  Array(4).fill(null)
);
