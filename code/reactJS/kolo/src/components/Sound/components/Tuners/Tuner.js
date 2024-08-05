// Определение высоты звука инструмента.
// Визуальная индикация для настройки инструмента.
// Сравнение входного звука с эталонной частотой.
import React, { useState, useEffect } from 'react';
import { useAudioInput, useFrequencyAnalyzer } from './hooks';
import { getNoteFromFrequency, getDetuneAmount } from './utils';
import './styles.css';

const Tuner = () => {
  const [audioContext, _, stream] = useAudioInput();
  const [frequency, startAnalyzing, stopAnalyzing] = useFrequencyAnalyzer(audioContext, stream);
  const [note, setNote] = useState('');
  const [detune, setDetune] = useState(0);

  useEffect(() => {
    if (frequency) {
      const note = getNoteFromFrequency(frequency);
      const detune = getDetuneAmount(frequency, note.frequency);
      setNote(note.name);
      setDetune(detune);
    }
  }, [frequency]);

  return (
    <div className="tuner">
      <button onClick={startAnalyzing}>Start Tuning</button>
      <button onClick={stopAnalyzing}>Stop Tuning</button>
      <div className="display">
        <span className="note">{note}</span>
        <span className={`detune ${detune < 0 ? 'flat' : 'sharp'}`}>{detune.toFixed(2)} cents</span>
      </div>
    </div>
  );
};

export default Tuner;
