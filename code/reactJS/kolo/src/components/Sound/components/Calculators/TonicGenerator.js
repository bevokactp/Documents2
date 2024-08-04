// Создание и управление пользовательскими тониками.

// TonicGenerator.js

/**
 * Создание пользовательских тоников.
 * Формула: тоник создается на основе заданного диапазона частот.
 * @param {number} baseFrequency - Основная частота (Гц).
 * @param {number} range - Диапазон частот.
 * @returns {number[]} - Частоты тоника.
 */
export function createTonic(baseFrequency, tonicRange) {
    const tonics = [];
    for (let i = 0; i < tonicRange; i++) {
      const frequency = baseFrequency * Math.pow(2, i / 12);
      // Format the frequency to 2 decimal places and convert it to a number
      tonics.push(Number(frequency.toFixed(2)));
    }
    return tonics;
  }
