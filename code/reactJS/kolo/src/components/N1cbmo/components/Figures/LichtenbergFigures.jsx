import React from 'react';

import Draw from '../../draw/Figures/LichtenbergFigures';
import hook from '../../hooks/Figures/LichtenbergFigures';

const Component = () => {
  const [parameters, handleChange] = hook();

	return (
		<div>
			<h3>Lichtenberg Figures</h3>
			<label> Length Side: <input type="number" name="lengthSide" value={parameters.lengthSide} onChange={handleChange} /> </label>
			<label> Branching Factor: <input type="number" name="branchingFactor" value={parameters.branchingFactor} onChange={handleChange} /> </label>
			<Draw parameters={parameters} />
		</div>
	);
};

export default Component;

