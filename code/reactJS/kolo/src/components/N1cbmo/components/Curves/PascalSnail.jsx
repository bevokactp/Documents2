// components/Curves/PascalSnail.jsx
import React from 'react';
import DrawPascalSnail from '../../draw/Curves/PascalSnail';
import usePascalSnail from '../../hooks/Curves/PascalSnail';

const PascalSnail = () => {
  const [curveParameters, handleParameterChange] = usePascalSnail();

  return (
    <div>
      <h3>Pascal Snail Curve</h3>
      <label>
        Radius Multiplier:
        <input
          type="number"
          name="radiusMultiplier"
          value={curveParameters.radiusMultiplier}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Offset:
        <input
          type="number"
          name="offset"
          value={curveParameters.offset}
          onChange={handleParameterChange}
        />
      </label>
      <label>
        Detail Level:
        <input
          type="number"
          name="detailLevel"
          value={curveParameters.detailLevel}
          onChange={handleParameterChange}
        />
      </label>
      <DrawPascalSnail curveParameters={curveParameters} />
    </div>
  );
};

export default PascalSnail;
