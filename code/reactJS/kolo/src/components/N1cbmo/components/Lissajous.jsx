import React from 'react';

import Draw from '../draw/Lissajous';


const Component = ({ parameters, handleChange }) => {
  return (
	<div>
	<h1>Lissajous Figures</h1>
	<label> Length Side: <input type="number" name="lengthSide" value={parameters.lengthSide} onChange={handleChange} /> </label>
	<label> A: <input type="number" name="a" value={parameters.a} onChange={handleChange} /> </label>
	<label> B: <input type="number" name="b" value={parameters.b} onChange={handleChange} /> </label>
	<label> Delta: <input type="number" step="0.01" name="delta" value={parameters.delta} onChange={handleChange} /> </label>
	<Draw parameters={parameters} />
  </div>
  );
};

export default Component;

