import { useCallback, useContext } from 'react';
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
    setMoves(0);
    setBoard(INITIAL_BOARD);
    initializeGame();
  };

  const checkWin = useCallback(() => {
    return board.some((row) => row.some((cell) => cell === 128));
  }, [board]);

  const checkLose = useCallback((): boolean => {
    const size = board.length;

    const hasEmpty = board.some((row) => row.some((cell) => cell === null));
    if (hasEmpty) return false;

    const canMergeHorizontal = board.some((row) =>
      row.some((cell, x) => x < size - 1 && cell === row[x + 1])
    );
    if (canMergeHorizontal) return false;

    const canMergeVertical = board.some((row, y) =>
      row.some((cell, x) => y < size - 1 && cell === board[y + 1][x])
    );
    if (canMergeVertical) return false;

    return true;
  }, [board]);

  const addScore = useCallback(
    (scoreToAdd: number) => {
      const newScore = score + scoreToAdd;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
      }
    },
    [score, highScore, setScore, setHighScore]
  );

  const addRandomBlock = useCallback(() => {
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
  }, [setBoard]);

  const initializeGame = useCallback(() => {
    const isEmpty = board.every((row) => row.every((cell) => cell === null));
    if (isEmpty) {
      addRandomBlock();
      addRandomBlock();
    }
  }, [board, addRandomBlock]);

  const moveBoard = useCallback(
    (direction: Direction) => {
      const { result, isMoved, scoreToAdd } = moveMapIn2048Rule(
        board,
        direction
      );
      if (!isMoved) return;

      addScore(scoreToAdd);

      setBoard(result);
      setMoves(moves + 1);
      addRandomBlock();
    },
    [board, moves, addScore, setBoard, setMoves, addRandomBlock]
  );

  return {
    moveBoard,
    resetGame,
    initializeGame,
    checkWin,
    checkLose,
  };
}

export default useGame;
