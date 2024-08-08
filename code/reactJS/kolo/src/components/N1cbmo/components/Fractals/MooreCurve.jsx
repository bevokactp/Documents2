// components/Fractals/MooreCurve.jsx
import React from 'react';
import DrawMooreCurve from '../../draw/Fractals/MooreCurve';
import useMooreCurve from '../../hooks/Fractals/MooreCurve';

const MooreCurve = () => {
  const [mooreCurveParameters, handleMooreCurveParameterChange] = useMooreCurve();

  return (
    <div>
      <h3>Moore Curve</h3>
      <label>
        Iterations:
        <input
          type="number"
          name="iterations"
          value={mooreCurveParameters.iterations}
          onChange={handleMooreCurveParameterChange}
        />
      </label>
      <label>
        Line Length:
        <input
          type="number"
          name="lineLength"
          value={mooreCurveParameters.lineLength}
          onChange={handleMooreCurveParameterChange}
        />
      </label>
      <label>
        Angle:
        <input
          type="number"
          name="angle"
          value={mooreCurveParameters.angle}
          onChange={handleMooreCurveParameterChange}
        />
      </label>
      <DrawMooreCurve mooreCurveParameters={mooreCurveParameters} />
    </div>
  );
};

export default MooreCurve;
