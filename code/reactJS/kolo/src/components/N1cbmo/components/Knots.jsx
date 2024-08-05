import React from 'react';

import Draw from '../draw/Knots';


const Component = ({ parameters, handleChange }) => {
  return (
      <div>
        <h1>Knot Writing</h1>
        {parameters.map((rope, index) => (
          <div key={index}>
            <label> Thickness: <input type="number" value={rope.thickness} onChange={(e) => handleChange(index, 'thickness', e.target.value)} /> </label>
            <label> Color: <input type="color" value={rope.color} onChange={(e) => handleChange(index, 'color', e.target.value)} /> </label>
            <label> Length: <input type="number" value={rope.length} onChange={(e) => handleChange(index, 'length', e.target.value)} /> </label>
            <label> Knots: <input type="text" value={rope.knots ? rope.knots.join(',') : ''} onChange={(e) => handleChange(index, 'knots', e.target.value)} /> </label>
          </div>
        ))}
        <Draw parameters={parameters} />
      </div>
  );
};

export default Component;

