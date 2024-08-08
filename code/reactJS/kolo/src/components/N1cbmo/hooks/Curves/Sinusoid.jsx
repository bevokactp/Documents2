// hooks/Curves/Sinusoid.jsx
import { useState } from 'react';

const useSinusoid = () => {
  const [sinusoidParameters, setSinusoidParameters] = useState({
    amplitude: 50,
    frequency: 1,
    detailLevel: 100
  });

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setSinusoidParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [sinusoidParameters, handleParameterChange];
};

export default useSinusoid;
