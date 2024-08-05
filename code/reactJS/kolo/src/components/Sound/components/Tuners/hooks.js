import { useState, useEffect } from 'react';

export const useAudioInput = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [audioInput, setAudioInput] = useState(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const initAudio = async () => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const input = context.createMediaStreamSource(stream);
      setAudioContext(context);
      setAudioInput(input);
      setStream(stream);
    };

    initAudio();
  }, []);

  return [audioContext, audioInput, stream];
};

export const useFrequencyAnalyzer = (audioContext, stream) => {
  const [frequency, setFrequency] = useState(null);
  let analyser, dataArray, bufferLength;

  const startAnalyzing = () => {
    analyser = audioContext.createAnalyser();
    bufferLength = analyser.fftSize;
    dataArray = new Float32Array(bufferLength);
    const processor = audioContext.createScriptProcessor(1024, 1, 1);

    processor.onaudioprocess = () => {
      analyser.getFloatTimeDomainData(dataArray);
      const freq = getFrequencyFromData(dataArray, audioContext.sampleRate);
      setFrequency(freq);
    };

    audioContext.resume();
    analyser.connect(audioContext.destination);
    processor.connect(audioContext.destination);
  };

  const stopAnalyzing = () => {
    audioContext.suspend();
  };

  return [frequency, startAnalyzing, stopAnalyzing];
};

const getFrequencyFromData = (data, sampleRate) => {
  // Анализ данных для получения частоты
  // (можно использовать алгоритм авто-корреляции или другой метод)
  return 432; // Псевдочастота для примера
};
