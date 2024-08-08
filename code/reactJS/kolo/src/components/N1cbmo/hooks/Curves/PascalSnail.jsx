// hooks/Curves/PascalSnail.jsx
import { useState } from 'react';

const usePascalSnail = () => {
  const [curveParameters, setCurveParameters] = useState({
    radiusMultiplier: 90,
    offset: 60,
    detailLevel: 40
  });

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setCurveParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [curveParameters, handleParameterChange];
};

export default usePascalSnail;
