// draw/Curves/Nepheloid.jsx
import React, { useEffect, useRef } from 'react';

const DrawNepheloid = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { amplitudeX, amplitudeY, frequencyMultiplier, detail } = parameters;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw the Nepheloid curve
    context.beginPath();
    for (let i = 0; i <= detail; i++) {
      const t = (i / detail) * 2 * Math.PI;
      const x = amplitudeX * Math.cos(t) + amplitudeY * Math.cos(frequencyMultiplier * t);
      const y = amplitudeX * Math.sin(t) + amplitudeY * Math.sin(frequencyMultiplier * t);
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

export default DrawNepheloid;
