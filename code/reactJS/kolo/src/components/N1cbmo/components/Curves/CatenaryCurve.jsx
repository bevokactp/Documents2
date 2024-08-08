import React from 'react';
import Draw from '../../draw/Curves/CatenaryCurve';
import hook from '../../hooks/Curves/CatenaryCurve';

const Component = () => {
  const [parameters, handleChange] = hook();

  return (
    <div>
      <h3>Catenary Curve</h3>
      <label>
        Amplitude:
        <input type="number" name="amplitude" value={parameters.amplitude} onChange={handleChange} />
      </label>
      <label>
        Horizontal Shift:
        <input type="number" name="horizontalShift" value={parameters.horizontalShift} onChange={handleChange} />
      </label>
      <label>
        Vertical Shift:
        <input type="number" name="verticalShift" value={parameters.verticalShift} onChange={handleChange} />
      </label>
      <Draw parameters={parameters} />
    </div>
  );
};

export default Component;
