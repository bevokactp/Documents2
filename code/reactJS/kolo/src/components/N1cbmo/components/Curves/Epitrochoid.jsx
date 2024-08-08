// components/Curves/Epitrochoid.jsx
import React from 'react';
import DrawEpitrochoid from '../../draw/Curves/Epitrochoid';
import useCurveParameters from '../../hooks/Curves/Epitrochoid';

const Epitrochoid = () => {
  const [parameters, handleParameterChange] = useCurveParameters();

  return (
    <div>
      <h3>Epitrochoid Curve</h3>
      <label>
        Primary Radius:
        <input
          type="number"
          name="primaryRadius"
          value={parameters.primaryRadius}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Secondary Radius:
        <input
          type="number"
          name="secondaryRadius"
          value={parameters.secondaryRadius}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Offset Distance:
        <input
          type="number"
          name="offsetDistance"
          value={parameters.offsetDistance}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Resolution:
        <input
          type="number"
          name="resolution"
          value={parameters.resolution}
          onChange={handleParameterChange}
        />
      </label>
      <DrawEpitrochoid parameters={parameters} />
    </div>
  );
};

export default Epitrochoid;
