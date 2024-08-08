// hooks/Fractals/GosperCurve.jsx
import { useState } from 'react';

const useGosperCurve = () => {
  const [gosperCurveParameters, setGosperCurveParameters] = useState({
    iterations: 3,
    length: 5
  });

  const handleGosperCurveParameterChange = (e) => {
    const { name, value } = e.target;
    setGosperCurveParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [gosperCurveParameters, handleGosperCurveParameterChange];
};

export default useGosperCurve;
