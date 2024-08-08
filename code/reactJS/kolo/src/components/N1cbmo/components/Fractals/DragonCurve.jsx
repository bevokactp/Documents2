// components/Fractals/DragonCurve.jsx
import React from 'react';
import DrawDragonCurve from '../../draw/Fractals/DragonCurve';
import useDragonCurve from '../../hooks/Fractals/DragonCurve';

const DragonCurve = () => {
  const [dragonCurveParameters, handleDragonCurveParameterChange] = useDragonCurve();

  return (
    <div>
      <h3>Dragon Curve</h3>
      <label>
        Iterations:
        <input
          type="number"
          name="iterations"
          value={dragonCurveParameters.iterations}
          onChange={handleDragonCurveParameterChange}
        />
      </label>
      <label>
        Segment Length:
        <input
          type="number"
          name="segmentLength"
          value={dragonCurveParameters.segmentLength}
          onChange={handleDragonCurveParameterChange}
        />
      </label>
      <DrawDragonCurve dragonCurveParameters={dragonCurveParameters} />
    </div>
  );
};

export default DragonCurve;
