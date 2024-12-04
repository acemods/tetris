import React from 'react';

const HighScores = ({ scores }) => {
  return (
    <div className="high-scores">
      <h2>High Scores</h2>
      <div className="scores-list">
        {scores.map((score, index) => (
          <div key={index} className="score-item">
            <span className="rank">#{index + 1}</span>
            <span className="name">{score.name}</span>
            <span className="score">{score.score}</span>
            <span className="level">Level {score.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighScores; 