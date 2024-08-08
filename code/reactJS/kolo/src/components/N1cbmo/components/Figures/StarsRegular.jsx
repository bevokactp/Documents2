import React from 'react';

import Draw from '../../draw/Figures/StarsRegular';
import hook from '../../hooks/Figures/StarsRegular';

const Component = () => {
  const [parameters, handleChange] = hook();
  return (
    <div>
      <h3>Stars</h3>
      <label> Size: <input type="number" name="size" value={parameters.size} onChange={handleChange} /> </label>
      <label> Border Color: <input type="color" name="borderColor" value={parameters.borderColor} onChange={handleChange} /> </label>
      <label> Fill Color: <input type="color" name="fillColor" value={parameters.fillColor} onChange={handleChange} /> </label>
      <label> Border Width: <input type="number" name="borderWidth" value={parameters.borderWidth} onChange={handleChange} /> </label>
      <label> Points: <input type="number" name="points" value={parameters.points} onChange={handleChange} /> </label>
      <label> Transparent Fill: <input type="checkbox" name="makeTransparent" checked={parameters.makeTransparent} onChange={handleChange} /> </label>
      <label> Show Radiuses: <input type="checkbox" name="showRadiuses" checked={parameters.showRadiuses} onChange={handleChange} /> </label>
      <Draw {...parameters} />
    </div>
  );
};

export default Component;

