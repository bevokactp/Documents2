// draw/Fractals/BarnsleyFern.jsx
import React, { useEffect, useRef } from 'react';

const DrawBarnsleyFern = ({ fernParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { iterations } = fernParameters;

    // Set canvas size
    canvas.width = 500;
    canvas.height = 600;

    // Set background color to neon blue
    ctx.fillStyle = '#222'; // Neon blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set drawing color to white
    ctx.fillStyle = '#FFFFFF'; // White

    // Initial point
    let x = 0.0;
    let y = 0.0;
    let t = 0.0;
    let xn = 0.0;
    let yn = 0.0;

    // Barnsley Fern algorithm
    while (t < iterations) {
      const r = Math.random();
      if (r < 0.01) {
        xn = 0.0;
        yn = 0.16 * y;
      } else if (r < 0.86) {
        xn = 0.85 * x + 0.04 * y;
        yn = -0.04 * x + 0.85 * y + 1.6;
      } else if (r < 0.93) {
        xn = 0.2 * x - 0.26 * y;
        yn = 0.23 * x + 0.22 * y + 1.6;
      } else {
        xn = -0.15 * x + 0.28 * y;
        yn = 0.26 * x + 0.24 * y + 0.44;
      }

      // Scale and translate coordinates to fit canvas
      const scaledX = 200 + 100 * xn; // Center and scale
      const scaledY = 1100 - (100 * yn + 100); // Center and scale

      // Draw the point on canvas
      ctx.fillRect(scaledX, scaledY, 1, 1); // 1x1 pixel point

      // Update x and y
      x = xn;
      y = yn;

      // Increment t
      t += 1;
    }
  }, [fernParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawBarnsleyFern;
