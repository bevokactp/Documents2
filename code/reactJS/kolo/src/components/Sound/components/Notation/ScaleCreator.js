// Создание и работа со звукорядами и кастомными музыкальными системами.

// Функция для создания звукоряда
export function createScale(tonic, intervals) {
	// Пример: 'C', [2, 2, 1, 2, 2, 2, 1] для мажорной гаммы
	// tonic - тоника, intervals - интервалы между нотами
	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	let scale = [tonic];
	let index = notes.indexOf(tonic);
	intervals.forEach(interval => {
	  index = (index + interval) % notes.length;
	  scale.push(notes[index]);
	});
	return scale;
  }

  // Функция для работы с кастомными музыкальными системами
  export function createCustomSystem(baseFrequency, ratios) {
	// Пример: 440, [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2]
	// baseFrequency - базовая частота, ratios - массив отношений частот
	return ratios.map(ratio => baseFrequency * ratio);
  }
