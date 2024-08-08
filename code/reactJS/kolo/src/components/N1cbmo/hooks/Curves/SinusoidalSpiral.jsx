// hooks/Curves/SinusoidalSpiral.jsx
import { useState } from 'react';

const useSinusoidalSpiral = () => {
  const [spiralParameters, setSpiralParameters] = useState({
    amplitude: 5,
    frequency: 5,
    detail: 50
  });

  const handleSpiralParameterChange = (e) => {
    const { name, value } = e.target;
    setSpiralParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [spiralParameters, handleSpiralParameterChange];
};

export default useSinusoidalSpiral;
