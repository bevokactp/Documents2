// hooks/Curves/BezierCurve.jsx

import { useState } from 'react';

const Hook = () => {
  const [parameters, setParameters] = useState({
    controlPoints: [{ x: 0, y: 0 }, { x: 100, y: 100 }, { x: 200, y: 0 }],
    curveResolution: 100,
  });

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const index = parseInt(dataset.index);
    setParameters((prevParams) => ({
      ...prevParams,
      [name]: prevParams[name].map((point, i) =>
        i === index ? { ...point, [dataset.field]: parseFloat(value) } : point
      ),
    }));
  };

  return [parameters, handleChange];
};

export default Hook;
