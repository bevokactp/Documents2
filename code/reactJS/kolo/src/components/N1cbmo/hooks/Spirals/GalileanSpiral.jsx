import { useState } from 'react';

const useGalileanSpiral = () => {
  const [parameters, setParameters] = useState({
    initialRadius: 20,
    angularSpeed: 1.5,
    growthRate: 0.5,
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

export default useGalileanSpiral;
