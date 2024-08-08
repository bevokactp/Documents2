import { useState } from 'react';

const useReuleauxTriangle = () => {
  const [parameters, setParameters] = useState({
    sideLength: 150,
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

export default useReuleauxTriangle;
