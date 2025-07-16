import type { Position } from '../types/game';
import { Direction, GRID_SIZE, CANVAS_SIZE } from '../types/game';

export const getRandomPosition = (): Position => {
  const maxPosition = CANVAS_SIZE / GRID_SIZE;
  return {
    x: Math.floor(Math.random() * maxPosition),
    y: Math.floor(Math.random() * maxPosition)
  };
};

export const checkCollision = (head: Position, snake: Position[]): boolean => {
  // Check wall collision
  if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || 
      head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
    return true;
  }
  
  // Check self collision
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
};

export const checkFoodCollision = (head: Position, food: Position): boolean => {
  return head.x === food.x && head.y === food.y;
};

export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const newSnake = [...snake];
  const head = { ...newSnake[0] };
  
  switch (direction) {
    case Direction.UP:
      head.y -= 1;
      break;
    case Direction.DOWN:
      head.y += 1;
      break;
    case Direction.LEFT:
      head.x -= 1;
      break;
    case Direction.RIGHT:
      head.x += 1;
      break;
  }
  
  newSnake.unshift(head);
  return newSnake;
};

export const isOppositeDirection = (current: Direction, new_direction: Direction): boolean => {
  const opposites = {
    [Direction.UP]: Direction.DOWN,
    [Direction.DOWN]: Direction.UP,
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT
  };
  
  return opposites[current] === new_direction;
};
