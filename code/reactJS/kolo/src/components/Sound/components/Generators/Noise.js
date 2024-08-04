/**
 * Генерирует белый шум.
 * @param {number} length - Длина звукового сигнала в миллисекундах.
 * @param {number} sampleRate - Частота дискретизации в Гц.
 * @returns {Float32Array} Массив значений белого шума.
 */
export function generateWhiteNoise(length, sampleRate) {
    // Преобразуем длину из миллисекунд в количество сэмплов
    const numSamples = Math.floor((length / 1000) * sampleRate);
    let noise = new Float32Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
        noise[i] = Math.random() * 2 - 1; // Генерация значения в диапазоне [-1, 1]
    }
	console.log(noise, length, sampleRate)
    return noise;
}

/**
 * Генерирует розовый шум.
 * @param {number} length - Длина звукового сигнала в миллисекундах.
 * @param {number} sampleRate - Частота дискретизации в Гц.
 * @returns {Float32Array} Массив значений розового шума.
 */
export function generatePinkNoise(length, sampleRate) {
    // Преобразуем длину из миллисекунд в количество сэмплов
    const numSamples = Math.floor((length / 1000) * sampleRate);
    const numBands = 16;
    const bandWeights = new Array(numBands).fill(0).map((_, i) => 1 / Math.sqrt(i + 1));
    const whiteNoise = generateWhiteNoise(length, sampleRate);
    let filteredNoise = new Float32Array(numSamples);

    // Генерация розового шума с использованием простого фильтра
    for (let i = 0; i < numSamples; i++) {
        let value = 0;
        for (let band = 0; band < numBands; band++) {
            if (i - band >= 0) {
                value += whiteNoise[i - band] * bandWeights[band];
            }
        }
        filteredNoise[i] = value;
    }

    return filteredNoise;
}
