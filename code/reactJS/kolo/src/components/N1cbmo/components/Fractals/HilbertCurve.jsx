// components/Fractals/HilbertCurve.jsx
import React from 'react';
import DrawHilbertCurve from '../../draw/Fractals/HilbertCurve';
import useHilbertCurve from '../../hooks/Fractals/HilbertCurve';

const HilbertCurve = () => {
  const [hilbertCurveParameters, handleHilbertCurveParameterChange] = useHilbertCurve();

  return (
    <div>
      <h3>Hilbert Curve (L-System)</h3>
      <label>
        Iterations:
        <input
          type="number"
          name="iterations"
          value={hilbertCurveParameters.iterations}
          onChange={handleHilbertCurveParameterChange}
        />
      </label>
      <label>
        Size:
        <input
          type="number"
          name="size"
          value={hilbertCurveParameters.size}
          onChange={handleHilbertCurveParameterChange}
        />
      </label>
      <label>
        Angle:
        <input
          type="number"
          name="angle"
          value={hilbertCurveParameters.angle}
          onChange={handleHilbertCurveParameterChange}
        />
      </label>

      <DrawHilbertCurve hilbertCurveParameters={hilbertCurveParameters} />
    </div>
  );
};

export default HilbertCurve;
