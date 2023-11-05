import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isIncrementing, setIsIncrementing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isIncrementing) {
      // Creează un interval care incrementează contorul la fiecare 100 ms
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 100);
    } else {
      // Curăță intervalul când nu mai este necesar
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    // Curăță intervalul când componenta este demontată
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isIncrementing]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          variant="contained"
          color="primary"
          onMouseDown={() => setIsIncrementing(true)}
          onMouseUp={() => setIsIncrementing(false)}
          onMouseLeave={() => setIsIncrementing(false)}
          onClick={() => setCount((count)=>count+1)}
        >
          count is {count}
        </Button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
