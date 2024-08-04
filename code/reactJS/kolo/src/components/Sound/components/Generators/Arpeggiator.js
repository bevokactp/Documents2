// Разбивка аккордов на отдельные ноты.
// Создание арпеджио

// Arpeggiator.js

/**
 * Разбивает аккорд на отдельные ноты.
 * @param {Array<number>} chord - Массив частот, представляющих аккорд.
 * @returns {Array<number>} Массив отдельных нот.
 */
export function breakChordIntoNotes(chord) {
	// Пример простейшего разделения аккорда на отдельные ноты
	return chord;
  }

  /**
   * Создает арпеджио из аккорда.
   * @param {Array<number>} chord - Массив частот, представляющих аккорд.
   * @param {number} speed - Скорость арпеджио в миллисекундах.
   * @returns {Array<number>} Массив частот арпеджио.
   */
  export function createArpeggio(chord, speed) {
	// Пример генерации арпеджио с задержкой
	let arpeggio = [];
	for (let i = 0; i < chord.length; i++) {
	  arpeggio.push(chord[i]);
	  // Добавляем задержку
	}
	return arpeggio;
  }
