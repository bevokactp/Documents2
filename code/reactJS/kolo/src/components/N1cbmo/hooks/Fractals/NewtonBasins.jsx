// hooks/Fractals/NewtonBasins.jsx
import { useState } from 'react';

const useNewtonBasins = () => {
  const [newtonBasinsParameters, setNewtonBasinsParameters] = useState({
    width: 400,
    height: 400,
    iterations: 30,
    tolerance: 1e-6,
    scale: 200,
    offsetX: 0,
    offsetY: 0
  });

  const handleNewtonBasinsParameterChange = (e) => {
    const { name, value } = e.target;
    setNewtonBasinsParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [newtonBasinsParameters, handleNewtonBasinsParameterChange];
};

export default useNewtonBasins;
