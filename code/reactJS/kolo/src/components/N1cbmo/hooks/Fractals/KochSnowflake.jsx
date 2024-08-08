// hooks/Fractals/KochSnowflake.jsx
import { useState } from 'react';

const useKochSnowflake = () => {
  const [kochSnowflakeParameters, setKochSnowflakeParameters] = useState({
    iterations: 3,
    length: 300
  });

  const handleKochSnowflakeParameterChange = (e) => {
    const { name, value } = e.target;
    setKochSnowflakeParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseFloat(value) || 0
    }));
  };

  return [kochSnowflakeParameters, handleKochSnowflakeParameterChange];
};

export default useKochSnowflake;
