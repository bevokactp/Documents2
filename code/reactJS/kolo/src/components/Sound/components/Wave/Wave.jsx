import React, { useState, useEffect, useRef } from 'react';
import { createNoise } from './noise';
import { createOscillator } from './oscillator';
import WaveVisualizer from './WaveVisualizer';
import './styles.css';



const Oscillator = () => {
  const [audioCtx, setAudioCtx] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [noise, setNoise] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(440);
  const [waveType, setWaveType] = useState('sine');
  const [noiseType, setNoiseType] = useState('white');

  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioCtx(ctx);

    return () => {
      ctx.close();
    };
  }, []);

  const startOscillator = () => {
    if (audioCtx) {
      const osc = createOscillator(audioCtx, waveType, frequency);
      osc.connect(audioCtx.destination);
      osc.start();
      setOscillator(osc);
      setNoise(null);  // Stop noise when oscillator starts
      setIsPlaying(true);
    }
  };

  const stopOscillator = () => {
    if (oscillator) {
      oscillator.stop();
      setOscillator(null);
      setIsPlaying(false);
    }
  };

  const startNoise = () => {
    if (audioCtx) {
      const noiseNode = createNoise(audioCtx, noiseType);
      noiseNode.connect(audioCtx.destination);
      noiseNode.start();
      setNoise(noiseNode);
      setOscillator(null);  // Stop oscillator when noise starts
      setIsPlaying(true);
    }
  };

  const stopNoise = () => {
    if (noise) {
      noise.stop();
      setNoise(null);
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <h1>Oscillator</h1>
      <div>
        <label>Frequency: </label>
        <input
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Wave Type: </label>
        <select value={waveType} onChange={(e) => setWaveType(e.target.value)}>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>
      <div>
        <button onClick={isPlaying ? stopOscillator : startOscillator}>
          {isPlaying ? 'Stop Oscillator' : 'Start Oscillator'}
        </button>
      </div>
      <div>
        <label>Noise Type: </label>
        <select value={noiseType} onChange={(e) => setNoiseType(e.target.value)}>
          <option value="white">White Noise</option>
          <option value="pink">Pink Noise</option>
        </select>
      </div>
      <div>
        <button onClick={isPlaying ? stopNoise : startNoise}>
          {isPlaying ? 'Stop Noise' : 'Start Noise'}
        </button>
      </div>
      {oscillator && <WaveVisualizer audioCtx={audioCtx} source={oscillator} />}
      {noise && <WaveVisualizer audioCtx={audioCtx} source={noise} />}
    </div>
  );
};

export default Oscillator;
