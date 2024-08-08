// hooks/Curves/PolarRose.jsx
import { useState } from 'react';

const usePolarRose = () => {
  const [parameters, setParameters] = useState({
    numerator: 8,  // numerator of k (n/d)
    denominator: 2,  // Denominator of k (n/d)
    detail: 70,  // Number of points in the curve
    mode: 'sin'  // Mode can be 'cos' or 'sin'
  });

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setParameters((prevParameters) => ({
      ...prevParameters,
      [name]: name === 'mode' ? value : parseFloat(value) || 0
    }));
  };

  return [parameters, handleParameterChange];
};

export default usePolarRose;
