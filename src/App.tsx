import GamePage from './pages/gamePage';
import { GameProvider } from './store/gameStore';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
  return (
    <GameProvider>
      <GlobalStyle />
      <GamePage />
    </GameProvider>
  );
};

export default App;
