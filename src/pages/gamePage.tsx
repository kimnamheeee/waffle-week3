import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import GameButton from '../components/GameButton';
import GameGrid from '../components/GameGrid';
import Modal from '../components/Modal';
import ScoreBoard from '../components/ScoreBoard';
import useGame from '../hooks/useGame';
import useMultiModal from '../hooks/useMultiModal';
import { GameContext } from '../store/gameStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F8F6F2;
  height: 100vh;
  width: 100vw;
  padding: 24px 40px;
  box-sizing: border-box;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: #756452;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ScoreBoardContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export default function GamePage() {
  const { modals, open, close } = useMultiModal({
    restartGame: false,
    winGame: false,
    loseGame: false,
  });

  const context = useContext(GameContext);

  if (!context) {
    throw new Error('GamePage must be used within a GameProvider');
  }

  const { resetGame, checkWin, checkLose } = useGame();

  const { score, moves } = context;

  const hasWon = useRef(false);
  const hasLost = useRef(false);

  const handleRestartGame = (modalKey: string) => {
    close(modalKey);
    hasWon.current = false;
    hasLost.current = false;
    resetGame();
  };

  useEffect(() => {
    if (!hasWon.current && checkWin()) {
      hasWon.current = true;
      open('winGame');
    }
    if (!hasLost.current && checkLose()) {
      hasLost.current = true;
      open('loseGame');
    }
  }, [checkWin, checkLose, open]);

  return (
    <Container>
      <Header>
        <Title>2048</Title>
        <ScoreBoardContainer>
          <ScoreBoard type="score" />
          <ScoreBoard type="highScore" />
        </ScoreBoardContainer>
        <GameButton
          onClick={() => {
            open('restartGame');
          }}
        >
          New Game
        </GameButton>
      </Header>
      <GameGrid
        isModalOpen={modals.winGame || modals.loseGame || modals.restartGame}
      />
      {modals.restartGame && (
        <Modal
          primaryText="Start New Game"
          secondaryText="Cancel"
          onPrimaryButtonClick={() => {
            handleRestartGame('restartGame');
          }}
          onSecondaryButtonClick={() => {
            close('restartGame');
          }}
        >
          <h1>New Game</h1>
          <p>Are you sure you want to start a new game?</p>
        </Modal>
      )}
      {modals.winGame && (
        <Modal
          primaryText="Start New Game"
          secondaryText="Keep Playing"
          onPrimaryButtonClick={() => {
            handleRestartGame('winGame');
          }}
          onSecondaryButtonClick={() => {
            close('winGame');
          }}
        >
          <h1>You Win</h1>
          <p>
            You win the game! {score} points scored in {moves} moves.
          </p>
        </Modal>
      )}
      {modals.loseGame && (
        <Modal
          primaryText="Play Again"
          secondaryText="Undo"
          onPrimaryButtonClick={() => {
            handleRestartGame('loseGame');
          }}
          onSecondaryButtonClick={() => {
            close('loseGame');
          }}
        >
          <h1>Game Over</h1>
          <p>
            {score} points scored in {moves} moves.
          </p>
        </Modal>
      )}
    </Container>
  );
}
