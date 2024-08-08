import React, { useEffect, useRef } from 'react';

const Draw = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const { lengthSide, a, b, delta } = parameters;

    canvas.width = lengthSide;
    canvas.height = lengthSide;

    const drawLissajousFigure = () => {
      ctx.clearRect(0, 0, lengthSide, lengthSide);

      const step = 0.01;
      const scale = lengthSide / 2;
      const centerX = lengthSide / 2;
      const centerY = lengthSide / 2;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);

      for (let t = 0; t <= 2 * Math.PI; t += step) {
        const x = centerX + scale * Math.sin(a * t + delta);
        const y = centerY + scale * Math.sin(b * t);
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    drawLissajousFigure();
  }, [parameters]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Draw;
