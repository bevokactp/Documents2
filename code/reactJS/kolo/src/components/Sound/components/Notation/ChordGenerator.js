// Генерация аккордов из заданных нот.
// Транспонирование аккордов в различные тональности

// Функция для генерации аккордов из заданных нот
export function generateChord(notes) {
	// Пример аккорда: ['C', 'E', 'G'] для C мажора
	// notes - массив нот, составляющих аккорд
	// Возвращаем аккорд в виде массива нот
	return notes;
  }

  // Функция для транспонирования аккордов в различные тональности
  export function transposeChord(chord, semitones) {
	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	return chord.map(note => {
	  let index = notes.indexOf(note);
	  if (index === -1) throw new Error(`Note ${note} is not valid.`);
	  return notes[(index + semitones) % notes.length];
	});
  }
