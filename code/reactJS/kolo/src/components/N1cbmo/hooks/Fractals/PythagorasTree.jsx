// hooks/Fractals/usePythagorasTree.js
import { useState } from 'react';

const usePythagorasTree = () => {
  const [pythagorasTreeParameters, setPythagorasTreeParameters] = useState({
    angle: 45,
    width: 80,
    recursion: 10,
    colorGradient: true
  });

  const handlePythagorasTreeParameterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPythagorasTreeParameters((prevParameters) => ({
      ...prevParameters,
      [name]: type === 'checkbox' ? checked : parseFloat(value) || 0
    }));
  };

  return [pythagorasTreeParameters, handlePythagorasTreeParameterChange];
};

export default usePythagorasTree;
