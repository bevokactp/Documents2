// components/Figures/ReuleauxTriangle.jsx
import React from 'react';
import Draw from '../../draw/Figures/ReuleauxTriangle';
import hook from '../../hooks/Figures/ReuleauxTriangle';

const Component = () => {
  const [parameters, handleChange] = hook();
  return (
    <div>
      <h3>Reuleaux Triangle</h3>
      <label> Side Length: <input type="number" name="sideLength" value={parameters.sideLength} onChange={handleChange} /> </label>
      <Draw parameters={parameters} />
    </div>
  );
};

export default Component;
