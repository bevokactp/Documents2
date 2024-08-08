import React from 'react';

import Draw from '../../draw/Figures/ChladniFigures';
import hook from '../../hooks/Figures/ChladniFigures';

const Component = () => {
  const [parameters, handleChange] = hook();

  return (
	<div>
		<h3>Chladni</h3>
		<label> Length Side: <input type="number" name="lengthSide" value={parameters.lengthSide} onChange={handleChange} /> </label>
		<label> Frequency: <input type="number" step="0.01" name="frequency" value={parameters.frequency} onChange={handleChange} /> </label>
		<label> Amplitude: <input type="number" name="amplitude" value={parameters.amplitude} onChange={handleChange} /> </label>
		<label> Step: <input type="number" name="step" value={parameters.step} onChange={handleChange} /> </label>
		<Draw parameters={parameters} />
  	</div>
  );
};

export default Component;

