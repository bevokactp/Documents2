import React, { useEffect, useRef } from 'react';

const Draw = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawKnot = (x, y, thickness, color, length, knots) => {
      ctx.lineWidth = thickness;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y);

      const knotDistance = length / (knots.length + 1);
      let currentX = x;

      knots.forEach((knot) => {
        currentX += knotDistance;

        if (knot === 0) {
          ctx.lineTo(currentX, y);
          ctx.arc(currentX, y, 3, 0, 2 * Math.PI);  // двойной узел
        } else if (knot > 0) {
          for (let i = 0; i < knot; i++) {
            ctx.lineTo(currentX, y);
            ctx.arc(currentX, y, 1, 0, 2 * Math.PI);  // одинарный узел
            currentX += 3;
          }
        } else {
          ctx.lineTo(currentX, y);  // пустота, нет узла
        }
      });

      ctx.lineTo(currentX + knotDistance, y);
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let currentY = 20;
      parameters.forEach((rope) => {
        drawKnot(10, currentY, rope.thickness, rope.color, rope.length, rope.knots || []);
        currentY += 30;  // расстояние между верёвками
      });
    };

    draw();
  }, [parameters]);

  return <canvas ref={canvasRef} width={800} height={600}></canvas>;
};

export default Draw;
