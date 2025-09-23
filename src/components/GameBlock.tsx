import styled from 'styled-components';

interface GameBlockProps {
  score: number;
}

const BLOCK_STYLES = {
  2: { bg: '#eee4da', color: '#776e65' },
  4: { bg: '#ede0c8', color: '#776e65' },
  8: { bg: '#f2b179', color: '#f9f6f2' },
  16: { bg: '#f59563', color: '#f9f6f2' },
  32: { bg: '#f67c5f', color: '#f9f6f2' },
  64: { bg: '#f65e3b', color: '#f9f6f2' },
  128: { bg: '#edcf72', color: '#f9f6f2' },
  256: { bg: '#edcc61', color: '#f9f6f2' },
  512: { bg: '#edc850', color: '#f9f6f2' },
  1024: { bg: '#edc53f', color: '#f9f6f2' },
  2048: { bg: '#edc22e', color: '#f9f6f2' },
} as const;

const getBlockStyle = (score: number) => {
  if (score in BLOCK_STYLES) {
    return BLOCK_STYLES[score as keyof typeof BLOCK_STYLES];
  }
  return { bg: '#cdc1b4', color: '#776e65' };
};

const getFontSize = (score: number) => {
  if (score >= 1024) return '1.8rem';
  if (score >= 128) return '2rem';
  return '2.5rem';
};

const Container = styled.div<{ score: number }>`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    background-color: ${({ score }) => getBlockStyle(score).bg};
    color: ${({ score }) => getBlockStyle(score).color};
    font-size: ${({ score }) => getFontSize(score)};
    font-weight: bold;
    border-radius: 8px;
`;

export default function GameBlock({ score }: GameBlockProps) {
  return <Container score={score}>{score}</Container>;
}
