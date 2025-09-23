import { createContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { type Cell, INITIAL_BOARD } from '../types/board';

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
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [board, setBoard] = useState<Cell[][]>(INITIAL_BOARD);
  const [moves, setMoves] = useState(0);

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
