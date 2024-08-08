// draw/Curves/BezierCurve.jsx

import React, { useEffect, useRef } from 'react';

const Draw = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { controlPoints, curveResolution } = parameters;

    canvas.width = 400;
    canvas.height = 400;

    const drawBezierCurve = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(controlPoints[0].x, controlPoints[0].y);

      for (let t = 0; t <= 1; t += 1 / curveResolution) {
        const x = Math.pow(1 - t, 2) * controlPoints[0].x +
                  2 * (1 - t) * t * controlPoints[1].x +
                  Math.pow(t, 2) * controlPoints[2].x;
        const y = Math.pow(1 - t, 2) * controlPoints[0].y +
                  2 * (1 - t) * t * controlPoints[1].y +
                  Math.pow(t, 2) * controlPoints[2].y;
        ctx.lineTo(x, y);
      }

      ctx.stroke();
    };

    drawBezierCurve();
  }, [parameters]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Draw;
