import React from 'react';

const Help = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>How to Play Tetris</h2>
        <div className="modal-content">
          <h3>Controls:</h3>
          <ul>
            <li>← → : Move piece left/right</li>
            <li>↑ : Rotate piece</li>
            <li>↓ : Drop piece faster</li>
          </ul>
          <h3>Rules:</h3>
          <ul>
            <li>Complete lines to score points</li>
            <li>Score more points by clearing multiple lines at once</li>
            <li>Level increases every 10 lines</li>
            <li>Game ends when pieces reach the top</li>
          </ul>
          <h3>Scoring:</h3>
          <ul>
            <li>1 line: 40 points × level</li>
            <li>2 lines: 100 points × level</li>
            <li>3 lines: 300 points × level</li>
            <li>4 lines: 1200 points × level</li>
          </ul>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Help; 