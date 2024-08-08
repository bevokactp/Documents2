import React, { useRef, useEffect, useCallback } from 'react';

const DrawPythagorasTree = ({ pythagorasTreeParameters }) => {
	const canvasRef = useRef(null);
	const { angle, width, recursion, colorGradient } = pythagorasTreeParameters;

	// Function to generate rainbow colors
	const rainbow = useCallback((recursion, depth) => {
		const hue = (depth / recursion) * 360;
		return `hsl(${hue}, 100%, 50%)`;
	}, []);

	// Draw function similar to the provided JavaScript code
	const drawTree = useCallback((ctx, j, width, angle) => {
		if (j <= 0) return;

		if (colorGradient) {
			const gradient = ctx.createLinearGradient(0, 0, 800, 800);
			gradient.addColorStop(0, rainbow(recursion, j));
			gradient.addColorStop(1, rainbow(recursion, j));
			ctx.strokeStyle = gradient;
		} else {
			ctx.strokeStyle = "#FFFFFF";
		}

		ctx.beginPath();
		ctx.rect(0, 0, width, -width);
		ctx.stroke();

		const alpha = angle;
		const beta = 90 - angle;
		const w1 = Math.cos(alpha * (Math.PI / 180)) * width;
		const w2 = Math.cos(beta * (Math.PI / 180)) * width;
		const h = Math.sin(beta * (Math.PI / 180)) * w2;
		const x = Math.sqrt(Math.pow(w1, 2) - Math.pow(h, 2));
		const b = (Math.asin(h / w2) / Math.PI) * 180;

		ctx.save();
		ctx.translate(0, -width);
		ctx.rotate(-angle * (Math.PI / 180));
		drawTree(ctx, j - 1, w1, angle);
		ctx.restore();

		ctx.save();
		ctx.translate(x, -width - h);
		ctx.rotate(b * (Math.PI / 180));
		drawTree(ctx, j - 1, w2, angle);
		ctx.restore();
	}, [colorGradient, rainbow, recursion]);

	// Update function to handle drawing
	const update = useCallback(() => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.clearRect(0, 0, 500, 500); // Fixed size
		ctx.translate((500 / 2) - width / 2, (500 / 2) + 200); // Fixed size
		drawTree(ctx, recursion, width, angle);
	}, [width, angle, recursion, drawTree]);

	// Handle canvas setup
	const setupCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		canvas.width = 500; // Fixed size
		canvas.height = 500; // Fixed size
		update();
	}, [update]);

	useEffect(() => {
		setupCanvas();
	}, [setupCanvas]);

	useEffect(() => {
		update();
	}, [update]);

	return <canvas ref={canvasRef} />;
};

export default DrawPythagorasTree;
