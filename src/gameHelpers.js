export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const createBoard = () =>
  Array.from(Array(BOARD_HEIGHT), () =>
    new Array(BOARD_WIDTH).fill([0, 'clear'])
  );

export const checkCollision = (player, board, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (player.tetromino[y][x] !== 0) {
        // 2. Check boundary conditions
        const newX = x + player.pos.x + moveX;
        const newY = y + player.pos.y + moveY;
        
        if (
          // Check vertical bounds
          !board[newY] ||
          // Check horizontal bounds
          newX < 0 || 
          newX >= BOARD_WIDTH ||
          // Check collision with other pieces
          (board[newY] && board[newY][newX] && board[newY][newX][1] !== 'clear')
        ) {
          return true;
        }
      }
    }
  }
  return false;
}; 