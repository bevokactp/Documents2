import React from 'react';
import DrawGalileanSpiral from '../../draw/Spirals/GalileanSpiral';
import hook from '../../hooks/Spirals/GalileanSpiral'

const Component = () => {
  const [parameters, handleChange] = hook();
  return (
    <div>
      <h3>Galilean Spiral</h3>
      <label>
        Initial Radius:
        <input
          type="number"
          name="initialRadius"
          value={parameters.initialRadius}
          onChange={handleChange}
          step="1"
        />
      </label>
      <label>
        Angular Speed:
        <input
          type="number"
          name="angularSpeed"
          value={parameters.angularSpeed}
          onChange={handleChange}
          step="0.1"
        />
      </label>
      <label>
        Growth Rate:
        <input
          type="number"
          name="growthRate"
          value={parameters.growthRate}
          onChange={handleChange}
          step="0.1"
        />
      </label>
      <DrawGalileanSpiral parameters={parameters} />
    </div>
  );
};

export default Component;
