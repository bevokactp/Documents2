// components/Curves/Cardioid.jsx
import React from 'react';
import DrawCardioid from '../../draw/Curves/Cardioid';
import useCardioid from '../../hooks/Curves/Cardioid';

const Cardioid = () => {
  const [parameters, handleParameterChange] = useCardioid();

  return (
    <div>
      <h3>Cardioid Curve</h3>
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
      <DrawCardioid parameters={parameters} />
    </div>
  );
};

export default Cardioid;
