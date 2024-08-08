// components/Fractals/NewtonBasins.jsx
import React from 'react';
import DrawNewtonBasins from '../../draw/Fractals/NewtonBasins';
import useNewtonBasins from '../../hooks/Fractals/NewtonBasins';

const NewtonBasins = () => {
  const [newtonBasinsParameters, handleNewtonBasinsParameterChange] = useNewtonBasins();

  return (
    <div>
      <h3>Newton Basins Fractal</h3>
      <label>
        Width:
        <input
          type="number"
          name="width"
          value={newtonBasinsParameters.width}
          onChange={handleNewtonBasinsParameterChange}
        />
      </label>
      <label>
        Height:
        <input
          type="number"
          name="height"
          value={newtonBasinsParameters.height}
          onChange={handleNewtonBasinsParameterChange}
        />
      </label>
      <label>
        Iterations:
        <input
          type="number"
          name="iterations"
          value={newtonBasinsParameters.iterations}
          onChange={handleNewtonBasinsParameterChange}
        />
      </label>
      <label>
        Tolerance:
        <input
          type="number"
          name="tolerance"
          value={newtonBasinsParameters.tolerance}
          onChange={handleNewtonBasinsParameterChange}
        />
      </label>
      <label>
        Scale:
        <input
          type="number"
          name="scale"
          value={newtonBasinsParameters.scale}
          onChange={handleNewtonBasinsParameterChange}
        />
      </label>
      <label>
        Offset X:
        <input
          type="number"
          name="offsetX"
          value={newtonBasinsParameters.offsetX}
          onChange={handleNewtonBasinsParameterChange}
        />
      </label>
      <label>
        Offset Y:
        <input
          type="number"
          name="offsetY"
          value={newtonBasinsParameters.offsetY}
          onChange={handleNewtonBasinsParameterChange}
        />
      </label>
      <DrawNewtonBasins newtonBasinsParameters={newtonBasinsParameters} />
    </div>
  );
};

export default NewtonBasins;
