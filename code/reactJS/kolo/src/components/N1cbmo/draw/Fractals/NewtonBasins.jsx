// draw/Fractals/NewtonBasins.jsx
import React, { useEffect, useRef } from 'react';

const DrawNewtonBasins = ({ newtonBasinsParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const {
      width,
      height,
      iterations,
      tolerance,
      scale,
      offsetX,
      offsetY
    } = newtonBasinsParameters;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const newtonFractal = (x, y) => {
      const roots = [
        { re: 1, im: 0 },
        { re: -0.5, im: Math.sqrt(3) / 2 },
        { re: -0.5, im: -Math.sqrt(3) / 2 }
      ];

      let z = { re: x, im: y };
      let rootIndex = -1;

      for (let i = 0; i < iterations; i++) {
        const zSquared = {
          re: z.re * z.re - z.im * z.im,
          im: 2 * z.re * z.im
        };

        const zCubed = {
          re: z.re * zSquared.re - z.im * zSquared.im,
          im: z.re * zSquared.im + z.im * zSquared.re
        };

        const numerator = {
          re: zCubed.re - 1,
          im: zCubed.im
        };

        const denominator = {
          re: 3 * zSquared.re,
          im: 3 * zSquared.im
        };

        const quotient = {
          re: (numerator.re * denominator.re + numerator.im * denominator.im) /
            (denominator.re * denominator.re + denominator.im * denominator.im),
          im: (numerator.im * denominator.re - numerator.re * denominator.im) /
            (denominator.re * denominator.re + denominator.im * denominator.im)
        };

        z = {
          re: z.re - quotient.re,
          im: z.im - quotient.im
        };

        for (let j = 0; j < roots.length; j++) {
          const root = roots[j];
          const distance = Math.sqrt(
            Math.pow(z.re - root.re, 2) + Math.pow(z.im - root.im, 2)
          );
          if (distance < tolerance) {
            rootIndex = j;
            break;
          }
        }

        if (rootIndex !== -1) {
          break;
        }
      }

      return rootIndex;
    };

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const nx = (x - width / 2) / scale + offsetX;
        const ny = (y - height / 2) / scale + offsetY;

        const rootIndex = newtonFractal(nx, ny);

        if (rootIndex !== -1) {
          if (rootIndex === 0) {
            ctx.fillStyle = 'red';
          } else if (rootIndex === 1) {
            ctx.fillStyle = 'green';
          } else {
            ctx.fillStyle = 'blue';
          }
        } else {
          ctx.fillStyle = 'black';
        }

        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [newtonBasinsParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawNewtonBasins;
