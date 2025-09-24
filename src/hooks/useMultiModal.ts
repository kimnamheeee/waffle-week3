import { useState } from 'react';

export default function useMultiModal(initialStates: Record<string, boolean>) {
  const [modals, setModals] = useState(initialStates);

  const open = (key: string) => {
    setModals((prev) => ({ ...prev, [key]: true }));
  };
  const close = (key: string) => {
    setModals((prev) => ({ ...prev, [key]: false }));
  };

  return { modals, open, close };
}
