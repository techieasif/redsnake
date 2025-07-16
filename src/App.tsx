import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';
import { useSnakeGame } from './hooks/useSnakeGame';
import './App.css';

function App() {
  const { gameState, highScore, startGame, pauseGame, resetGame } = useSnakeGame();

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="game-title">🐍 Red Snake</h1>

        <ScoreBoard score={gameState.score} highScore={highScore} />

        <div className="game-area">
          <GameBoard snake={gameState.snake} food={gameState.food} />

          {gameState.gameOver && (
            <div className="game-over-overlay">
              <h2>Game Over!</h2>
              <p>Final Score: {gameState.score}</p>
            </div>
          )}

          {!gameState.isPlaying && !gameState.gameOver && (
            <div className="game-instructions">
              <h3>How to Play:</h3>
              <p>• Use arrow keys or WASD to move</p>
              <p>• Eat the red food to grow</p>
              <p>• Avoid hitting walls or yourself</p>
              <p>• Get the highest score!</p>
            </div>
          )}
        </div>

        <GameControls
          isPlaying={gameState.isPlaying}
          gameOver={gameState.gameOver}
          onStart={startGame}
          onPause={pauseGame}
          onRestart={resetGame}
        />
      </div>
    </div>
  );
}

export default App;
