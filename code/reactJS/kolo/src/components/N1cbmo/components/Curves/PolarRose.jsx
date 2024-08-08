// components/Curves/PolarRose.jsx
import React from 'react';
import DrawPolarRose from '../../draw/Curves/PolarRose';
import usePolarRose from '../../hooks/Curves/PolarRose';

const PolarRose = () => {
  const [parameters, handleParameterChange] = usePolarRose();

  return (
    <div>
      <h3>Polar Rose Curve</h3>
      <label>
        Numerator
        <input
          type="number"
          name="numerator"
          value={parameters.numerator}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Denominator:
        <input
          type="number"
          name="denominator"
          value={parameters.denominator}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Detail:
        <input
          type="number"
          name="detail"
          value={parameters.detail}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Mode:
        <select name="mode" value={parameters.mode} onChange={handleParameterChange}>
          <option value="cos">Cosine</option>
          <option value="sin">Sine</option>
        </select>
      </label>
      <DrawPolarRose parameters={parameters} />
    </div>
  );
};

export default PolarRose;
