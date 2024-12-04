import { useState, useEffect } from 'react';
import { createBoard } from '../gameHelpers';

export const useBoard = (player, resetPlayer) => {
  const [board, setBoard] = useState(createBoard());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = newBoard => {
      let clearedRows = 0;
      const sweptBoard = newBoard.reduce((acc, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          clearedRows += 1;
          acc.unshift(new Array(newBoard[0].length).fill([0, 'clear']));
          return acc;
        }
        acc.push(row);
        return acc;
      }, []);

      if (clearedRows > 0) {
        setRowsCleared(clearedRows);
      }
      return sweptBoard;
    };

    const updateBoard = prevBoard => {
      // First flush the old tetromino
      const newBoard = prevBoard.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const newY = y + player.pos.y;
            const newX = x + player.pos.x;
            
            // Check if within bounds
            if (newY >= 0 && newY < newBoard.length && newX >= 0 && newX < newBoard[0].length) {
              newBoard[newY][newX] = [
                value,
                `${player.collided ? 'merged' : 'clear'}`,
              ];
            }
          }
        });
      });

      // Check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newBoard);
      }

      return newBoard;
    };

    setBoard(prev => updateBoard(prev));
  }, [player, resetPlayer]);

  return [board, setBoard, rowsCleared];
}; 