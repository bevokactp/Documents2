// draw/Curves/Epitrochoid.jsx
import React, { useEffect, useRef } from 'react';

const DrawEpitrochoid = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { primaryRadius, secondaryRadius, offsetDistance, resolution } = parameters;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    canvas.width = Math.abs(primaryRadius + secondaryRadius + offsetDistance) * 3;
    canvas.height = Math.abs(primaryRadius + secondaryRadius + offsetDistance) * 3;

    // Draw the Epitrochoid curve
    ctx.beginPath();
    for (let i = 0; i <= resolution; i++) {
      const theta = (i / resolution) * 2 * Math.PI;
      const x = (primaryRadius + secondaryRadius) * Math.cos(theta) - offsetDistance * Math.cos((primaryRadius + secondaryRadius) / secondaryRadius * theta);
      const y = (primaryRadius + secondaryRadius) * Math.sin(theta) - offsetDistance * Math.sin((primaryRadius + secondaryRadius) / secondaryRadius * theta);
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

export default DrawEpitrochoid;
