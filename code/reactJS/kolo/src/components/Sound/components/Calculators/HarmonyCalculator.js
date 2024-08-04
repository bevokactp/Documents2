// Построение аккордов, определение гамм и тональностей, транспонирование.
// HarmonyCalculator.js

/**
 * Построение аккордов на основе заданного тона.
 * Формула: аккорд строится на основе заданного тона и интервалов (например, терция, квинта).
 * @param {string} rootNote - Основной тон (например, "C", "D#").
 * @param {string[]} intervals - Интервалы аккорда (например, ["3", "5"] для мажорного аккорда).
 * @returns {string[]} - Ноты аккорда.
 */
export function buildChord(rootNote, intervals) {
    // Простейшая реализация. Настоящая функция может использовать музыкальные теории.
    return intervals.map(interval => `${rootNote}+${interval}`);
}

/**
 * Определение гамм и тональностей.
 * Формула: Гамма определяется набором нот и их интервалами.
 * @param {string} key - Основной тон (например, "C", "D#").
 * @param {boolean} isMajor - Определяет мажорная гамма или минорная.
 * @returns {string[]} - Ноты гаммы.
 */
export function determineScale(key, isMajor) {
    // Простейшая реализация. Реальная гамма зависит от теории.
    return isMajor ? [key, `${key}2`, `${key}3`] : [`${key}m`, `${key}m2`, `${key}m3`];
}

/**
 * Транспонирование аккордов или гамм.
 * Формула: перенести ноты на заданное число полутонов.
 * @param {string[]} notes - Ноты (например, ["C", "E", "G"]).
 * @param {number} semitones - Число полутонов для транспонирования.
 * @returns {string[]} - Транспонированные ноты.
 */
export function transpose_accords_or_gammas(notes, semitones) {
    return notes.map(note => `${note}+${semitones}`);
}
