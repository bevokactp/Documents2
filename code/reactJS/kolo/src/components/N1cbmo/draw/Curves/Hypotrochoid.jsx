// draw/Curves/Hypotrochoid.jsx
import React, { useEffect, useRef } from 'react';

const DrawHypotrochoid = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { largeCircleRadius, smallCircleRadius, tracingPointDistance, detail } = parameters;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw the Hypotrochoid curve
    context.beginPath();
    for (let i = 0; i <= detail; i++) {
      const theta = (i / detail) * 2 * Math.PI;
      const x = (largeCircleRadius - smallCircleRadius) * Math.cos(theta) + tracingPointDistance * Math.cos(((largeCircleRadius - smallCircleRadius) / smallCircleRadius) * theta);
      const y = (largeCircleRadius - smallCircleRadius) * Math.sin(theta) - tracingPointDistance * Math.sin(((largeCircleRadius - smallCircleRadius) / smallCircleRadius) * theta);
      if (i === 0) {
        context.moveTo(centerX + x, centerY - y);
      } else {
        context.lineTo(centerX + x, centerY - y);
      }
    }
    context.closePath();
    context.stroke();
  }, [parameters]);

  return <canvas ref={canvasRef} width={400} height={400} />;
};

export default DrawHypotrochoid;
