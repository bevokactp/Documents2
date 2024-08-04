// src/components/Counter.js
import React, { useContext } from 'react';
import { AppContext } from './context';

const Counter = () => {
  const { state, dispatch } = useContext(AppContext);

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <h2>Counter: {state.count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
