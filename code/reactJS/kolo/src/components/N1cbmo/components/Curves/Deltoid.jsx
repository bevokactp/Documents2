// components/Curves/Deltoid.jsx
import React from 'react';
import DrawDeltoid from '../../draw/Curves/Deltoid';
import useDeltoid from '../../hooks/Curves/Deltoid';

const Deltoid = () => {
  const [parameters, handleParameterChange] = useDeltoid();

  return (
    <div>
      <h3>Deltoid Curve</h3>
      <label>
        Radius:
        <input
          type="number"
          name="radius"
          value={parameters.radius}
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
      <DrawDeltoid parameters={parameters} />
    </div>
  );
};

export default Deltoid;
