import { useEffect } from 'react';
import useGame from './useGame';

export default function useGameControls(isModalOpen = false) {
  const { moveBoard } = useGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          moveBoard('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          moveBoard('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          moveBoard('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          moveBoard('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveBoard, isModalOpen]);
}
