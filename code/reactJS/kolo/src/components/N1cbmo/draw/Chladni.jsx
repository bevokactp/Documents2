import React, { useEffect, useRef } from 'react';

const Draw = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const { lengthSide, frequency, amplitude, step } = parameters;

    canvas.width = lengthSide;
    canvas.height = lengthSide;

    const drawChladniPattern = () => {
      ctx.clearRect(0, 0, lengthSide, lengthSide);

      const centerX = lengthSide / 2;
      const centerY = lengthSide / 2;

      for (let x = 0; x < lengthSide; x += step) {
        for (let y = 0; y < lengthSide; y += step) {
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const wave = amplitude * Math.sin(frequency * distance - angle);

          const brightness = (Math.sin(wave) + 1) * 0.5 * 255; // Используем синус от волны для большей контрастности
          ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
          ctx.fillRect(x, y, step, step);
        }
      }
    };

    drawChladniPattern();
  }, [parameters]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Draw;
