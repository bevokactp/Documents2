// draw/Fractals/MinkowskiCurve.jsx
import React, { useEffect, useRef } from 'react';

const DrawMinkowskiCurve = ({ minkowskiCurveParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { iterations, length, scale } = minkowskiCurveParameters;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = 800;
    canvas.height = 800;

    const drawSegment = (x, y, length, angle, iteration) => {
      if (iteration === 0) {
        const endX = x + length * Math.cos(angle);
        const endY = y + length * Math.sin(angle);
        ctx.lineTo(endX, endY);
        return { x: endX, y: endY };
      } else {
        length *= scale;
        iteration--;
        let pos = { x, y };
        pos = drawSegment(pos.x, pos.y, length, angle, iteration);
        pos = drawSegment(pos.x, pos.y, length, angle - Math.PI / 2, iteration);
        pos = drawSegment(pos.x, pos.y, length, angle + Math.PI / 2, iteration);
        return drawSegment(pos.x, pos.y, length, angle, iteration);
      }
    };

    ctx.beginPath();
    ctx.moveTo(100, 400);
    drawSegment(100, 400, length, 0, iterations);
    ctx.stroke();
  }, [minkowskiCurveParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawMinkowskiCurve;
