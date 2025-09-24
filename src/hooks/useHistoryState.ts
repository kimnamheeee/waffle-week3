import { useCallback, useState } from 'react';

export default function useHistoryState<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [pointer, setPointer] = useState(0);

  const state = history[pointer];

  const pushHistory = useCallback(
    (state: T) => {
      setHistory((prev) => [...prev.slice(0, pointer + 1), state]);
      setPointer(pointer + 1);
    },
    [pointer]
  );

  const undo = useCallback(() => {
    setPointer((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const redo = useCallback(() => {
    setPointer((prev) =>
      prev < history.length - 1 ? prev + 1 : history.length - 1
    );
  }, [history.length]);

  return { undo, redo, pushHistory, state };
}
