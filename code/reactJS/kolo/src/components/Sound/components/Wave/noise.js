
export const createNoise = (audioCtx, type) => {
	const bufferSize = 2 * audioCtx.sampleRate;
	const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
	const output = noiseBuffer.getChannelData(0);

	if (type === 'white') {
	  for (let i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	  }
	} else if (type === 'pink') {
	  let b0, b1, b2, b3, b4, b5, b6;
	  b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
	  for (let i = 0; i < bufferSize; i++) {
		const white = Math.random() * 2 - 1;
		b0 = 0.99886 * b0 + white * 0.0555179;
		b1 = 0.99332 * b1 + white * 0.0750759;
		b2 = 0.96900 * b2 + white * 0.1538520;
		b3 = 0.86650 * b3 + white * 0.3104856;
		b4 = 0.55000 * b4 + white * 0.5329522;
		b5 = -0.7616 * b5 - white * 0.0168980;
		output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
		output[i] *= 0.11;
		b6 = white * 0.115926;
	  }
	}

	const noiseNode = audioCtx.createBufferSource();
	noiseNode.buffer = noiseBuffer;
	noiseNode.loop = true;
	return noiseNode;
  };
