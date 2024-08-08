// components/Fractals/MandelbrotSet.jsx
import React from 'react';
import DrawMandelbrotSet from '../../draw/Fractals/MandelbrotSet';
import useMandelbrotSet from '../../hooks/Fractals/MandelbrotSet';

const MandelbrotSet = () => {
  const [mandelbrotParameters, handleMandelbrotParameterChange] = useMandelbrotSet();

  return (
    <div>
      <h3>Mandelbrot Set</h3>
      <label>
        Width:
        <input
          type="number"
          name="width"
          value={mandelbrotParameters.width}
          onChange={handleMandelbrotParameterChange}
        />
      </label>
      <label>
        Height:
        <input
          type="number"
          name="height"
          value={mandelbrotParameters.height}
          onChange={handleMandelbrotParameterChange}
        />
      </label>
      <label>
        Min Real:
        <input
          type="number"
          step="any"
          name="minReal"
          value={mandelbrotParameters.minReal}
          onChange={handleMandelbrotParameterChange}
        />
      </label>
      <label>
        Max Real:
        <input
          type="number"
          step="any"
          name="maxReal"
          value={mandelbrotParameters.maxReal}
          onChange={handleMandelbrotParameterChange}
        />
      </label>
      <label>
        Min Imaginary:
        <input
          type="number"
          step="any"
          name="minImaginary"
          value={mandelbrotParameters.minImaginary}
          onChange={handleMandelbrotParameterChange}
        />
      </label>
      <label>
        Max Imaginary:
        <input
          type="number"
          step="any"
          name="maxImaginary"
          value={mandelbrotParameters.maxImaginary}
          onChange={handleMandelbrotParameterChange}
        />
      </label>
      <label>
        Max Iterations:
        <input
          type="number"
          name="maxIterations"
          value={mandelbrotParameters.maxIterations}
          onChange={handleMandelbrotParameterChange}
        />
      </label>
      <DrawMandelbrotSet mandelbrotParameters={mandelbrotParameters} />
    </div>
  );
};

export default MandelbrotSet;
