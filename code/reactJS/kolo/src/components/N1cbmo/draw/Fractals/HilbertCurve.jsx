// draw/Fractals/HilbertLSystem.jsx
import React, { useEffect, useRef } from 'react';

const HilbertLSystem = ({ hilbertCurveParameters }) => {
  const canvasRef = useRef(null);

  const generateHilbertString = (iterations) => {
    let axiom = 'A';
    const rules = {
      A: '+BF-AFA-FB+',
      B: '-AF+BFB+FA-'
    };
    for (let i = 0; i < iterations; i++) {
      axiom = axiom.split('').map(c => rules[c] || c).join('');
    }
    return axiom;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { iterations, size, angle } = hilbertCurveParameters;

    const hilbertString = generateHilbertString(iterations);
    const length = size / Math.pow(2, iterations);

    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Hilbert Curve drawing
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let dir = 0; // 0 = right, 1 = down, 2 = left, 3 = up

    const moveForward = () => {
      if (dir === 0) x += length;
      if (dir === 1) y += length;
      if (dir === 2) x -= length;
      if (dir === 3) y -= length;
      ctx.lineTo(x, y);
    };

    ctx.beginPath();
    ctx.moveTo(x, y);

    hilbertString.split('').forEach(command => {
      if (command === 'F') moveForward();
      if (command === '+') dir = (dir + 1) % 4;
      if (command === '-') dir = (dir + 3) % 4; // equivalent to (dir - 1) % 4
    });

    ctx.stroke();
  }, [hilbertCurveParameters]);

  return <canvas ref={canvasRef} />;
};

export default HilbertLSystem;
