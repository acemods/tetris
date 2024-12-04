import React, { useState } from 'react';

const NameInput = ({ isVisible, onSubmit, score, level }) => {
  const [playerName, setPlayerName] = useState('');

  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(playerName || 'Anonymous');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New High Score!</h2>
        <div className="modal-content">
          <p>Score: {score}</p>
          <p>Level: {level}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              maxLength={15}
              autoFocus
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NameInput; 