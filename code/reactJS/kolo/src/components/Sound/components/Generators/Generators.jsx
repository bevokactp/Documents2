import React, { useState, useEffect, useRef } from 'react';
import { breakChordIntoNotes, createArpeggio } from './Arpeggiator';
import { generateWhiteNoise, generatePinkNoise } from './Noise';
import { createRhythmPattern } from './Rhythm';
import { generateSineWave, generateSquareWave } from './Signal';
import { generateTuning432Hz } from './Tuning';
import WaveformVisualizer from './Visualizer';


const Generators = () => {

  const [chord, setChord] = useState([261.63, 329.63, 392.00]); // Пример аккорда C, E, G
  const [arpeggioSpeed, setArpeggioSpeed] = useState(500); // Время арпеджио в миллисекундах
  const [noiseLength, setNoiseLength] = useState(190); // Длина шума в сэмплах
  const [sampleRateNose, setSampleRateNose] = useState(100); // Частота дискретизации
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [patternLength, setPatternLength] = useState(4);
  const [frequency, setFrequency] = useState(440); // Частота сигнала в Гц
  const [sampleRateWave, setsampleRateWave] = useState(10); // Частота дискретизации
  const [signalLengthWave, setSignalLengthWave] = useState(1000); // Длина сигнала в миллисекундах
  const [sampleRate432, setSampleRate432] = useState(10); // Частота дискретизации
  const [signalLength432, setSignalLength432] = useState(1000); // Длина сигнала в миллисекундах

  const notesFromChord = breakChordIntoNotes(chord);
  const arpeggio = createArpeggio(chord, arpeggioSpeed);
  const whiteNoise = generateWhiteNoise(noiseLength, sampleRateNose);
  const pinkNoise = generatePinkNoise(noiseLength, sampleRateNose);
  const rhythmPattern = createRhythmPattern(beatsPerMeasure, patternLength);
  const sineWave = generateSineWave(frequency, sampleRateWave, signalLengthWave);
  const rectancgeWave = generateSquareWave(frequency, sampleRateWave, signalLengthWave);
  const tuning432Hz = generateTuning432Hz(sampleRate432, signalLength432);

  return (
    <div>
		<WaveformVisualizer />
        <hr />
      <section>
        <p>разбивает аккорд на отдельные ноты и создает арпеджио. Аккорд задается в виде массива частот. Арпеджио создается с помощью заданной скорости.</p>
        <label> Аккорд (введите частоты через запятую): <input type="text" value={chord.join(', ')} onChange={(e) => setChord(e.target.value.split(',').map(num => parseFloat(num.trim())))} /> </label>
		<p><span style={{ color: 'blue', fontWeight: 'bold', }}>ноты: </span> {notesFromChord.join(', ')}</p>
        <br />
        <label> Скорость арпеджио (мс): <input type="number" value={arpeggioSpeed} onChange={(e) => setArpeggioSpeed(parseInt(e.target.value))} /> </label>
        <br />
        <p><span style={{ color: 'blue', fontWeight: 'bold', }}>арпеджио: </span> {arpeggio.join(', ')}</p>
        <hr />
      </section>

      <section>
        <label> Длина сигнала (сэмплы): <input type="number" value={noiseLength} onChange={(e) => setNoiseLength(parseInt(e.target.value))} /> </label>
		<label> Частота дискретизации (Гц): <input type="number" value={sampleRateNose} onChange={(e) => setSampleRateNose(parseInt(e.target.value))} /> </label>
        <br />
        <p><span style={{ color: 'blue', fontWeight: 'bold', }}>белый шум:</span> {whiteNoise.join(', ')}</p>
        <p><span style={{ color: 'blue', fontWeight: 'bold', }}>розовый шум:</span> {pinkNoise.join(', ')}</p>
        <hr />
      </section>

      <section>
        <p>ритм на основе количества ударов в такте и длины паттерна (в тактах).</p>
        <label> Удары в такте: <input type="number" value={beatsPerMeasure} onChange={(e) => setBeatsPerMeasure(parseInt(e.target.value))} /> </label>
        <br />
        <label> Длина паттерна (в тактах): <input type="number" value={patternLength} onChange={(e) => setPatternLength(parseInt(e.target.value))} /> </label>
        <br />
        <p><span style={{ color: 'blue', fontWeight: 'bold', }}>ритм: </span> {rhythmPattern.join(', ')}</p>
        <hr />
      </section>

      <section>
        <label> Частота сигнала (Гц): <input type="number" value={frequency} onChange={(e) => setFrequency(parseFloat(e.target.value))} /> </label>
        <br />
        <label> Длина сигнала (мс): <input type="number" value={signalLengthWave} onChange={(e) => setSignalLengthWave(parseInt(e.target.value))} /> </label>
        <br />
		<p><span style={{ color: 'blue', fontWeight: 'bold', }}>Синусоида: </span> {sineWave.map(value => value.toFixed(5)).join(', ')}</p>
		<p><span style={{ color: 'blue', fontWeight: 'bold', }}>ратноугоїда: </span> {rectancgeWave.map(value => value.toFixed(5)).join(', ')}</p>
        <hr />
      </section>

      <section>
        <p>генерирует звук с частотой 432 Гц. Частота дискретизации и длина сигнала задаются пользователем.</p>
        <label> Частота дискретизации (Гц): <input type="number" value={sampleRate432} onChange={(e) => setSampleRate432(parseInt(e.target.value))} /> </label>
        <br />
        <label> Длина сигнала (мс): <input type="number" value={signalLength432} onChange={(e) => setSignalLength432(parseInt(e.target.value))} /> </label>
        <br />
        <p><span style={{ color: 'blue', fontWeight: 'bold', }}>настройка 432 Гц</span>: {tuning432Hz.map(value => value.toFixed(1)).join(', ')}</p>
      </section>

    </div>
  );
};

export default Generators;
