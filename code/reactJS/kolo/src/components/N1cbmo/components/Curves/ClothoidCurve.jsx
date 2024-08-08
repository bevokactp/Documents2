// components/Curves/ClothoidCurve.jsx
import React from 'react';
import Draw from '../../draw/Curves/ClothoidCurve';
import hook from '../../hooks/Curves/ClothoidCurve';

const ClothoidCurve = () => {
  const [parameters, handleParameterChange] = hook();

  return (
    <div>
      <h3>Clothoid Curve</h3>
      <label>
        Initial Radius:
        <input type="number" name="initialRadius" value={parameters.initialRadius} onChange={handleParameterChange} />
      </label>
      <label>
        Scaling Factor:
        <input type="number" name="scalingFactor" value={parameters.scalingFactor} onChange={handleParameterChange} />
      </label>
      <label>
        Curvature Growth Rate:
        <input type="number" name="curvatureGrowthRate" value={parameters.curvatureGrowthRate} onChange={handleParameterChange} />
      </label>
      <Draw parameters={parameters} />
    </div>
  );
};

export default ClothoidCurve;
