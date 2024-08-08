import React from 'react';
import DrawHyperbolicSpiral from '../../draw/Spirals/HyperbolicSpiral';
import hook from '../../hooks/Spirals/HyperbolicSpiral';

const Component = () => {
  const [parameters, handleChange] = hook();
  return (
    <div>
      <h3>Hyperbolic Spiral</h3>
      <label>
        Initial Radius:
        <input type="number" name="initialRadius" value={parameters.initialRadius} onChange={handleChange} />
      </label>
      <label>
        Number of Turns:
        <input type="number" name="numberOfTurns" value={parameters.numberOfTurns} onChange={handleChange} />
      </label>
      <DrawHyperbolicSpiral parameters={parameters} />
    </div>
  );
};

export default Component;
