// components/Fractals/GosperCurve.jsx
import React from 'react';
import DrawGosperCurve from '../../draw/Fractals/GosperCurve';
import useGosperCurve from '../../hooks/Fractals/GosperCurve';

const GosperCurve = () => {
  const [gosperCurveParameters, handleGosperCurveParameterChange] = useGosperCurve();

  return (
    <div>
      <h3>Gosper Curve</h3>
      <label>
        Iterations:
        <input
          type="number"
          name="iterations"
          value={gosperCurveParameters.iterations}
          onChange={handleGosperCurveParameterChange}
        />
      </label>
      <label>
        Length:
        <input
          type="number"
          name="length"
          value={gosperCurveParameters.length}
          onChange={handleGosperCurveParameterChange}
        />
      </label>
      <DrawGosperCurve gosperCurveParameters={gosperCurveParameters} />
    </div>
  );
};

export default GosperCurve;
