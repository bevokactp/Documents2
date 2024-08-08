import React from 'react';
import DrawFermatSpiral from '../../draw/Spirals/FermatSpiral';
import hook from '../../hooks/Spirals/FermatSpiral';

const Component = () => {
  const [parameters, handleChange] = hook();
  return (
    <div>
      <h3>Fermat Spiral</h3>
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
        Growth Factor:
        <input
          type="number"
          name="growthFactor"
          value={parameters.growthFactor}
          onChange={handleChange}
        />
      </label>
      <DrawFermatSpiral parameters={parameters} />
    </div>
  );
};

export default Component;
