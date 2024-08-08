// draw/Fractals/MooreCurve.jsx
import React, { useEffect, useRef } from 'react';

const DrawMooreCurve = ({ mooreCurveParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { iterations, lineLength, angle } = mooreCurveParameters;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = 800;
    canvas.height = 800;

    // Moore Curve algorithm
    const generateMooreCurve = (iterations) => {
      let sequence = 'A';

      const rules = {
        A: '-BF+AFA+FB-',
        B: '+AF-BFB-FA+'
      };

      for (let i = 0; i < iterations; i++) {
        sequence = sequence.split('').map(char => rules[char] || char).join('');
      }

      return sequence;
    };

    const drawMooreCurve = (sequence) => {
      let x = canvas.width / 2;
      let y = canvas.height / 2;
      let currentAngle = 0;

      ctx.beginPath();
      ctx.moveTo(x, y);

      for (const char of sequence) {
        if (char === 'F') {
          x += lineLength * Math.cos(currentAngle * (Math.PI / 180));
          y += lineLength * Math.sin(currentAngle * (Math.PI / 180));
          ctx.lineTo(x, y);
        } else if (char === '+') {
          currentAngle += angle;
        } else if (char === '-') {
          currentAngle -= angle;
        }
      }

      ctx.stroke();
    };

    const sequence = generateMooreCurve(iterations);
    drawMooreCurve(sequence);
  }, [mooreCurveParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawMooreCurve;
