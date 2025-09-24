import { GameProvider } from './store/gameStore';
import GlobalStyle from './styles/GlobalStyle';
import GamePage from './pages/gamePage';

const App = () => {
  return (
    <GameProvider>
      <GlobalStyle />
      <GamePage />
    </GameProvider>
  );
};

export default App;
