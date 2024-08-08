import { useState } from 'react';


const Hook = () => {
  const [parameters, setParameters] = useState({
    lengthSide: 300,
    a: 5,
    b: 4,
    delta: 0.5,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameters((prevParams) => ({
      ...prevParams,
      [name]: parseFloat(value),
    }));
  };


  return [parameters, handleChange]
};

export default Hook;
