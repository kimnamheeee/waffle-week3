import styled from 'styled-components';

interface GameButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'ghost';
}

const Container = styled.button<{variant: 'primary' | 'ghost'}>`
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ variant }) => (variant === 'primary' ? 'white' : '#998C7E')};
    background-color: ${({ variant }) => (variant === 'primary' ? '#998C7E' : 'transparent')};
    border: ${({ variant }) => (variant === 'primary' ? 'none' : '2px solid #998C7E')};
    padding: 8px 16px;
    font-size: 16px;
    min-width: 116px;
    min-height: 40px;
`;

export default function GameButton({ children, onClick, variant = 'primary' }: GameButtonProps) {
  return <Container onClick={onClick} variant={variant}>{children}</Container>;
}
