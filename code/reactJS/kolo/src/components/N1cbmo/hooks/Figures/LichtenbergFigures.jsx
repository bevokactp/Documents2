import { useState } from 'react';


const Hook = () => {
  const [parameters, setParameters] = useState({
    lengthSide: 300,
    branchingFactor: 60,
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
