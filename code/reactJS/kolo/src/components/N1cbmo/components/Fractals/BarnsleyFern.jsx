// components/Fractals/BarnsleyFern.jsx
import React from 'react';
import DrawBarnsleyFern from '../../draw/Fractals/BarnsleyFern';
import useBarnsleyFern from '../../hooks/Fractals/BarnsleyFern';

const BarnsleyFern = () => {
  const [fernParameters, handleFernParameterChange] = useBarnsleyFern();

  return (
    <div>
      <h3>Barnsley Fern</h3>
      <label>
        Iterations:
        <input
          type="number"
          name="iterations"
          value={fernParameters.iterations}
          onChange={handleFernParameterChange}
        />
      </label>
      <DrawBarnsleyFern fernParameters={fernParameters} />
    </div>
  );
};

export default BarnsleyFern;
