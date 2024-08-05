import React, { useEffect, useState } from "react";

const WaveVisualizer = ({ audioCtx, source }) => {
	const [waveData, setWaveData] = useState([]);

	useEffect(() => {
		if (!audioCtx || !source) return;

		const analyser = audioCtx.createAnalyser();
		source.connect(analyser);
		analyser.connect(audioCtx.destination);

		analyser.fftSize = 2048;
		const bufferLength = analyser.fftSize;
		const dataArray = new Uint8Array(bufferLength);

		const draw = () => {
			analyser.getByteTimeDomainData(dataArray);

			const newWaveData = [];
			for (let i = 0; i < bufferLength; i++) {
				newWaveData.push(dataArray[i] / 128.0 - 1.0);
			}
			setWaveData(newWaveData);

			setTimeout(draw, 100); // Adjust the interval to slow down the visualization
		};

		draw();

		return () => {
			analyser.disconnect();
			source.disconnect(analyser);
		};
	}, [audioCtx, source]);

	const createPath = () => {
		const width = 800;
		const height = 200;
		const sliceWidth = width / waveData.length;
		let pathData = `M 0 ${height / 2}`;

		waveData.forEach((value, index) => {
			const x = index * sliceWidth;
			const y = (1 - value) * (height / 2);
			pathData += ` L ${x} ${y}`;
		});

		return pathData;
	};

	return (
		<svg width="800" height="200">
			<path d={createPath()} stroke="black" strokeWidth="2" fill="none" />
		</svg>
	);
};

export default WaveVisualizer;
