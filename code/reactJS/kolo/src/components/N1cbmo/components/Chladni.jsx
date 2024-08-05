import React from 'react';

import Draw from '../draw/Chladni';


const Component = ({ parameters, handleChange }) => {
  return (
	<div>
		<h1>Chladni</h1>
		<label> Length Side: <input type="number" name="lengthSide" value={parameters.lengthSide} onChange={handleChange} /> </label>
		<label> Frequency: <input type="number" step="0.01" name="frequency" value={parameters.frequency} onChange={handleChange} /> </label>
		<label> Amplitude: <input type="number" name="amplitude" value={parameters.amplitude} onChange={handleChange} /> </label>
		<label> Step: <input type="number" name="step" value={parameters.step} onChange={handleChange} /> </label>
		<Draw parameters={parameters} />
  	</div>
  );
};

export default Component;

