import React from 'react';

const Preview = ({ piece }) => {
  return (
    <div className="preview">
      <div className="preview-board">
        {piece.shape.map((row, y) => (
          <div key={y} className="preview-row">
            {row.map((cell, x) => (
              <div key={x} className={`preview-cell ${cell || 0}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview; 