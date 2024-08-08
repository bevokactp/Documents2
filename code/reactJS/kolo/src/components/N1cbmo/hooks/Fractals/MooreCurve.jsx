// hooks/Fractals/MooreCurve.jsx
import { useState } from 'react';

const useMooreCurve = () => {
  const [mooreCurveParameters, setMooreCurveParameters] = useState({
    iterations: 5,
    lineLength: 10,
    angle: 90
  });

  const handleMooreCurveParameterChange = (e) => {
    const { name, value } = e.target;
    setMooreCurveParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [mooreCurveParameters, handleMooreCurveParameterChange];
};

export default useMooreCurve;
