// hooks/Curves/Hypotrochoid.jsx
import { useState } from 'react';

const useHypotrochoid = () => {
  const [parameters, setParameters] = useState({
    largeCircleRadius: 159,  // Radius of the fixed larger circle (R)
    smallCircleRadius: 53,   // Radius of the rolling smaller circle (r)
    tracingPointDistance: 72, // Distance from the center of the small circle to the tracing point (d)
    detail: 40              // Number of points used to draw the curve
  });

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [parameters, handleParameterChange];
};

export default useHypotrochoid;
