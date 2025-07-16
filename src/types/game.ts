export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameOver: boolean;
  score: number;
  isPlaying: boolean;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const Direction = {
  UP: 'UP' as Direction,
  DOWN: 'DOWN' as Direction,
  LEFT: 'LEFT' as Direction,
  RIGHT: 'RIGHT' as Direction,
};

export const GRID_SIZE = 24; // Slightly larger grid cells
export const CANVAS_SIZE = 600; // Larger play area
