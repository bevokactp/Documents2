// hooks/Fractals/MinkowskiCurve.jsx
import { useState } from 'react';

const useMinkowskiCurve = () => {
  const [minkowskiCurveParameters, setMinkowskiCurveParameters] = useState({
    iterations: 6,
    length: 10,
    scale: 1
  });

  const handleMinkowskiCurveParameterChange = (e) => {
    const { name, value } = e.target;
    setMinkowskiCurveParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [minkowskiCurveParameters, handleMinkowskiCurveParameterChange];
};

export default useMinkowskiCurve;
