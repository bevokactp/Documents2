// draw/Fractals/DragonCurve.jsx
import React, { useEffect, useRef } from 'react';

const DrawDragonCurve = ({ dragonCurveParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { iterations, segmentLength } = dragonCurveParameters;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = 600;
    canvas.height = 600;

    // Dragon Curve algorithm
    const generateDragonCurve = (iterations) => {
      let sequence = 'FX';
      const rules = {
        F: 'F',
        X: 'X+YF+',
        Y: '-FX-Y'
      };

      for (let i = 0; i < iterations; i++) {
        sequence = sequence.split('').map(char => rules[char] || char).join('');
      }

      return sequence;
    };

    const drawDragonCurve = (sequence) => {
      let x = canvas.width / 2;
      let y = canvas.height / 1.5;
      let currentAngle = 0; // Use currentAngle instead of angle

      ctx.beginPath();
      ctx.moveTo(x, y);

      for (const char of sequence) {
        if (char === 'F') {
          x += segmentLength * Math.cos(currentAngle);
          y += segmentLength * Math.sin(currentAngle);
          ctx.lineTo(x, y);
        } else if (char === '+') {
          currentAngle += Math.PI / 2;
        } else if (char === '-') {
          currentAngle -= Math.PI / 2;
        }
      }

      ctx.stroke();
    };

    const sequence = generateDragonCurve(iterations);
    drawDragonCurve(sequence);
  }, [dragonCurveParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawDragonCurve;
