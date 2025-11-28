import { createContext, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { type Cell, INITIAL_BOARD } from '../types/board';
import { load, save } from './utils';

interface GameContextType {
  score: number;
  highScore: number;
  board: Cell[][];
  moves: number;
  setScore: Dispatch<SetStateAction<number>>;
  setHighScore: Dispatch<SetStateAction<number>>;
  setBoard: Dispatch<SetStateAction<Cell[][]>>;
  setMoves: Dispatch<SetStateAction<number>>;
}

export const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState(() => load('score', 0));
  const [highScore, setHighScore] = useState(() => load('highScore', 0));
  const [board, setBoard] = useState<Cell[][]>(() =>
    load('board', INITIAL_BOARD)
  );
  const [moves, setMoves] = useState(() => load('moves', 0));

  useEffect(() => {
    save('score', score);
  }, [score]);
  useEffect(() => {
    save('highScore', highScore);
  }, [highScore]);
  useEffect(() => {
    save('board', board);
  }, [board]);
  useEffect(() => {
    save('moves', moves);
  }, [moves]);

  return (
    <GameContext.Provider
      value={{
        score,
        highScore,
        board,
        moves,
        setScore,
        setHighScore,
        setBoard,
        setMoves,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
