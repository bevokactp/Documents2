// draw/Spirals/LogarithmicSpiral.jsx
import React, { useEffect, useRef } from 'react';

const DrawLogarithmicSpiral = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { initialRadius, growthRate, numTurns } = parameters;

    canvas.width = 500;
    canvas.height = 500;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;

    let angle = 0;
    let radius = initialRadius;

    while (angle < 2 * Math.PI * numTurns) {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.lineTo(x, y);

      angle += 0.1; // Increment angle
      radius = initialRadius * Math.exp(growthRate * angle);
    }

    ctx.stroke();
  }, [parameters]);

  return <canvas ref={canvasRef}></canvas>;
};

export default DrawLogarithmicSpiral;
