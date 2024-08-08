// hooks/Fractals/DragonCurve.jsx
import { useState } from 'react';

const useDragonCurve = () => {
  const [dragonCurveParameters, setDragonCurveParameters] = useState({
    iterations: 14,
    segmentLength: 3
  });

  const handleDragonCurveParameterChange = (e) => {
    const { name, value } = e.target;
    setDragonCurveParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [dragonCurveParameters, handleDragonCurveParameterChange];
};

export default useDragonCurve;
