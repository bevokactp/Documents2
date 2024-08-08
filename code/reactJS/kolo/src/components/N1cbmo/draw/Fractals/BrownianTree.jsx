// draw/Fractals/BrownianTree.jsx
import React, { useEffect, useRef } from 'react';

const DrawBrownianTree = ({ treeParameters }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const { particles, branchLength } = treeParameters;

		// Options
		const seedResolution = 50;
		const clearShade = 0; // 0..255
		const clearStyle = `rgba(${clearShade}, ${clearShade}, ${clearShade}, 1)`;
		const shadeIncrement = 0.02;

		const width = canvas.width;
		const height = canvas.height;
		const cx = width / 2;
		const cy = height / 2;
		let shade = 120;

		function radius(x, y) {
			return Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
		}

		function test(x, y) {
			if (x < 0 || y < 0 || x >= width || y >= height) return false;
			const data = ctx.getImageData(x, y, 1, 1).data;
			return data[0] !== clearShade || data[1] !== clearShade || data[2] !== clearShade;
		}

		function setc(x, y, c) {
			shade = (shade + shadeIncrement) % 360;
			ctx.fillStyle = c ? `hsl(${shade}, 100%, 50%)` : clearStyle;
			ctx.fillRect(x, y, 1, 1);
		}

		function set(x, y) {
			setc(x, y, true);
		}

		function clear(x, y) {
			setc(x, y, false);
		}

		// Initialize canvas to blank opaque
		ctx.fillStyle = clearStyle;
		ctx.fillRect(0, 0, width, height);

		let x, y;
		let closeRadius = 1;

		// Place seed
		set(cx, cy);

		function newpos() {
			x = Math.floor(Math.random() * (width / seedResolution)) * seedResolution;
			y = Math.floor(Math.random() * (height / seedResolution)) * seedResolution;
		}
		newpos();

		const animation = setInterval(() => {
			clear(x, y);
			for (let i = 0; i < 10000; i++) {
				const ox = x;
				const oy = y;

				// Random movement in 8 directions
				switch (Math.floor(Math.random() * 8)) {
					case 0: x++; break;
					case 1: x--; break;
					case 2: y++; break;
					case 3: y--; break;
					case 4: x++; y++; break;
					case 5: x--; y++; break;
					case 6: x++; y--; break;
					case 7: x--; y--; break;
					default:
						return 1;
				}

				if (x < 0 || y < 0 || x >= width || y >= height || radius(x, y) > closeRadius + seedResolution + 2) {
					let progress = 1000;
					do {
						newpos();
						progress--;
					} while (
						(test(x - 1, y - 1) || test(x, y - 1) || test(x + 1, y - 1) ||
							test(x - 1, y) || test(x, y) || test(x + 1, y) ||
							test(x - 1, y + 1) || test(x, y + 1) || test(x + 1, y + 1)) && progress > 0
					);

					if (progress <= 0) {
						console.log("Stopped for lack of room.");
						clearInterval(animation);
						break;
					}
				}

				if (test(x, y)) {
					set(ox, oy);
					closeRadius = Math.max(closeRadius, radius(ox, oy));
					newpos();
				}
			}
			set(x, y);
		}, 1);

		return () => clearInterval(animation);

	}, [treeParameters]);

	return <canvas ref={canvasRef} width={300} height={300} />;
};

export default DrawBrownianTree;
