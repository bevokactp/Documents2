// components/Curves/Nepheloid.jsx
import React from 'react';
import DrawNepheloid from '../../draw/Curves/Nepheloid';
import useNepheloid from '../../hooks/Curves/Nepheloid';

const Nepheloid = () => {
  const [parameters, handleParameterChange] = useNepheloid();

  return (
    <div>
      <h3>Nepheloid Curve</h3>
      <label>
        Amplitude X (A):
        <input
          type="number"
          name="amplitudeX"
          value={parameters.amplitudeX}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Amplitude Y (B):
        <input
          type="number"
          name="amplitudeY"
          value={parameters.amplitudeY}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Frequency Multiplier (C):
        <input
          type="number"
          name="frequencyMultiplier"
          value={parameters.frequencyMultiplier}
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
      <DrawNepheloid parameters={parameters} />
    </div>
  );
};

export default Nepheloid;
