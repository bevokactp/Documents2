// Создание и управление пользовательскими тониками.

// TonicGenerator.js

/**
 * Создание пользовательских тоников.
 * Формула: тоник создается на основе заданного диапазона частот.
 * @param {number} baseFrequency - Основная частота (Гц).
 * @param {number} range - Диапазон частот.
 * @returns {number[]} - Частоты тоника.
 */
export function createTonic(baseFrequency, range) {
    let tonic = [];
    for (let i = 0; i < range; i++) {
        tonic.push(baseFrequency * Math.pow(2, i / 12));
    }
    return tonic;
}
