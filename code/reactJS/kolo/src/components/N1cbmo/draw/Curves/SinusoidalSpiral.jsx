// draw/Curves/SinusoidalSpiral.jsx
import React, { useEffect, useRef } from 'react';

const DrawSinusoidalSpiral = ({ spiralParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { amplitude, frequency, detail } = spiralParameters;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    canvas.width = 300;
    canvas.height = 300;

    // Draw the Sinusoidal Spiral curve
    ctx.beginPath();
    for (let i = 0; i <= detail; i++) {
      const theta = (i / detail) * 2 * Math.PI;
      const radius = amplitude * (1 + frequency * theta);
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      if (i === 0) {
        ctx.moveTo(centerX + x, centerY - y);
      } else {
        ctx.lineTo(centerX + x, centerY - y);
      }
    }
    ctx.stroke();
  }, [spiralParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawSinusoidalSpiral;
