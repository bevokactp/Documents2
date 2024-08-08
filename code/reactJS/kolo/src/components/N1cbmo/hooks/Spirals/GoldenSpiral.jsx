import { useState } from 'react';

const useGoldenSpiral = () => {
  const [parameters, setParameters] = useState({
    initialRadius: 6,
    numberOfTurns: 8,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameters((prevParams) => ({
      ...prevParams,
      [name]: parseFloat(value),
    }));
  };

  return [parameters, handleChange];
};

export default useGoldenSpiral;
