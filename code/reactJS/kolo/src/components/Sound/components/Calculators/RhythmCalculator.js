// Поддержка ритмических паттернов и темпов.

// RhythmCalculator.js

/**
 * Генерация ритмического паттерна.
 * Формула: создание паттерна на основе заданных долей и длительностей.
 * @param {number[]} pattern - Паттерн долей (например, [1, 0.5, 0.5]).
 * @param {number} beatsPerMinute - Темп (ударов в минуту).
 * @returns {string[]} - Ритмический паттерн.
 */
export function generateRhythmPattern(pattern, beatsPerMinute) {
    return pattern.map(duty => `${duty} (${beatsPerMinute} BPM)`);
}
