// Генерация мелодий на основе заданных параметров.
// Транспонирование мелодий и анализ мелодических фраз

// MelodyGenerator.js

/**
 * Генерация мелодий на основе заданных параметров.
 * Формула: случайный выбор нот из заданного набора.
 * @param {string[]} scale - Ноты гаммы (например, ["C", "D", "E"]).
 * @param {number} length - Длина мелодии (количество нот).
 * @returns {string[]} - Сгенерированная мелодия.
 */
export function generateMelody(scale, length) {
    let melody = [];
    for (let i = 0; i < length; i++) {
        melody.push(scale[Math.floor(Math.random() * scale.length)]);
    }
    return melody;
}

/**
 * Транспонирование мелодий.
 * Формула: перенести каждую ноту на заданное число полутонов.
 * @param {string[]} melody - Мелодия (например, ["C", "D", "E"]).
 * @param {number} semitones - Число полутонов для транспонирования.
 * @returns {string[]} - Транспонированная мелодия.
 */
export function transposeMelody(melody, semitones) {
    return melody.map(note => `${note}+${semitones}`);
}

/**
 * Анализ мелодических фраз.
 * Формула: анализ частотности нот, интервалов и ритмов.
 * @param {string[]} melody - Мелодия.
 * @returns {object} - Анализ (например, частотность нот).
 */
export function analyzeMelodicPhrases(melody) {
    const analysis = {};
    melody.forEach(note => {
        analysis[note] = (analysis[note] || 0) + 1;
    });
    return analysis;
}
