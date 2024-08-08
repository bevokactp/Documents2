// draw/Fractals/JuliaSet.jsx
import React, { useEffect, useRef } from 'react';

const DrawJuliaSet = ({ juliaSetParameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { realPart, imaginaryPart, iterations, zoom, offsetX, offsetY } = juliaSetParameters;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 600;

    // Julia Set drawing parameters
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const julia = (x, y) => {
      let real = x;
      let imaginary = y;
      let i = 0;
      while (i < iterations) {
        const tempReal = real * real - imaginary * imaginary + realPart;
        const tempImaginary = 2 * real * imaginary + imaginaryPart;
        real = tempReal;
        imaginary = tempImaginary;
        if (real * real + imaginary * imaginary > 4) break;
        i++;
      }
      return i;
    };

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const nx = (x - width / 2) / (0.5 * zoom * width) + offsetX;
        const ny = (y - height / 2) / (0.5 * zoom * height) + offsetY;
        const color = julia(nx, ny);
        const pixelIndex = (x + y * width) * 4;
        const hue = 255 * color / iterations;
        data[pixelIndex] = hue; // Red
        data[pixelIndex + 1] = hue; // Green
        data[pixelIndex + 2] = hue; // Blue
        data[pixelIndex + 3] = 255; // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [juliaSetParameters]);

  return <canvas ref={canvasRef} />;
};

export default DrawJuliaSet;
