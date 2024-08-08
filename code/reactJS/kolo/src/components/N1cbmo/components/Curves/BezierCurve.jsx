// components/Curves/BezierCurve.jsx

import React from 'react';
import Draw from '../../draw/Curves/BezierCurve';
import hook from '../../hooks/Curves/BezierCurve';

const Component = () => {
  const [parameters, handleChange] = hook();
  return (
    <div>
      <h3>Bezier Curve</h3>
      <label> Curve Resolution: <input type="number" name="curveResolution" value={parameters.curveResolution} onChange={(e) => handleChange({ target: { name: 'curveResolution', value: e.target.value } }) } /> </label>
      {parameters.controlPoints.map((point, index) => (
        <div key={index}>
          <label>
            Control Point {index + 1} X:
            <input
              type="number"
              name="controlPoints"
              data-index={index}
              data-field="x"
              value={point.x}
              onChange={handleChange}
            />
          </label>
          <label>
            Control Point {index + 1} Y:
            <input
              type="number"
              name="controlPoints"
              data-index={index}
              data-field="y"
              value={point.y}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
      <Draw parameters={parameters} />
    </div>
  );
};

export default Component;
