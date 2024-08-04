// Rhythm.js

/**
 * Создает ритмический паттерн.
 * @param {number} beatsPerMeasure - Количество ударов в такте.
 * @param {number} patternLength - Длина паттерна в тактах.
 * @returns {Array<number>} Массив ритмических паттернов.
 */
export function createRhythmPattern(beatsPerMeasure, patternLength) {
	let pattern = [];
	for (let i = 0; i < patternLength * beatsPerMeasure; i++) {
	  pattern.push(i % beatsPerMeasure);
	}
	return pattern;
  }
