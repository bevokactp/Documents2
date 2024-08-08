import React from 'react';
import DrawGoldenSpiral from '../../draw/Spirals/GoldenSpiral';
import hook from '../../hooks/Spirals/GoldenSpiral';

const Component = () => {
  const [parameters, handleChange] = hook();
  return (
    <div>
      <h3>Golden Spiral</h3>
      <label>
        Initial Radius:
        <input type="number" name="initialRadius" value={parameters.initialRadius} onChange={handleChange} />
      </label>
      <label>
        Number of Turns:
        <input type="number" name="numberOfTurns" value={parameters.numberOfTurns} onChange={handleChange} />
      </label>
      <DrawGoldenSpiral parameters={parameters} />
    </div>
  );
};

export default Component;
