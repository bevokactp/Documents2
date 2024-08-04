// Отображение частотного спектра аудиосигнала.
// Анализ амплитуды и частоты

// Функция для анализа амплитуды (A = 20 * log10(V/V_ref))
export function analyzeAmplitude(voltage, referenceVoltage) {
    // voltage - напряжение (В)
    // referenceVoltage - опорное напряжение (В)
    const amplitude = 20 * Math.log10(voltage / referenceVoltage);
    return amplitude.toFixed(2);
}

// Функция для анализа частоты (f = 1 / T)
export function analyzeFrequency(period) {
    // period - период сигнала (с)
    const frequency = 1 / period;
    return frequency.toFixed(2);
}
