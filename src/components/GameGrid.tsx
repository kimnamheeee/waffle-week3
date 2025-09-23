import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import useGame from '../hooks/useGame';
import useGameControls from '../hooks/useGameControls';
import { GameContext } from '../store/gameStore';
import GameBlock from './GameBlock';

const GridBlock = styled.div`
    width: 100%;
    height: 100%;
    background-color: #BDAC98;
    border-radius: 8px;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    aspect-ratio: 1 / 1;
    width: auto;
    height: 50vh;
    border-radius: 8px;
    padding: 8px;
    background-color: #9C8A7B;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

export default function GameGrid() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('GameGrid must be used within a GameProvider');
  }

  const { initializeGame } = useGame();
  useGameControls();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const { board } = context;

  return (
    <GridContainer>
      {board.flat().map((cell, index) => (
        <GridBlock key={index}>{cell && <GameBlock score={cell} />}</GridBlock>
      ))}
    </GridContainer>
  );
}
