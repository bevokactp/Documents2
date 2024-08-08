// hooks/Curves/ApollonianGasket.jsx
import { useState } from 'react';

const useApollonianGasket = () => {
  const [gasketParameters, setGasketParameters] = useState({
    recursionDepth: 6,
    circleRadius: 80
  });

  const handleGasketParameterChange = (e) => {
    const { name, value } = e.target;
    setGasketParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseInt(value, 10) || 0
    }));
  };

  return [gasketParameters, handleGasketParameterChange];
};

export default useApollonianGasket;
