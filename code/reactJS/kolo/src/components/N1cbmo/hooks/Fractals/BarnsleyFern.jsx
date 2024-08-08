// hooks/Fractals/BarnsleyFern.jsx
import { useState } from 'react';

const useBarnsleyFern = () => {
  const [fernParameters, setFernParameters] = useState({
    iterations: 500000
  });

  const handleFernParameterChange = (e) => {
    const { name, value } = e.target;
    setFernParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseInt(value, 10) || 0
    }));
  };

  return [fernParameters, handleFernParameterChange];
};

export default useBarnsleyFern;
