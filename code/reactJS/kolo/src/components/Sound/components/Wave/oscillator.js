// src/utils/audioUtils.js

export const createOscillator = (audioCtx, type, frequency) => {
  const oscillator = audioCtx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  return oscillator;
};
