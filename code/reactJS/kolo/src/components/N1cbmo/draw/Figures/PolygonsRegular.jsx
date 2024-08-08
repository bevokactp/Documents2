import React, { useEffect, useRef } from 'react';

const Draw = ({ size, borderColor, fillColor, borderWidth, sides, makeTransparent, showRadiuses }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const radius = (size - borderWidth) / 2;  // Уменьшаем радиус на половину толщины границы

    const drawPolygon = (x, y, radius, sides, fillColor, borderColor, borderWidth, makeTransparent, showRadiuses) => {
      const angle = (2 * Math.PI) / sides;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const pointX = x + radius * Math.cos(i * angle - Math.PI / 2);
        const pointY = y + radius * Math.sin(i * angle - Math.PI / 2);
        ctx.lineTo(pointX, pointY);
      }
      ctx.closePath();
      ctx.fillStyle = makeTransparent ? 'transparent' : fillColor;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();

      if (showRadiuses) {
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          ctx.moveTo(x, y);
          ctx.lineTo(
            x + radius * Math.cos(i * angle - Math.PI / 2),
            y + radius * Math.sin(i * angle - Math.PI / 2)
          );
        }
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 1;  // Установить фиксированную толщину для радиусов
        ctx.stroke();
      }
    };

    drawPolygon(canvas.width / 2, canvas.height / 2, radius, sides, fillColor, borderColor, borderWidth, makeTransparent, showRadiuses);
  }, [size, borderColor, fillColor, borderWidth, sides, makeTransparent, showRadiuses]);

  return <canvas ref={canvasRef} width={size} height={size}></canvas>;
};

export default Draw;
