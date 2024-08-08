// components/Curves/SinusoidalSpiral.jsx
import React from 'react';
import DrawSinusoidalSpiral from '../../draw/Curves/SinusoidalSpiral';
import useSinusoidalSpiral from '../../hooks/Curves/SinusoidalSpiral';

const SinusoidalSpiral = () => {
  const [spiralParameters, handleSpiralParameterChange] = useSinusoidalSpiral();

  return (
    <div>
      <h3>Sinusoidal Spiral Curve</h3>
      <label>
        Amplitude:
        <input
          type="number"
          name="amplitude"
          value={spiralParameters.amplitude}
          onChange={handleSpiralParameterChange}
        />
      </label>
      <label>
        Frequency:
        <input
          type="number"
          name="frequency"
          value={spiralParameters.frequency}
          onChange={handleSpiralParameterChange}
        />
      </label>
      <label>
        Detail:
        <input
          type="number"
          name="detail"
          value={spiralParameters.detail}
          onChange={handleSpiralParameterChange}
        />
      </label>
      <DrawSinusoidalSpiral spiralParameters={spiralParameters} />
    </div>
  );
};

export default SinusoidalSpiral;
