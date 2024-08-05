// Tuning.js

/**
 * Генерирует звук в соответствии с заданной частотой.
 * @param {number} frequency - Частота в Гц.
 * @param {number} sampleRate - Частота дискретизации в Гц.
 * @param {number} length - Длина сигнала в миллисекундах.
 * @returns {Float32Array} Массив значений звукового сигнала.
 */
export function generateTone(frequency, sampleRate, length) {
	let samples = Math.floor((length / 1000) * sampleRate);
	let signal = new Float32Array(samples);
	for (let i = 0; i < samples; i++) {
	  signal[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate);
	}
	return signal;
  }

  /**
   * Генерирует настройку частоты 432 Гц.
   * @param {number} sampleRate - Частота дискретизации в Гц.
   * @param {number} length - Длина сигнала в миллисекундах.
   * @returns {Float32Array} Массив значений звукового сигнала.
   */
  export function generateTuning432Hz(sampleRate, length) {
	return generateTone(432, sampleRate, length);
  }
