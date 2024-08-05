const noteFrequencies = [
	{ name: 'C', frequency: 261.63 },
	{ name: 'C#', frequency: 277.18 },
	{ name: 'D', frequency: 293.66 },
	// Добавьте все ноты...
  ];

  export const getNoteFromFrequency = (frequency) => {
	let closest = noteFrequencies[0];
	let minDiff = Math.abs(frequency - closest.frequency);
	for (let note of noteFrequencies) {
	  const diff = Math.abs(frequency - note.frequency);
	  if (diff < minDiff) {
		minDiff = diff;
		closest = note;
	  }
	}
	return closest;
  };

  export const getDetuneAmount = (frequency, referenceFrequency) => {
	return 1200 * Math.log2(frequency / referenceFrequency);
  };
