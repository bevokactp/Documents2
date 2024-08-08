// components/Fractals/KochSnowflake.jsx
import React from 'react';
import DrawKochSnowflake from '../../draw/Fractals/KochSnowflake';
import useKochSnowflake from '../../hooks/Fractals/KochSnowflake';

const KochSnowflake = () => {
  const [kochSnowflakeParameters, handleKochSnowflakeParameterChange] = useKochSnowflake();

  return (
    <div>
      <h3>Koch Snowflake</h3>
      <label>
        Iterations:
        <input
          type="number"
          name="iterations"
          value={kochSnowflakeParameters.iterations}
          onChange={handleKochSnowflakeParameterChange}
        />
      </label>
      <label>
        Length:
        <input
          type="number"
          name="length"
          value={kochSnowflakeParameters.length}
          onChange={handleKochSnowflakeParameterChange}
        />
      </label>
      <DrawKochSnowflake kochSnowflakeParameters={kochSnowflakeParameters} />
    </div>
  );
};

export default KochSnowflake;
