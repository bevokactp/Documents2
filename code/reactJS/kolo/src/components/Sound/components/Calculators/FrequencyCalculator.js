// Расчет частот музыкальных нот.
// Поддержка различных музыкальных систем (например, равномерно темперированный строй)

// FrequencyCalculator.js

/**
 * Расчет частоты музыкальной ноты.
 * Формула: f = f0 * 2^(n/12)
 * где f0 - частота первой ноты (например, 440 Гц для ноты Ля), n - номер полутона.
 * @param {number} baseFrequency - частота основной ноты (Гц).
 * @param {number} semitones - число полутонов относительно основной ноты.
 * @returns {number} - частота ноты (Гц).
 */
export function calculateFrequency(baseFrequency, semitones) {
    return baseFrequency * Math.pow(2, semitones / 12);
}

/**
 * Адаптация частоты к стандарту 432 Гц.
 * Формула: f = f * (432 / 440)
 * где f - частота в стандартной настройке 440 Гц.
 * @param {number} frequency - частота (Гц).
 * @returns {number} - адаптированная частота (Гц).
 */
export function adaptTo432Hz(frequency) {
    return frequency * (432 / 440);
}
