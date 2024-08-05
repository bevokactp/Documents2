import React from 'react';

import Draw from '../draw/PoligonsRegular';


const Component = ({ parameters, handleChange }) => {
  return (
      <div>
        <h1>PolygonsRegular Shapes</h1>
        <label> Size: <input type="number" name="size" value={parameters.size} onChange={handleChange} /> </label>
        <label> Border Color: <input type="color" name="borderColor" value={parameters.borderColor} onChange={handleChange} /> </label>
        <label> Fill Color: <input type="color" name="fillColor" value={parameters.fillColor} onChange={handleChange} /> </label>
        <label> Border Width: <input type="number" name="borderWidth" value={parameters.borderWidth} onChange={handleChange} /> </label>
        <label> Sides: <input type="number" name="sides" value={parameters.sides} onChange={handleChange} /> </label>
        <label> Transparent Fill: <input type="checkbox" name="makeTransparent" checked={parameters.makeTransparent} onChange={handleChange} /> </label>
        <label> Show Radiuses: <input type="checkbox" name="showRadiuses" checked={parameters.showRadiuses} onChange={handleChange} /> </label>
        <Draw {...parameters} />
      </div>
  );
};

export default Component;

