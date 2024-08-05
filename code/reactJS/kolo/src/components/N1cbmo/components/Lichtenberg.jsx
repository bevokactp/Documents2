import React from 'react';

import Draw from '../draw/Lichtenberg';


const Component = ({ parameters, handleChange }) => {
  return (
	<div>
		<h1>Lichtenberg Figures</h1>
		<label> Length Side: <input type="number" name="lengthSide" value={parameters.lengthSide} onChange={handleChange} /> </label>
		<label> Branching Factor: <input type="number" name="branchingFactor" value={parameters.branchingFactor} onChange={handleChange} /> </label>
		<Draw parameters={parameters} />
  	</div>
  );
};

export default Component;

