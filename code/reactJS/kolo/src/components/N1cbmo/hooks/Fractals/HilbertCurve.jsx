// hooks/Fractals/HilbertCurve.jsx
import { useState } from 'react';

const useHilbertCurve = () => {
  const [hilbertCurveParameters, setHilbertCurveParameters] = useState({
    iterations: 6,
    size: 400,
    angle: 90
  });

  const handleHilbertCurveParameterChange = (e) => {
    const { name, value } = e.target;
    setHilbertCurveParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [hilbertCurveParameters, handleHilbertCurveParameterChange];
};

export default useHilbertCurve;
