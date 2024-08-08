import React from 'react';

import Draw from '../../draw/HarmonicCurves/LissajousFigures';
import hook from '../../hooks/HarmonicCurves/LissajousFigures';

const Component = () => {
  const [parameters, handleChange] = hook();

	return (
		<div>
			<h3

			>Lissajous Figures</h3>
			<label> Length Side: <input type="number" name="lengthSide" value={parameters.lengthSide} onChange={handleChange} /> </label>
			<label> A: <input type="number" name="a" value={parameters.a} onChange={handleChange} /> </label>
			<label> B: <input type="number" name="b" value={parameters.b} onChange={handleChange} /> </label>
			<label> Delta: <input type="number" step="0.01" name="delta" value={parameters.delta} onChange={handleChange} /> </label>
			<Draw parameters={parameters} />
		</div>
	);
};

export default Component;

