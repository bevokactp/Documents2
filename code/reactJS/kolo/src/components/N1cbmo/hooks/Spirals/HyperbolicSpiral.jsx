import { useState } from 'react';

const useHyperbolicSpiral = () => {
  const [parameters, setParameters] = useState({
    initialRadius: 400,
    numberOfTurns: 10,
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

export default useHyperbolicSpiral;
