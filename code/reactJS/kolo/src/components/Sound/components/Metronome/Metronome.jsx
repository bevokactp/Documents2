import React, { useState, useEffect, useRef } from 'react';
import './styles.css'; // подключите файл с CSS-стилями


const PATH_MEDIA_FILE = './1.mp3';


const Metronome = () => {
  const [bpm, setBpm] = useState(120);
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [isRunning, setIsRunning] = useState(false);
  const cueRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        playClick();
        flash();
      }, (60 / bpm) * 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, bpm]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleBpmChange = (e) => {
    setBpm(Number(e.target.value));
  };

  const handleSignatureChange = (e) => {
    setTimeSignature(e.target.value);
  };

  const playClick = () => {
    const audio = new Audio(PATH_MEDIA_FILE); // Укажите путь к вашему аудиофайлу
    audio.play();
  };

  const flash = () => {
    if (cueRef.current) {
      cueRef.current.classList.add('flash');
      setTimeout(() => {
        cueRef.current.classList.remove('flash');
      }, 100);
    }
  };

  return (
    <div>
      <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <input
        type="number"
        value={bpm}
        onChange={handleBpmChange}
        min="30"
        max="250"
      />
      <select value={timeSignature} onChange={handleSignatureChange}>
        <option value="4/4">4/4</option>
        <option value="3/4">3/4</option>
        <option value="6/8">6/8</option>
      </select>
      <div ref={cueRef} className="visual-cue"></div>
    </div>
  );
};

export default Metronome;
