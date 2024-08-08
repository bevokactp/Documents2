import { useState } from 'react';


const Hook = () => {
  const [parameters, setParameters] = useState({
    size: 200,
    borderColor: '#109',
    fillColor: '#f2f',
    borderWidth: 2,
    sides: 5,
    makeTransparent: false,
    showRadiuses: false,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParameters((prevParams) => ({
      ...prevParams,
      [name]: type === 'checkbox' ? checked : (name === 'borderColor' || name === 'fillColor' ? value : parseFloat(value)),
    }));
  };


  return [parameters, handleChange]
};

export default Hook;
