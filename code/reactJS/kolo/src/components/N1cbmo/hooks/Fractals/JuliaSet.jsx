// hooks/Fractals/JuliaSet.jsx
import { useState } from 'react';

const useJuliaSet = () => {
  const [juliaSetParameters, setJuliaSetParameters] = useState({
    realPart: -0.72,
    imaginaryPart: 0.40015,
    iterations: 70,
    zoom: 0.6,
    offsetX: 0,
    offsetY: 0
  });

  const handleJuliaSetParameterChange = (e) => {
    const { name, value } = e.target;
    setJuliaSetParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [juliaSetParameters, handleJuliaSetParameterChange];
};

export default useJuliaSet;
