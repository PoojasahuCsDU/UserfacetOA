import React from 'react';

const GameBoard = ({ grid }) => {
  return (
    <div className="game-board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="game-row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`game-cell ${cell ? 'filled' : ''}`}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;