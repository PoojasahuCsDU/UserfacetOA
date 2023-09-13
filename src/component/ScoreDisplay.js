// ScoreDisplay.js
import "./ScoreDisplay.css";
import React from 'react';

const ScoreDisplay = ({ score }) => {
  return (
    <div className="score-display">
      <h3>Score</h3>
      <div className="score" > {score}</div>
    </div>
  );
};

export default ScoreDisplay;