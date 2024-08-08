// hooks/Curves/ClothoidCurve.jsx
import { useState } from 'react';

const useClothoidCurve = () => {
  const [parameters, setParameters] = useState({
    initialRadius: 80,
    scalingFactor: 80,
    curvatureGrowthRate: 9,
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

export default useClothoidCurve;
