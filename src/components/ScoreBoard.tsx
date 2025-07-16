import React from 'react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
  return (
    <div className="score-board">
      <div className="score">Score: {score}</div>
      <div className="high-score">High Score: {highScore}</div>
    </div>
  );
};

export default ScoreBoard;
