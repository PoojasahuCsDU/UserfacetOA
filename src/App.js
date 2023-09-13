import React, { useState, useEffect } from 'react';
import './App.css';

import TetrisGame from './component/TetrisGame';
import GameBoard from './component/GameBoard';
import ScoreDisplay from './component/ScoreDisplay';


export default function App() {
  const [currentBlock, setCurrentBlock] = useState({ word: '', row: 0, col: 0 });
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [phrases, setPhrases] = useState([
    "We design and develop applications",
    "that run the world and",
    "showcase the future",
  ]);
  const [wordPool, setWordPool] = useState([
    'We', 'design', 'and', 'develop', 'applications',
    'that', 'run', 'the', 'world', 'and',
    'showcase', 'the', 'future',
  ]);

  return (
    <div className="app-container">
      <div className='header'>
      <img className='img'
          src="data:image/jpeg;base64,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"
          alt="logo"
        />
      </div>
      <ScoreDisplay score={score} />
      <div className="game-container">
        <GameBoard grid={grid} />
      </div>
      <TetrisGame
        grid={grid}
        setGrid={setGrid}
        currentBlock={currentBlock}
        setCurrentBlock={setCurrentBlock}
        score={score}
        setScore={setScore}
        phrases={phrases}
        wordPool={wordPool}
      />
      
    </div>
  );
}
