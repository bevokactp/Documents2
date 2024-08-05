import { useState } from 'react';


const Hook = () => {
  const [parameters, setParameters] = useState([
    { thickness: 2, color: '#222', length: 350, knots: [-1, -1, 0, 0, 1, 5, -1, 1, 0] },
    { thickness: 3, color: '#2d2', length: 400, knots: [0, -1, 1, 4, 1, 5, -1, 3, 2] },
    { thickness: 3, color: '#de5', length: 100, knots: [0, 1, 0] },
    { thickness: 1, color: '#ba4', length: 100, knots: [0] },
  ]);

  const handleChange = (index, key, value) => {
    setParameters((prevParams) => {
      const newParams = [...prevParams];
      if (key === 'knots') {
        newParams[index][key] = value.split(',').map(Number);
      } else {
        newParams[index][key] = key === 'color' ? value : parseFloat(value);
      }
      return newParams;
    });
  }

  return [parameters, handleChange];
};

export default Hook;
