// components/Fractals/JuliaSet.jsx
import React from 'react';
import DrawJuliaSet from '../../draw/Fractals/JuliaSet';
import useJuliaSet from '../../hooks/Fractals/JuliaSet';

const JuliaSet = () => {
  const [juliaSetParameters, handleJuliaSetParameterChange] = useJuliaSet();

  return (
    <div>
      <h3>Julia Set</h3>
      <label>
        Real Part:
        <input
          type="number"
          step="0.01"
          name="realPart"
          value={juliaSetParameters.realPart}
          onChange={handleJuliaSetParameterChange}
        />
      </label>
      <label>
        Imaginary Part:
        <input
          type="number"
          step="0.01"
          name="imaginaryPart"
          value={juliaSetParameters.imaginaryPart}
          onChange={handleJuliaSetParameterChange}
        />
      </label>
      <label>
        Iterations:
        <input
          type="number"
          name="iterations"
          value={juliaSetParameters.iterations}
          onChange={handleJuliaSetParameterChange}
        />
      </label>
      <label>
        Zoom:
        <input
          type="number"
          step="0.01"
          name="zoom"
          value={juliaSetParameters.zoom}
          onChange={handleJuliaSetParameterChange}
        />
      </label>
      <label>
        Offset X:
        <input
          type="number"
          step="0.01"
          name="offsetX"
          value={juliaSetParameters.offsetX}
          onChange={handleJuliaSetParameterChange}
        />
      </label>
      <label>
        Offset Y:
        <input
          type="number"
          step="0.01"
          name="offsetY"
          value={juliaSetParameters.offsetY}
          onChange={handleJuliaSetParameterChange}
        />
      </label>
      <DrawJuliaSet juliaSetParameters={juliaSetParameters} />
    </div>
  );
};

export default JuliaSet;
