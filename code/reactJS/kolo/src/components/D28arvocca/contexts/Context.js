// Context setup for D28arvocca component
import React, { createContext, useContext, useState } from 'react';

const D28arvoccaContext = createContext();

export const D28arvoccaProvider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <D28arvoccaContext.Provider value={{ state, setState }}>
      {children}
    </D28arvoccaContext.Provider>
  );
};

export const useD28arvocca = () => useContext(D28arvoccaContext);
