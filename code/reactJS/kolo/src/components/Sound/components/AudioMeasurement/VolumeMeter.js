// Измерение уровня громкости аудиосигнала.

// Функция для измерения уровня громкости (SPL = 20 * log10(P/P_ref))
export function measureVolume(pressure, referencePressure) {
    // pressure - звуковое давление (Па)
    // referencePressure - опорное звуковое давление (Па)
    const volume = 20 * Math.log10(pressure / referencePressure);
    return volume.toFixed(2);
}
