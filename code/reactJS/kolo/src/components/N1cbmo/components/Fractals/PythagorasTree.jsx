// components/Fractals/PythagorasTree.jsx
import React from 'react';

import DrawPythagorasTree from '../../draw/Fractals/PythagorasTree';
import usePythagorasTree from '../../hooks/Fractals/PythagorasTree';

const PythagorasTree = () => {
  const [pythagorasTreeParameters, handlePythagorasTreeParameterChange] = usePythagorasTree();

  return (
    <div>
      <h3>Pythagoras Tree</h3>
      <label>
        Angle (degrees):
        <input
          type="number"
          name="angle"
          value={pythagorasTreeParameters.angle}
          onChange={handlePythagorasTreeParameterChange}
        />
      </label>
      <label>
        Initial Length:
        <input
          type="number"
          name="width"
          value={pythagorasTreeParameters.width}
          onChange={handlePythagorasTreeParameterChange}
        />
      </label>
      <label>
        Recursion Depth:
        <input
          type="number"
          name="recursion"
          value={pythagorasTreeParameters.recursion}
          onChange={handlePythagorasTreeParameterChange}
        />
      </label>
      <label>
        Color Gradient:
        <input
          type="checkbox"
          name="colorGradient"
          checked={pythagorasTreeParameters.colorGradient}
          onChange={handlePythagorasTreeParameterChange}
        />
      </label>
      <DrawPythagorasTree pythagorasTreeParameters={pythagorasTreeParameters} />
    </div>
  );
};

export default PythagorasTree;
