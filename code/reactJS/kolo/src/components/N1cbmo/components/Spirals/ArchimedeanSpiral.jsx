import React from 'react';
import Draw from '../../draw/Spirals/ArchimedeanSpiral';
import hook from '../../hooks/Spirals/ArchimedeanSpiral';

const Component = () => {
  const [parameters, handleChange] = hook();

  return (
    <div>
      <h3>Archimedean Spiral</h3>
      <label>
        Initial Radius:
        <input
          type="number"
          name="initialRadius"
          value={parameters.initialRadius}
          onChange={handleChange}
        />
      </label>
      <label>
        Angle Increment:
        <input
          type="number"
          name="angleIncrement"
          value={parameters.angleIncrement}
          onChange={handleChange}
        />
      </label>
      <Draw parameters={parameters} />
    </div>
  );
};

export default Component;
