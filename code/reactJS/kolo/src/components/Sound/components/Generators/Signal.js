// Signal.js

/**
 * Генерирует синусоидальный сигнал.
 * @param {number} frequency - Частота сигнала в Гц.
 * @param {number} sampleRate - Частота дискретизации в Гц.
 * @param {number} length - Длина сигнала в миллисекундах.
 * @returns {Float32Array} Массив значений синусоидального сигнала.
 */
export function generateSineWave(frequency, sampleRate, length) {
	let samples = Math.floor((length / 1000) * sampleRate);
	let signal = new Float32Array(samples);
	for (let i = 0; i < samples; i++) {
	  signal[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate);
	}
	return signal;
  }

  /**
   * Генерирует прямоугольный сигнал.
   * @param {number} frequency - Частота сигнала в Гц.
   * @param {number} sampleRate - Частота дискретизации в Гц.
   * @param {number} length - Длина сигнала в миллисекундах.
   * @returns {Float32Array} Массив значений прямоугольного сигнала.
   */
  export function generateSquareWave(frequency, sampleRate, length) {
	let samples = Math.floor((length / 1000) * sampleRate);
	let signal = new Float32Array(samples);
	for (let i = 0; i < samples; i++) {
	  signal[i] = (Math.sin(2 * Math.PI * frequency * i / sampleRate) >= 0) ? 1 : -1;
	}
	return signal;
  }
