// components/Curves/Hypotrochoid.jsx
import React from 'react';
import DrawHypotrochoid from '../../draw/Curves/Hypotrochoid';
import useHypotrochoid from '../../hooks/Curves/Hypotrochoid';

const Hypotrochoid = () => {
  const [parameters, handleParameterChange] = useHypotrochoid();

  return (
    <div>
      <h3>Hypotrochoid Curve</h3>
      <label>
        Large Circle Radius:
        <input
          type="number"
          name="largeCircleRadius"
          value={parameters.largeCircleRadius}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Small Circle Radius:
        <input
          type="number"
          name="smallCircleRadius"
          value={parameters.smallCircleRadius}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Tracing Point Distance:
        <input
          type="number"
          name="tracingPointDistance"
          value={parameters.tracingPointDistance}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Detail:
        <input
          type="number"
          name="detail"
          value={parameters.detail}
          onChange={handleParameterChange}
        />
      </label>
      <DrawHypotrochoid parameters={parameters} />
    </div>
  );
};

export default Hypotrochoid;
