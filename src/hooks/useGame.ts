import { useContext } from 'react';
import { GameContext } from '../store/gameStore';
import { INITIAL_BOARD } from '../types/board';
import { moveMapIn2048Rule } from '../utils/2048';
import { chooseRandomNumber } from '../utils/random';

type Direction = 'up' | 'down' | 'left' | 'right';

function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }

  const {
    score,
    highScore,
    board,
    moves,
    setScore,
    setHighScore,
    setBoard,
    setMoves,
  } = context;

  const resetGame = () => {
    setScore(0);
    setHighScore(0);
    setMoves(0);
    setBoard(INITIAL_BOARD);
  };

  const initializeGame = () => {
    addRandomBlock();
  };

  const addScore = (scoreToAdd: number) => {
    const newScore = score + scoreToAdd;
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  const addRandomBlock = () => {
    setBoard((prevBoard) => {
      const emptyCells = prevBoard
        .flatMap((row, i) =>
          row.map((cell, j) => (cell === null ? { x: i, y: j } : null))
        )
        .filter(Boolean) as { x: number; y: number }[];

      if (emptyCells.length === 0) return prevBoard;

      const { x, y } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const randomNumber = chooseRandomNumber([2, 4]);

      const newBoard = prevBoard.map((row) => [...row]);
      newBoard[x][y] = randomNumber;
      return newBoard;
    });
  };

  const moveBoard = (direction: Direction) => {
    const { result, isMoved, scoreToAdd } = moveMapIn2048Rule(board, direction);
    if (!isMoved) return;

    addScore(scoreToAdd);

    setBoard(result);
    setMoves(moves + 1);
    addRandomBlock();
  };

  return {
    moveBoard,
    resetGame,
    initializeGame,
  };
}

export default useGame;
