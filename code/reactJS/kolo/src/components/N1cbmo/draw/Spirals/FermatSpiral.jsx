import React, { useEffect, useRef } from 'react';

const DrawFermatSpiral = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const { initialRadius, growthFactor } = parameters;

    canvas.width = 600;
    canvas.height = 600;

    const drawSpiral = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.beginPath();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;

      let angle = 0;

      while (angle < 10 * Math.PI) { // Adjust angle range as needed
        const radius = initialRadius * Math.sqrt(angle) * growthFactor; // Apply growthFactor

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        ctx.lineTo(x, y);

        angle += 0.1; // Increment angle
      }

      ctx.stroke();
    };

    drawSpiral();
  }, [parameters]);

  return <canvas ref={canvasRef}></canvas>;
};

export default DrawFermatSpiral;
