import React, { useState, useEffect } from 'react';
import Board from './Board';
import Preview from './Preview';
import Help from './Help';
import HighScores from './HighScores';
import NameInput from './NameInput';
import { createBoard, checkCollision } from '../gameHelpers';
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useBoard } from '../hooks/useBoard';
import { useGameStatus } from '../hooks/useGameStatus';
import './styles.css';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('tetrisHighScores');
    return saved ? JSON.parse(saved) : Array(5).fill({ name: 'AAA', score: 0, level: 1 });
  });
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  
  const [player, updatePlayerPos, resetPlayer, playerRotate, nextPiece] = usePlayer();
  const [board, setBoard, rowsCleared] = useBoard(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const movePlayer = dir => {
    if (!checkCollision(player, board, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    // Reset everything
    setBoard(createBoard());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(1);
    setScoreSubmitted(false);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(board, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const handleNameSubmit = (playerName) => {
    if (scoreSubmitted) return;
    
    const newScore = { name: playerName, score, level };
    const newHighScores = [...highScores];
    
    const position = newHighScores.findIndex(s => score > s.score);
    
    if (position !== -1) {
      newHighScores.splice(position, 0, newScore);
      if (newHighScores.length > 5) {
        newHighScores.pop();
      }
    } else if (newHighScores.length < 5) {
      newHighScores.push(newScore);
    }

    setHighScores(newHighScores);
    localStorage.setItem('tetrisHighScores', JSON.stringify(newHighScores));
    setShowNameInput(false);
    setScoreSubmitted(true);
  };

  useEffect(() => {
    if (gameOver && !scoreSubmitted) {
      const lowestScore = highScores[highScores.length - 1]?.score ?? 0;
      if (score > lowestScore || highScores.length < 5) {
        setShowNameInput(true);
      }
    }
  }, [gameOver, score, highScores, scoreSubmitted]);

  return (
    <div 
      className="tetris-wrapper" 
      role="button" 
      tabIndex="0" 
      onKeyDown={e => move(e)} 
      onKeyUp={keyUp}
    >
      <Help isVisible={showHelp} onClose={() => setShowHelp(false)} />
      <NameInput 
        isVisible={showNameInput}
        onSubmit={handleNameSubmit}
        score={score}
        level={level}
      />
      <div className="tetris">
        <div className="game-status">
          <div className="display">
            <div>Score: <span>{score}</span></div>
            <div>Rows: <span>{rows}</span></div>
            <div>Level: <span>{level}</span></div>
            {gameOver ? (
              <>
                <div>Game Over</div>
                <button onClick={startGame}>New Game</button>
              </>
            ) : (
              <div>
                <button onClick={startGame}>Start Game</button>
                <button onClick={() => setShowHelp(true)}>Help</button>
              </div>
            )}
          </div>
          <div className="next-piece">
            <h3>Next Piece:</h3>
            <Preview piece={nextPiece} />
          </div>
        </div>
        <Board board={board} />
        <HighScores scores={highScores} />
      </div>
    </div>
  );
};

export default Tetris; 