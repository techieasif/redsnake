import React from 'react';

interface GameControlsProps {
  isPlaying: boolean;
  gameOver: boolean;
  onStart: () => void;
  onPause: () => void;
  onRestart: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  isPlaying, 
  gameOver, 
  onStart, 
  onPause, 
  onRestart 
}) => {
  return (
    <div className="game-controls">
      {!isPlaying && !gameOver && (
        <button onClick={onStart} className="start-btn">
          Start Game
        </button>
      )}
      
      {isPlaying && !gameOver && (
        <button onClick={onPause} className="pause-btn">
          Pause
        </button>
      )}
      
      {gameOver && (
        <button onClick={onRestart} className="start-btn">
          Play Again
        </button>
      )}
      
      {(isPlaying || gameOver) && (
        <button onClick={onRestart} className="reset-btn">
          Reset
        </button>
      )}
    </div>
  );
};

export default GameControls;
