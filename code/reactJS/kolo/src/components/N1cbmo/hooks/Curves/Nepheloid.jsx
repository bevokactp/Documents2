// hooks/Curves/Nepheloid.jsx
import { useState } from 'react';

const useNepheloid = () => {
  const [parameters, setParameters] = useState({
    amplitudeX: 77,  // Amplitude in the x-direction (A)
    amplitudeY: 78,  // Amplitude in the y-direction (B)
    frequencyMultiplier: 9, // Frequency multiplier (C)
    detail: 200      // Number of points used to draw the curve
  });

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [parameters, handleParameterChange];
};

export default useNepheloid;
