// Реализация пифагорейского строя
// Равномерно темперированный строй

// Функция для реализации пифагорейского строя
export function pythagoreanTuning(baseFrequency = 432) {
	// Формулы для пифагорейского строя:
	// Чистая квинта: частота * (3/2)
	// Чистая кварта: частота * (4/3)
	const ratios = [1, 9/8, 81/64, 4/3, 3/2, 27/16, 243/128, 2];
	return ratios.map(ratio => baseFrequency * ratio);
  }

  // Функция для равномерно темперированного строя
  export function equalTemperamentTuning(baseFrequency = 432) {
	// Формулы для равномерно темперированного строя:
	// Каждая нота выше предыдущей на 2^(1/12)
	const ratio = Math.pow(2, 1/12);
	let frequencies = [baseFrequency];
	for (let i = 1; i < 12; i++) {
	  frequencies.push(baseFrequency * Math.pow(ratio, i));
	}
	frequencies.push(baseFrequency * 2); // Октава
	return frequencies;
  }
