import React, { useState, useEffect, useRef } from 'react';
import type { Position } from '../types/game';
import { GRID_SIZE } from '../utils/constants';

interface GameBoardProps {
  snake: Position[];
  food: Position;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food }) => {
  // Calculate responsive cell size based on container
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const size = Math.min(
          containerRef.current.offsetWidth,
          containerRef.current.offsetHeight || Infinity
        );
        setDimensions({ width: size, height: size });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const cellSize = dimensions.width / GRID_SIZE;
  const boardSize = cellSize * GRID_SIZE;

  const renderSnake = () => {
    return snake.map((segment, index) => (
      <div
        key={index}
        className={`snake-segment ${index === 0 ? 'snake-head' : ''}`}
        style={{
          position: 'absolute',
          left: `${segment.x * cellSize}px`,
          top: `${segment.y * cellSize}px`,
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          transform: `scale(${index === 0 ? 1.1 : 1})`,
          zIndex: index === 0 ? 3 : 2,
        }}
      />
    ));
  };

  const renderFood = () => {
    const foodSize = cellSize * 0.8;
    const foodMargin = cellSize * 0.1;
    
    return (
      <div
        className="food"
        style={{
          position: 'absolute',
          left: `${food.x * cellSize + foodMargin}px`,
          top: `${food.y * cellSize + foodMargin}px`,
          width: `${foodSize}px`,
          height: `${foodSize}px`,
        }}
      >
        <div className="food-dots">
          <div className="food-dot"></div>
          <div className="food-dot"></div>
        </div>
      </div>
    );
  };

  // Render Mario-style clouds in the background
  const renderClouds = () => {
    const clouds = [
      { top: '10%', left: '20%', size: '60px' },
      { top: '25%', left: '70%', size: '80px' },
      { top: '15%', left: '50%', size: '50px' },
    ];

    return clouds.map((cloud, index) => (
      <div
        key={index}
        className="cloud"
        style={{
          position: 'absolute',
          top: cloud.top,
          left: cloud.left,
          width: cloud.size,
          height: cloud.size,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    ));
  };

  // Render Mario-style ground
  const renderGround = () => {
    const groundTiles = [];
    const tileCount = Math.ceil(boardSize / cellSize);
    const groundY = boardSize - (2 * cellSize);
    
    for (let i = 0; i < tileCount; i++) {
      groundTiles.push(
        <div
          key={i}
          className="ground-tile"
          style={{
            position: 'absolute',
            left: `${i * cellSize}px`,
            top: `${groundY}px`,
            width: `${cellSize}px`,
            height: `${cellSize * 2}px`,
            backgroundPosition: `${-i * 10}% 0`,
          }}
        />
      );
    }
    
    return groundTiles;
  };

  return (
    <div className="game-area" ref={containerRef}>
      <div className="game-board" style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '600px',
        maxHeight: '600px',
        margin: '0 auto',
      }}>
        {/* Background elements */}
        <div className="sky" />
        {renderClouds()}
        
        {/* Game elements */}
        {renderGround()}
        <div className="grass-overlay" />
        {renderSnake()}
        {renderFood()}
        <div 
          className="grass-overlay"
          style={{
            position: 'absolute',
            bottom: `${GRID_SIZE * 2}px`,
            left: 0,
            right: 0,
            height: '20px',
            background: 'repeating-linear-gradient(45deg, #5cb800, #5cb800 10px, #4ca100 10px, #4ca100 20px)',
            zIndex: 1,
          }}
        />
      </div>
      {/* Game elements */}
      {renderGround()}
      <div className="grass-overlay" />
      {renderSnake()}
      {renderFood()}
      <div 
        className="grass-overlay"
        style={{
          position: 'absolute',
          bottom: `${GRID_SIZE * 2}px`,
          left: 0,
          right: 0,
          height: '20px',
          background: 'repeating-linear-gradient(45deg, #5cb800, #5cb800 10px, #4ca100 10px, #4ca100 20px)',
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default GameBoard;
