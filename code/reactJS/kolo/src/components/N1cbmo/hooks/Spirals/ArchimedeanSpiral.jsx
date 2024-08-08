import { useState } from 'react';

const useArchimedeanSpiral = () => {
  const [parameters, setParameters] = useState({
    initialRadius: 1,
    angleIncrement: 1,
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

export default useArchimedeanSpiral;
