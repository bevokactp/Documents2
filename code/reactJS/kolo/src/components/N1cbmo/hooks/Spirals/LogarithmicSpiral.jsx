// hooks/Spirals/LogarithmicSpiral.jsx
import { useState } from 'react';

const useLogarithmicSpiral = () => {
  const [parameters, setParameters] = useState({
    initialRadius: 1,
    growthRate: 0.2,
    numTurns: 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameters(prevParams => ({
      ...prevParams,
      [name]: parseFloat(value)
    }));
  };

  return [parameters, handleChange];
};

export default useLogarithmicSpiral;
