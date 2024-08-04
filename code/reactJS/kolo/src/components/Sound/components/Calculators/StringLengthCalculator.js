// Расчет длины струн для различных инструментов.

// StringLengthCalculator.js

/**
 * Расчет длины струн для различных инструментов.
 * Формула: L = (T / (4 * f^2 * A))^0.5
 * где L - длина струны, T - натяжение, f - частота, A - плотность струны.
 * @param {number} tension - Натяжение струны (Н).
 * @param {number} frequency - Частота (Гц).
 * @param {number} density - Плотность струны (кг/м).
 * @returns {number} - Длина струны (м).
 */
export function calculateStringLength(tension, frequency, density) {
    return Math.sqrt(tension / (4 * frequency ** 2 * density));
}
