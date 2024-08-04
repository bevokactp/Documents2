// Отображение нот на нотном стане.
// Транспонирование и изменение длительности нот.
// Создание партитур.

import { transposeChord } from './ChordGenerator.js';

// Функция для отображения нот на нотном стане
export function displayNotes(notes) {
  // Пример отображения нот: ['C4', 'E4', 'G4']
  // notes - массив нот с октавой, например 'C4'
  return notes;
}

// Функция для транспонирования нот
export function transposeNotes(notes, semitones) {
  return notes.map(note => transposeChord([note], semitones)[0]);
}

// Функция для изменения длительности нот
export function changeNoteDuration(notes, duration) {
  // Пример: изменить все ноты на четверти
  return notes.map(note => ({ note, duration }));
}

// Функция для создания партитур
export function createScore(parts) {
  // parts - массив частей партитуры
  // Пример: [['C4', 'E4', 'G4'], ['G4', 'B4', 'D5']]
  return parts;
}
