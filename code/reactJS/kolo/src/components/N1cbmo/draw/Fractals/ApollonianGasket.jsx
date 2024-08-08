// draw/Curves/ApollonianGasket.jsx
import React, { useEffect, useRef } from 'react';

const DrawApollonianGasket = ({ gasketParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { recursionDepth, circleRadius } = gasketParameters;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = circleRadius * 6;
    canvas.height = circleRadius * 6;

    const drawCircle = (x, y, radius) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    };

    const drawApollonianGasket = (x, y, radius, depth) => {
      if (depth === 0) return;

      // Draw the main circle
      drawCircle(x, y, radius);

      // Compute the positions of the three smaller circles
      const r = radius / 2;
      const offset = radius * Math.sqrt(3) / 2;

      drawApollonianGasket(x - r, y - offset, r, depth - 1);
      drawApollonianGasket(x + r, y - offset, r, depth - 1);
      drawApollonianGasket(x, y + radius, r, depth - 1);
    };

    // Draw the Apollonian Gasket
    drawApollonianGasket(canvas.width / 2, canvas.height / 2, circleRadius, recursionDepth);
  }, [gasketParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawApollonianGasket;
