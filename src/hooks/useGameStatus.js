import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);

  const linePoints = [40, 100, 300, 1200];

  useEffect(() => {
    if (rowsCleared > 0) {
      const points = linePoints[rowsCleared - 1] * level;
      setScore(prev => prev + points);
      setRows(prev => prev + rowsCleared);
    }
  }, [rowsCleared]);

  return [score, setScore, rows, setRows, level, setLevel];
}; 