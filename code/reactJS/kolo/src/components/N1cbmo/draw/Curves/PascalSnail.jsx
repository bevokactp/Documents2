// draw/Curves/PascalSnail.jsx
import React, { useEffect, useRef } from 'react';

const DrawPascalSnail = ({ curveParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { radiusMultiplier, offset, detailLevel } = curveParameters;

    // Очистить холст
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Центр холста
    const centerX = canvas.width / 3;
    const centerY = canvas.height / 3;
    canvas.width = radiusMultiplier * 5;
    canvas.height = radiusMultiplier * 5;

    // Нарисовать кривую Паскаля
    context.beginPath();
    for (let i = 0; i <= detailLevel; i++) {
      const angle = (i / detailLevel) * 2 * Math.PI;
      const radius = radiusMultiplier * Math.cos(angle) + offset;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      if (i === 0) {
        context.moveTo(centerX + x, centerY - y);
      } else {
        context.lineTo(centerX + x, centerY - y);
      }
    }
    context.closePath();
    context.stroke();
  }, [curveParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawPascalSnail;
