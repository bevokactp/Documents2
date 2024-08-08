// hooks/Curves/CassiniOval.jsx
import { useState } from 'react';

const useCassiniOval = () => {
  const [parameters, setParameters] = useState({
    radius1: 50,
    radius2: 30,
    detail: 20
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

export default useCassiniOval;
