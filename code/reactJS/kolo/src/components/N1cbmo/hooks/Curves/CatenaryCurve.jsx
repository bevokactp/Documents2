import { useState } from 'react';

const useCatenaryCurve = () => {
  const [parameters, setParameters] = useState({
    amplitude: 10,
    horizontalShift: 10,
    verticalShift: -15,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameters((prevParams) => ({
      ...prevParams,
      [name]: parseFloat(value) || 0, // Ensure it falls back to 0 if parsing fails
    }));
  };

  return [parameters, handleChange];
};

export default useCatenaryCurve;
