// Context setup for Sound component
import React, { createContext, useContext, useState } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <SoundContext.Provider value={{ state, setState }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
