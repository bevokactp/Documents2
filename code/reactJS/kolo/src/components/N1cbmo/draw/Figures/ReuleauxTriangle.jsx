import React, { useRef, useEffect } from 'react';

const ReuleauxTriangle = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

	const { sideLength } = parameters;

    canvas.width = sideLength * 1.3;
    canvas.height = sideLength * 1.3;
	const side = sideLength;
	const radius = side;

	const width = canvas.width;
	const height = canvas.height;

      // Начальные точки треугольника
      const startX = (width - side) / 2;
      const startY = (height - side * Math.sqrt(3) / 2) / 2;
      const p1 = { x: startX, y: startY + side * Math.sqrt(3) / 2 };
      const p2 = { x: startX + side / 2, y: startY };
      const p3 = { x: startX + side, y: startY + side * Math.sqrt(3) / 2 };

      context.clearRect(0, 0, width, height); // Очищаем канвас

      // Функция для рисования дуги
      const drawArc = (startPoint, endPoint, centerPoint) => {
        const angleStart = Math.atan2(startPoint.y - centerPoint.y, startPoint.x - centerPoint.x);
        const angleEnd = Math.atan2(endPoint.y - centerPoint.y, endPoint.x - centerPoint.x);

        // Убедимся, что углы находятся в правильном диапазоне
        let startAngle = angleStart;
        let endAngle = angleEnd;

        if (startAngle > endAngle) {
          endAngle += 2 * Math.PI;
        }

        context.beginPath();
        context.arc(centerPoint.x, centerPoint.y, radius, startAngle, endAngle);
        context.stroke();
      };

      // Рисуем дуги
      drawArc(p2, p3, p1); // Дуга от p2 до p3 с центром в p1
      drawArc(p3, p1, p2); // Дуга от p3 до p1 с центром в p2
      drawArc(p1, p2, p3); // Дуга от p1 до p2 с центром в p3
	}, [parameters]);

  return (
    <canvas ref={canvasRef} />
  );
};

export default ReuleauxTriangle;
