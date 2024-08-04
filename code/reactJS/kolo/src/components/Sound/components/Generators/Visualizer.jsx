import React, { useRef, useEffect, useState } from 'react';
import { generateSineWave, generateSquareWave } from './Signal.js';
import { generateWhiteNoise, generatePinkNoise } from './Noise.js';

const WaveformVisualizer = () => {
  const canvasRef = useRef(null);
  const [waveType, setWaveType] = useState('sine');
  const [frequency, setFrequency] = useState(200); // Частота в Гц
  const [length, setLength] = useState(50); // Длина в миллисекундах
  const [sampleRate, setSampleRate] = useState(2000); // Частота дискретизации в Гц

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let signal;

    switch (waveType) {
      case 'whiteNoise':
        signal = generateWhiteNoise(length, sampleRate);
        break;
      case 'pinkNoise':
        signal = generatePinkNoise(length, sampleRate);
        break;
      case 'sine':
        signal = generateSineWave(frequency, sampleRate, length);
        break;
      case 'square':
        signal = generateSquareWave(frequency, sampleRate, length);
        break;
      default:
        signal = new Float32Array(0);
    }

    const numSamples = signal.length;
    const step = width / numSamples;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let i = 0; i < numSamples; i++) {
      const x = i * step;
      const y = height / 2 - (signal[i] * height / 2);
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }, [waveType, frequency, length, sampleRate]);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={200} />
      <div>
        <label> Wave Type:
          <select value={waveType} onChange={(e) => setWaveType(e.target.value)}>
            <option value="sine">Sine Wave</option>
            <option value="square">Square Wave</option>
            <option value="whiteNoise">White Noise</option>
            <option value="pinkNoise">Pink Noise</option>
          </select>
        </label>
        {waveType !== 'whiteNoise' && waveType !== 'pinkNoise' && (
          <> <label> Frequency (Hz): <input type="number" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} /> </label> </>
        )}
        <label> Length (ms): <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} /> </label>
        <label> Sample Rate (Hz): <input type="number" value={sampleRate} onChange={(e) => setSampleRate(Number(e.target.value))} /> </label>
      </div>
    </div>
  );
};

export default WaveformVisualizer;
