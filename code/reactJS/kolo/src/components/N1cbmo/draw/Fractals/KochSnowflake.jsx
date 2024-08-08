// draw/Fractals/KochSnowflake.jsx
import React, { useEffect, useRef } from 'react';

const DrawKochSnowflake = ({ kochSnowflakeParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { iterations, length } = kochSnowflakeParameters;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Koch Snowflake algorithm
    const drawLine = (x1, y1, x2, y2, depth) => {
      if (depth === 0) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      } else {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy) / 3;
        const angle = Math.atan2(dy, dx);
        const x3 = x1 + Math.cos(angle) * dist;
        const y3 = y1 + Math.sin(angle) * dist;
        const x4 = x2 - Math.cos(angle) * dist;
        const y4 = y2 - Math.sin(angle) * dist;
        const x5 = x3 + Math.cos(angle - Math.PI / 3) * dist;
        const y5 = y3 + Math.sin(angle - Math.PI / 3) * dist;

        drawLine(x1, y1, x3, y3, depth - 1);
        drawLine(x3, y3, x5, y5, depth - 1);
        drawLine(x5, y5, x4, y4, depth - 1);
        drawLine(x4, y4, x2, y2, depth - 1);
      }
    };

    const startX = canvas.width / 2;
    const startY = canvas.height / 2.4 + length / Math.sqrt(3) / 3;
    const sideLength = length;
    const height = (Math.sqrt(3) / 2) * sideLength;

    drawLine(startX - sideLength / 2, startY - height / 2, startX + sideLength / 2, startY - height / 2, iterations);
    drawLine(startX + sideLength / 2, startY - height / 2, startX, startY + 2 * height / 3, iterations);
    drawLine(startX, startY + 2 * height / 3, startX - sideLength / 2, startY - height / 2, iterations);
  }, [kochSnowflakeParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawKochSnowflake;
