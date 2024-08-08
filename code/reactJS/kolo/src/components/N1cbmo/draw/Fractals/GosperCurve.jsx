// draw/Fractals/GosperCurve.jsx
import React, { useEffect, useRef } from 'react';

const DrawGosperCurve = ({ gosperCurveParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { iterations, length } = gosperCurveParameters;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = 800;
    canvas.height = 800;

    // Gosper Curve algorithm
    const generateGosperCurve = (iterations) => {
      let sequence = 'A';
      const rules = {
        A: 'A-B--B+A++AA+B-',
        B: '+A-BB--B-A++A+B'
      };

      for (let i = 0; i < iterations; i++) {
        sequence = sequence.split('').map(char => rules[char] || char).join('');
      }

      return sequence;
    };

    const drawGosperCurve = (sequence) => {
      let x = canvas.width / 2;
      let y = canvas.height / 2;
      let angle = 0;

      ctx.beginPath();
      ctx.moveTo(x, y);

      for (const char of sequence) {
        if (char === 'A' || char === 'B') {
          x += length * Math.cos(angle);
          y += length * Math.sin(angle);
          ctx.lineTo(x, y);
        } else if (char === '+') {
          angle += Math.PI / 3;
        } else if (char === '-') {
          angle -= Math.PI / 3;
        }
      }

      ctx.stroke();
    };

    const sequence = generateGosperCurve(iterations);
    drawGosperCurve(sequence);
  }, [gosperCurveParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawGosperCurve;
