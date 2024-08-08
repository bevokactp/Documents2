// draw/Curves/CassiniOval.jsx
import React, { useEffect, useRef } from 'react';

const DrawCassiniOval = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { radius1, radius2, detail } = parameters;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    canvas.width = radius1 * 5;
    canvas.height = radius1 * 5;

    // Draw the Cassini Oval curve
    ctx.beginPath();
    for (let i = 0; i <= detail; i++) {
      const theta = (i / detail) * 2 * Math.PI;
      const r = Math.sqrt(
        Math.pow(radius1 * Math.cos(theta), 2) +
        Math.pow(radius2 * Math.sin(theta), 2)
      );
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      if (i === 0) {
        ctx.moveTo(centerX + x, centerY - y);
      } else {
        ctx.lineTo(centerX + x, centerY - y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }, [parameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawCassiniOval;
