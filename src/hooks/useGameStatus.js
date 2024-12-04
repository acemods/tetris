import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);

  const getLinePoints = useCallback(() => [40, 100, 300, 1200], []);

  useEffect(() => {
    if (rowsCleared > 0) {
      const points = getLinePoints()[rowsCleared - 1] * level;
      setScore(prev => prev + points);
      setRows(prev => prev + rowsCleared);
    }
  }, [level, rowsCleared, getLinePoints]);

  return [score, setScore, rows, setRows, level, setLevel];
}; 