import { useState, useEffect, useCallback } from 'react';
import type { GameState, Position } from '../types/game';
import { Direction } from '../types/game';
import {
  getRandomPosition,
  checkCollision,
  checkFoodCollision,
  moveSnake,
  isOppositeDirection
} from '../utils/gameUtils';

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];

const INITIAL_STATE: GameState = {
  snake: INITIAL_SNAKE,
  food: getRandomPosition(),
  direction: Direction.RIGHT,
  gameOver: false,
  score: 0,
  isPlaying: false
};

const GAME_SPEED = 150;

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved) : 0;
  });

  const generateNewFood = useCallback((snake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = getRandomPosition();
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      ...INITIAL_STATE,
      food: generateNewFood(INITIAL_SNAKE)
    });
  }, [generateNewFood]);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prev => {
      if (isOppositeDirection(prev.direction, newDirection)) {
        return prev;
      }
      return { ...prev, direction: newDirection };
    });
  }, []);

  const gameLoop = useCallback(() => {
    setGameState(prev => {
      if (!prev.isPlaying || prev.gameOver) return prev;

      const newSnake = moveSnake(prev.snake, prev.direction);
      const head = newSnake[0];

      // Check collisions
      if (checkCollision(head, prev.snake)) {
        const finalScore = prev.score;
        if (finalScore > highScore) {
          setHighScore(finalScore);
          localStorage.setItem('snakeHighScore', finalScore.toString());
        }
        return { ...prev, gameOver: true, isPlaying: false };
      }

      // Check food collision
      if (checkFoodCollision(head, prev.food)) {
        const newFood = generateNewFood(newSnake);
        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          score: prev.score + 10
        };
      }

      // Normal movement (remove tail)
      newSnake.pop();
      return { ...prev, snake: newSnake };
    });
  }, [highScore, generateNewFood]);

  // Game loop effect
  useEffect(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    const gameInterval = setInterval(gameLoop, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [gameLoop, gameState.isPlaying, gameState.gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.isPlaying || gameState.gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          changeDirection(Direction.UP);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          changeDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          changeDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          changeDirection(Direction.RIGHT);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isPlaying, gameState.gameOver, changeDirection]);

  return {
    gameState,
    highScore,
    startGame,
    pauseGame,
    resetGame,
    changeDirection
  };
};
