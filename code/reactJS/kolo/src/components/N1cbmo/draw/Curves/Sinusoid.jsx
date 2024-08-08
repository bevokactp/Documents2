// draw/Curves/Sinusoid.jsx
import React, { useEffect, useRef } from 'react';

const DrawSinusoid = ({ sinusoidParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { amplitude, frequency, detailLevel } = sinusoidParameters;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    canvas.width = amplitude * 10;
    canvas.height = amplitude * 10;

    // Draw the Sinusoid curve
    context.beginPath();
    for (let i = 0; i <= detailLevel; i++) {
      const x = (i / detailLevel) * canvas.width;
      const y = amplitude * Math.sin(frequency * (x - centerX));
      if (i === 0) {
        context.moveTo(x, centerY - y);
      } else {
        context.lineTo(x, centerY - y);
      }
    }
    context.stroke();
  }, [sinusoidParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawSinusoid;
