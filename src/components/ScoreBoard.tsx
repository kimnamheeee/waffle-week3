import { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../store/gameStore';

const Container = styled.div<{ type: 'score' | 'highScore' }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 14px;
    background-color: ${({ type }) => (type === 'score' ? '#EAE7D9' : 'none')};
    outline: ${({ type }) => (type === 'score' ? 'none' : '2px solid #EAE7D9')};
    padding: 8px 16px;
    width: fit-content;
    color: #988876;
    min-width: 55px;
`;

const Score = styled.span`
    font-size: 0.75rem;
    font-weight: 500;
`;

const ScoreValue = styled.span`
    font-size: 1.25rem;
    font-weight: 700;
`;

interface ScoreBoardProps {
  type: 'score' | 'highScore';
}

export default function ScoreBoard({ type }: ScoreBoardProps) {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('ScoreBoard must be used within a GameProvider');
  }

  const { score, highScore } = context;

  return (
    <Container type={type}>
      <Score>{type === 'score' ? 'SCORE' : 'BEST'}</Score>
      <ScoreValue>{type === 'score' ? score : highScore}</ScoreValue>
    </Container>
  );
}
