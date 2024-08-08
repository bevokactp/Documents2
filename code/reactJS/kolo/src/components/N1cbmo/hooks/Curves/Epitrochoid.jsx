// hooks/Curves/Epitrochoid.jsx
import { useState } from 'react';

const useEpitrochoid = () => {
  const [parameters, setParameters] = useState({
	primaryRadius: 120,
    secondaryRadius: 20,
    offsetDistance: 50,
    resolution: 40
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

export default useEpitrochoid;
