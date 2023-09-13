import React, { useState, useEffect } from 'react';

const TetrisGame = () => {
  const [grid, setGrid] = useState([]);
  const [currentBlock, setCurrentBlock] = useState({ word: '', row: 0, col: 0 });
  const [score, setScore] = useState(0);
  const [phrases, setPhrases] = useState(['We design and develop applications', 'that run the world and','showcase the future']); 
  
  const [wordPool, setWordPool] = useState(['We', 'design', 'and', 'develop', 'applications', 'that', 'run', 'the', 'world', 'and','showcase', 'the', 'future']); 

  // Function to generate a random word from the word pool
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordPool.length);
    return wordPool[randomIndex];
  };

  const handlePhraseCompletion = () => {
    const phraseToCheck = phrases.find((phrase) => phrase === currentBlock.word);
    if (phraseToCheck) {
      
      const updatedPhrases = phrases.filter((phrase) => phrase !== phraseToCheck);
      setPhrases(updatedPhrases);

      
      setScore(score + 1);
    }
  };


  const generateNewBlock = () => {
    const newWord = getRandomWord();
    setCurrentBlock({ word: newWord, row: 0, col: Math.floor(grid[0].length / 2) }); 
  };

  useEffect(() => {
    const initialGrid = Array.from({ length: 10 }, () => Array(10).fill(''));
    setGrid(initialGrid);

    
    const gameLoopInterval = setInterval(() => {
      
      if (currentBlock.row < grid.length - 1) {
        const newGrid = [...grid];
        
        newGrid[currentBlock.row][currentBlock.col] = '';
      
        const newRow = currentBlock.row + 1;
        newGrid[newRow][currentBlock.col] = currentBlock.word;

        setGrid(newGrid);
        setCurrentBlock({ ...currentBlock, row: newRow });
      } else {
       
        handlePhraseCompletion();
        generateNewBlock();
      }
    }, 1000);

    
    return () => clearInterval(gameLoopInterval);
  }, [currentBlock, grid, score]);

  
  const handleBlockMovement = (direction) => {
    if (direction === 'left' && currentBlock.col > 0) {
      const newCol = currentBlock.col - 1;
      setCurrentBlock({ ...currentBlock, col: newCol });
    } else if (direction === 'right' && currentBlock.col < grid[0].length - 1) {
      const newCol = currentBlock.col + 1;
      setCurrentBlock({ ...currentBlock, col: newCol });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleBlockMovement('left');
      } else if (e.key === 'ArrowRight') {
        handleBlockMovement('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentBlock,generateNewBlock,handleBlockMovement,handlePhraseCompletion]);

  const gridJSX = grid.map((row, rowIndex) => (
    <div key={rowIndex} className="row">
      {row.map((cell, colIndex) => (
        <div key={colIndex} className={`cell ${cell ? 'filled' : ''}`}>
          {cell}
        </div>
      ))}
    </div>
  ));

  return (
    <div className="game-container">
      {gridJSX}
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default TetrisGame;
