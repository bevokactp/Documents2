import { useState } from 'react';

const useAstroidParameters = () => {
  const [parameters, setParameters] = useState({
    radius: 50,
    detail: 20,
  });

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setParameters((prevParams) => ({
      ...prevParams,
      [name]: parseFloat(value),
    }));
  };

  return [parameters, handleParameterChange];
};

export default useAstroidParameters;
