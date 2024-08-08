import React from 'react';
import DrawLogarithmicSpiral from '../../draw/Spirals/LogarithmicSpiral';
import hook from '../../hooks/Spirals/LogarithmicSpiral';

const Component = () => {
  const [parameters, handleChange] = hook();
  return (
    <div>
      <h3>Logarithmic Spiral</h3>
      <label>
        Initial Radius:
        <input type="number" name="initialRadius" value={parameters.initialRadius} onChange={handleChange} />
      </label>
      <label>
        Growth Rate:
        <input type="number" name="growthRate" value={parameters.growthRate} onChange={handleChange} step="0.1" />
      </label>
      <label>
        Number of Turns:
        <input type="number" name="numTurns" value={parameters.numTurns} onChange={handleChange} />
      </label>
      <DrawLogarithmicSpiral parameters={parameters} />
    </div>
  );
};

export default Component;
