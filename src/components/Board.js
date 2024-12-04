import React from 'react';
import Cell from './Cell';

const Board = ({ board }) => (
  <div className="board">
    {board.map((row, y) =>
      row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell[0]} />)
    )}
  </div>
);

export default Board; 