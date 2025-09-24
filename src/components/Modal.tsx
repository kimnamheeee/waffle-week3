import styled from 'styled-components';
import GameButton from './GameButton';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Content = styled.div`
    background-color: #EBE7DA;
    border-radius: 22px;
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    color: #988876;
    gap: 32px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

interface ModalProps {
  children: React.ReactNode;
  primaryText: string;
  secondaryText: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
}

export default function Modal({
  children,
  primaryText,
  secondaryText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: ModalProps) {
  return (
    <Container>
      <Content>
        {children}
        <ButtonContainer>
          <GameButton
            onClick={onPrimaryButtonClick}
          >
            {primaryText}
          </GameButton>
          <GameButton
            onClick={onSecondaryButtonClick}
            variant="ghost"
          >
            {secondaryText}
          </GameButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
}
