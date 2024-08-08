import React, { useEffect, useRef } from 'react';

const DrawGoldenSpiral = ({ parameters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { initialRadius, numberOfTurns } = parameters;

	const growthFactor = 1.618;

    canvas.width = 800;  // width of the canvas
    canvas.height = 800; // height of the canvas

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const drawGoldenSpiral = () => {
      let angle = 0;
      let radius = initialRadius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      for (let i = 0; i < numberOfTurns * 360; i++) {
        angle = i * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        ctx.lineTo(x, y);
        radius *= growthFactor ** (1 / 360); // growth per degree
      }
      ctx.stroke();
    };

    drawGoldenSpiral();
  }, [parameters]);

  return <canvas ref={canvasRef}></canvas>;
};

export default DrawGoldenSpiral;
