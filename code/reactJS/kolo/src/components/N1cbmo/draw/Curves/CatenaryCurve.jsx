import React, { useRef, useEffect } from 'react';

const Draw = ({ parameters }) => {
  const { amplitude, horizontalShift, verticalShift } = parameters;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height); // Clear the canvas

    // Draw the catenary curve
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    const scale = 20; // Scaling factor for better visualization
    const offsetX = width / 2; // Center the curve horizontally
    const offsetY = height / 2;

    for (let x = -width / 2; x <= width / 2; x += 1) {
      const t = (x + horizontalShift) / scale;
      const y = amplitude * Math.cosh(t) + verticalShift;
      ctx.lineTo(x + offsetX, offsetY - y); // Draw the curve
    }

    ctx.stroke();
  }, [amplitude, horizontalShift, verticalShift]);

  return <canvas ref={canvasRef} width={500} height={400} />;
};

export default Draw;
