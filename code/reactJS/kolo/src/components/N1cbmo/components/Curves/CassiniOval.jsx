// components/Curves/CassiniOval.jsx
import React from 'react';
import DrawCassiniOval from '../../draw/Curves/CassiniOval';
import useCassiniOval from '../../hooks/Curves/CassiniOval';

const CassiniOval = () => {
  const [parameters, handleParameterChange] = useCassiniOval();

  return (
    <div>
      <h3>Cassini Oval Curve</h3>
      <label>
        Radius 1:
        <input
          type="number"
          name="radius1"
          value={parameters.radius1}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Radius 2:
        <input
          type="number"
          name="radius2"
          value={parameters.radius2}
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
      <DrawCassiniOval parameters={parameters} />
    </div>
  );
};

export default CassiniOval;
