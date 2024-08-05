import { useState } from 'react';


const Hook = () => {
  const [parameters, setParameters] = useState({
    lengthSide: 300,
    frequency: 0.1,
    amplitude: 10,
    step: 2,
    countSides: 5,
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
