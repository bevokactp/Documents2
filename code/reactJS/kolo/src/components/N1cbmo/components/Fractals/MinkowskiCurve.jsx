// components/Fractals/MinkowskiCurve.jsx
import React from 'react';
import DrawMinkowskiCurve from '../../draw/Fractals/MinkowskiCurve';
import useMinkowskiCurve from '../../hooks/Fractals/MinkowskiCurve';

const MinkowskiCurve = () => {
  const [minkowskiCurveParameters, handleMinkowskiCurveParameterChange] = useMinkowskiCurve();

  return (
    <div>
      <h3>Minkowski Curve</h3>
      <label>
        Iterations:
        <input
          type="number"
          name="iterations"
          value={minkowskiCurveParameters.iterations}
          onChange={handleMinkowskiCurveParameterChange}
        />
      </label>
      <label>
        Length:
        <input
          type="number"
          name="length"
          value={minkowskiCurveParameters.length}
          onChange={handleMinkowskiCurveParameterChange}
        />
      </label>
      <label>
        Scale:
        <input
          type="number"
          name="scale"
          value={minkowskiCurveParameters.scale}
          step="0.1"
          onChange={handleMinkowskiCurveParameterChange}
        />
      </label>
      <DrawMinkowskiCurve minkowskiCurveParameters={minkowskiCurveParameters} />
    </div>
  );
};

export default MinkowskiCurve;
