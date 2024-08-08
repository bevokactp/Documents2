import React, { useEffect, useRef } from 'react';

const Draw = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const { lengthSide, branchingFactor } = parameters;

    canvas.width = lengthSide * 2;
    canvas.height = lengthSide;

    const drawBranch = (x, y, length, angle, depth) => {
      if (depth === 0) return;

      const rad = angle * (Math.PI / 180);
      const x1 = x + length * Math.cos(rad);
      const y1 = y + length * Math.sin(rad);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x1, y1);
      ctx.stroke();

      const newLength = length * 0.7;
      drawBranch(x1, y1, newLength, angle - branchingFactor, depth - 1);
      drawBranch(x1, y1, newLength, angle + branchingFactor, depth - 1);
    };

    const drawLichtenbergFigure = () => {
      ctx.clearRect(0, 0, lengthSide, lengthSide);

      const centerX = lengthSide/2 ;
      const centerY = lengthSide / 1.25;
      const initialLength = lengthSide / 4;
      const initialAngle = -90;
      const depth = 10;

      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;

      drawBranch(centerX, centerY, initialLength, initialAngle, depth);
    };

    drawLichtenbergFigure();
  }, [parameters]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Draw;
