import styled from 'styled-components';
import GameButton from '../components/GameButton';
import GameGrid from '../components/GameGrid';
import ScoreBoard from '../components/ScoreBoard';
import useGame from '../hooks/useGame';

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
    const { resetGame } = useGame();

    return (
        <Container>
        <Header>
          <Title>2048</Title>
          <ScoreBoardContainer>
            <ScoreBoard type="score" />
            <ScoreBoard type="highScore" />
          </ScoreBoardContainer>
          <GameButton onClick={() => {resetGame()}}>New Game</GameButton>
        </Header>
        <GameGrid />
      </Container>
    )
}