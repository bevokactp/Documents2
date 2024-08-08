// components/Curves/Astroid.jsx
import React from 'react';
import DrawAstroid from '../../draw/Curves/Astroid';
import useAstroid from '../../hooks/Curves/Astroid';

const Astroid = () => {
  const [parameters, handleParameterChange] = useAstroid();

  return (
    <div>
      <h3>Astroid Curve</h3>
      <label>
        Radius:
        <input
          type="number"
          name="radius"
          value={parameters.radius}
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
      <DrawAstroid parameters={parameters} />
    </div>
  );
};

export default Astroid;
