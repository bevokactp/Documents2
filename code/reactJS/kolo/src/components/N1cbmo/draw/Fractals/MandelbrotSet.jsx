// draw/Fractals/MandelbrotSet.jsx
import React, { useEffect, useRef } from 'react';

const DrawMandelbrotSet = ({ mandelbrotParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const {
      width,
      height,
      minReal,
      maxReal,
      minImaginary,
      maxImaginary,
      maxIterations
    } = mandelbrotParameters;

    canvas.width = width;
    canvas.height = height;

    // Mandelbrot Set algorithm
    const mandelbrot = () => {
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      const realRange = maxReal - minReal;
      const imaginaryRange = maxImaginary - minImaginary;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let cReal = minReal + (x / width) * realRange;
          let cImaginary = minImaginary + (y / height) * imaginaryRange;
          let zReal = cReal;
          let zImaginary = cImaginary;
          let isInside = true;
          let iteration;

          for (iteration = 0; iteration < maxIterations; iteration++) {
            let zReal2 = zReal * zReal;
            let zImaginary2 = zImaginary * zImaginary;

            if (zReal2 + zImaginary2 > 4) {
              isInside = false;
              break;
            }

            zImaginary = 2 * zReal * zImaginary + cImaginary;
            zReal = zReal2 - zImaginary2 + cReal;
          }

          const color = isInside
            ? [0, 0, 0, 255] // Black for points inside the set
            : [(iteration / maxIterations) * 255, 0, 0, 0]; // Red gradient for points outside

          const index = (y * width + x) * 4;
          data[index] = color[0];
          data[index + 1] = color[1];
          data[index + 2] = color[2];
          data[index + 3] = color[3];
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    mandelbrot();
  }, [mandelbrotParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawMandelbrotSet;
