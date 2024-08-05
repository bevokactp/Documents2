// Context setup for N1cbmo component
import React, { createContext, useContext, useState } from 'react';

const N1cbmoContext = createContext();

export const N1cbmoProvider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <N1cbmoContext.Provider value={{ state, setState }}>
      {children}
    </N1cbmoContext.Provider>
  );
};

export const useN1cbmo = () => useContext(N1cbmoContext);
