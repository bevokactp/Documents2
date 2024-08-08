// components/Curves/ApollonianGasket.jsx
import React from 'react';
import DrawApollonianGasket from '../../draw/Fractals/ApollonianGasket';
import useApollonianGasket from '../../hooks/Fractals/ApollonianGasket';

const ApollonianGasket = () => {
  const [gasketParameters, handleGasketParameterChange] = useApollonianGasket();

  return (
    <div>
      <h3>Apollonian Gasket</h3>
      <label>
        Recursion Depth:
        <input
          type="number"
          name="recursionDepth"
          value={gasketParameters.recursionDepth}
          onChange={handleGasketParameterChange}
        />
      </label>
      <label>
        Circle Radius:
        <input
          type="number"
          name="circleRadius"
          value={gasketParameters.circleRadius}
          onChange={handleGasketParameterChange}
        />
      </label>
      <DrawApollonianGasket gasketParameters={gasketParameters} />
    </div>
  );
};

export default ApollonianGasket;
