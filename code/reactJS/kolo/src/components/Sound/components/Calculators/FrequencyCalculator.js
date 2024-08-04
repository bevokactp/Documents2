// Расчет частот музыкальных нот.
// Поддержка различных музыкальных систем (например, равномерно темперированный строй)
// Работы с частотой 438 Гц и адаптацией частот.

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
 * Адаптация частоты к стандарту 438 Гц.
 * Формула: f = f * (438 / 440)
 * где f - частота в стандартной настройке 440 Гц.
 * @param {number} frequency - частота (Гц).
 * @returns {number} - адаптированная частота (Гц).
 */
export function adaptTo438Hz(frequency) {
    return frequency * (438 / 440);
}
