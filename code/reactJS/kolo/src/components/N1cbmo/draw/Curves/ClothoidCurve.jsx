// draw/Curves/ClothoidCurve.jsx
import React, { useEffect, useRef } from 'react';

const DrawClothoidCurve = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const { initialRadius, scalingFactor, curvatureGrowthRate } = parameters;

    canvas.width = 600;
    canvas.height = 600;

    const drawClothoid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(300, 300);

      for (let t = 0; t <= 20; t += 0.1) {
        const x = initialRadius * Math.sqrt(t) * Math.cos(curvatureGrowthRate * t);
        const y = scalingFactor * Math.sqrt(t) * Math.sin(curvatureGrowthRate * t);
        ctx.lineTo(300 + x, 300 - y);
      }

      ctx.stroke();
    };

    drawClothoid();
  }, [parameters]);

  return <canvas ref={canvasRef}></canvas>;
};

export default DrawClothoidCurve;
