import styled from 'styled-components';

interface GameButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Container = styled.button`
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #998C7E;
    padding: 8px 16px;
    font-size: 16px;
    min-width: 116px;
    min-height: 40px;
`;

export default function GameButton({ children, onClick }: GameButtonProps) {
  return <Container onClick={onClick}>{children}</Container>;
}
