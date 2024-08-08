// components/Curves/Sinusoid.jsx
import React from 'react';
import DrawSinusoid from '../../draw/Curves/Sinusoid';
import useSinusoid from '../../hooks/Curves/Sinusoid';

const Sinusoid = () => {
  const [sinusoidParameters, handleParameterChange] = useSinusoid();

  return (
    <div>
      <h3>Sinusoid Curve</h3>
      <label>
        Amplitude:
        <input
          type="number"
          name="amplitude"
          value={sinusoidParameters.amplitude}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Frequency:
        <input
          type="number"
          name="frequency"
          value={sinusoidParameters.frequency}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Detail Level:
        <input
          type="number"
          name="detailLevel"
          value={sinusoidParameters.detailLevel}
          onChange={handleParameterChange}
        />
      </label>
      <DrawSinusoid sinusoidParameters={sinusoidParameters} />
    </div>
  );
};

export default Sinusoid;
