import { useState } from 'react';

const useCardioid = () => {
  const [parameters, setParameters] = useState({
    radius: 50,
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

export default useCardioid;
