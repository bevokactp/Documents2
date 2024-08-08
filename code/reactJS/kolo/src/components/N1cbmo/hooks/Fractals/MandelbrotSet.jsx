// hooks/Fractals/MandelbrotSet.jsx
import { useState } from 'react';

const useMandelbrotSet = () => {
  const [mandelbrotParameters, setMandelbrotParameters] = useState({
    width: 400,
    height: 400,
    minReal: -1.5,
    maxReal: 0.5,
    minImaginary: -1.5,
    maxImaginary: 1.5,
    maxIterations: 100
  });

  const handleMandelbrotParameterChange = (e) => {
    const { name, value } = e.target;
    setMandelbrotParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [mandelbrotParameters, handleMandelbrotParameterChange];
};

export default useMandelbrotSet;
