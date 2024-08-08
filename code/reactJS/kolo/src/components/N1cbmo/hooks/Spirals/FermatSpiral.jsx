import { useState } from 'react';

const useFermatSpiral = () => {
  const [parameters, setParameters] = useState({
    initialRadius: 9,
    growthFactor: 5,
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

export default useFermatSpiral;
