import React, { useEffect, useRef } from 'react';

const Draw = ({ size, borderColor, fillColor, borderWidth, points, makeTransparent, showRadiuses }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const radius = (size - borderWidth) / 2; // Уменьшаем радиус на половину толщины границы

    const drawStar = (x, y, radius, points, fillColor, borderColor, borderWidth, makeTransparent, showRadiuses) => {
      const innerRadius = radius / 2; // Радиус внутренней части звезды

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const isOuter = i % 2 === 0;
        const currentRadius = isOuter ? radius : innerRadius;
        const currentAngle = i * (Math.PI / points);

        const pointX = x + currentRadius * Math.cos(currentAngle - Math.PI / 2);
        const pointY = y + currentRadius * Math.sin(currentAngle - Math.PI / 2);

        ctx.lineTo(pointX, pointY);
      }
      ctx.closePath();
      ctx.fillStyle = makeTransparent ? 'transparent' : fillColor;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();

      if (showRadiuses) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth / 2; // Тонкие линии радиусов
        ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
          const isOuter = i % 2 === 0;
          const currentRadius = isOuter ? radius : innerRadius;
          const currentAngle = i * (Math.PI / points);

          const pointX = x + currentRadius * Math.cos(currentAngle - Math.PI / 2);
          const pointY = y + currentRadius * Math.sin(currentAngle - Math.PI / 2);

          ctx.moveTo(x, y);
          ctx.lineTo(pointX, pointY);
        }
        ctx.stroke();
      }
    };

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    drawStar(centerX, centerY, radius, points, fillColor, borderColor, borderWidth, makeTransparent, showRadiuses);
  }, [size, borderColor, fillColor, borderWidth, points, makeTransparent, showRadiuses]);

  return <canvas ref={canvasRef} width={size + borderWidth} height={size + borderWidth}></canvas>;
};

export default Draw;
