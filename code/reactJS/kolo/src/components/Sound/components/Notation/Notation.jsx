import React, { useState } from 'react';
import { generateChord, transposeChord } from './ChordGenerator.js';
import { generateCircleOfFifths } from './CircleOfFifths.js';
import { createScale } from './ScaleCreator.js';
import { pythagoreanTuning, equalTemperamentTuning } from './Tuning.js';
import CircleOfFifths from './CircleOfFifths.jsx';

const Notation = () => {
	const [chordNotes, setChordNotes] = useState(['C', 'E', 'G']);
	const [transposedChord, setTransposedChord] = useState(['C', 'E', 'G']);
	const [scale, setScale] = useState([]);
	const [pythagoreanTuningState, setPythagoreanTuningState] = useState([]);
	const [equalTemperamentTuningState, setEqualTemperamentTuningState] = useState([]);
	const [inputChordNotes, setInputChordNotes] = useState('C,E,G');
	const [inputChordNotesTranspose, setInputChordNotesTranspose] = useState('C,E,G');
	const [transposeSemitones, setTransposeSemitones] = useState('0');
	const [inputTonic, setInputTonic] = useState('C');
	const [inputIntervals, setInputIntervals] = useState('2,2,1,2,2,2,1');
	const [tuningFrequency, setTurningFrequency] = useState(438);
	const [circleOfFifths, setCircleOfFifths] = useState([]);

	const handleGenerateChord = () => {
		const notes = inputChordNotes.split(',').map(note => note.trim());
		setChordNotes(generateChord(notes));
	};

	const handleTransposeChord = () => {
		const semitones = parseInt(transposeSemitones, 10);
		const notes = inputChordNotes.split(',').map(note => note.trim());
		setTransposedChord(transposeChord(notes, semitones));
	};

	const handleGenerateCircleOfFifths = () => {
		setCircleOfFifths(generateCircleOfFifths());
	};

	const handleCreateScale = () => {
		const tonic = inputTonic;
		const intervals = inputIntervals.split(',').map(interval => parseInt(interval.trim(), 10));
		setScale(createScale(tonic, intervals));
	};

	const handleTuning = () => {
		setPythagoreanTuningState(pythagoreanTuning(tuningFrequency));
		setEqualTemperamentTuningState(equalTemperamentTuning(tuningFrequency));
	};

	return (
		<div>
			<h2>Генерация аккордов</h2>
			<input type="text" value={inputChordNotes} onChange={(e) => setInputChordNotes(e.target.value)} placeholder="ноты аккорда (например, C,E,G)" />

			<button onClick={handleGenerateChord}>Генерировать аккорд</button>
			<p>Генерация аккордов из заданных нот. Формула: возвращает массив нот, составляющих аккорд.</p>
			<p>{chordNotes.join(', ')}</p>

			<h2>Транспонирование аккорда</h2>
			<input type="text" value={inputChordNotesTranspose} onChange={(e) => setInputChordNotesTranspose(e.target.value)} placeholder="ноты аккорда (например, C,E,G)" />
			<input type="number" value={transposeSemitones} onChange={(e) => setTransposeSemitones(e.target.value)} placeholder="количество полутонов" />
			<button onClick={handleTransposeChord}>Транспонировать аккорд</button>
			<p>Транспонирование аккордов в различные тональности. Формула: нота + (количество полутонов) % 12</p>
			<p>{transposedChord.join(', ')}</p>

			<h2>Квинтовый круг</h2>
			<button onClick={handleGenerateCircleOfFifths}>Генерировать квинтовый круг</button>
			<p>Генерация квинтового круга. Формула: последовательность нот в квинтовом круге</p>
			<p>{circleOfFifths.join(', ')}</p>
			<CircleOfFifths notes={circleOfFifths} />

			<h2>Создание гаммы</h2>
			<input type="text" value={inputTonic} onChange={(e) => setInputTonic(e.target.value)} placeholder="Введите тонику (например, C)" />
			<input type="text" value={inputIntervals} onChange={(e) => setInputIntervals(e.target.value)} placeholder="интервалы (например, 2,2,1,2,2,2,1)"
			/>
			<button onClick={handleCreateScale}>Создать гамму</button>
			<p>Создание звукоряда на основе тоники и интервалов. Формула: тоника + интервалы между нотами</p>
			<p>{scale.join(', ')}</p>

			<h2>Cтрой</h2>
			<input type="number" value={tuningFrequency} onChange={(e) => setTurningFrequency(e.target.value)} placeholder="Введите базовую частоту" />
			<button onClick={handleTuning}>Строй</button>
			<p>пифагорейский строй: частота * (3/2) для чистой квинты, и т.д</p>
			<p>{pythagoreanTuningState.join(', ')}</p>
			<p>Равномерно темперированный строй: каждая нота выше предыдущей на 2^(1/12)</p>
			<p>{equalTemperamentTuningState.join(', ')}</p>
		</div>
	);
};

export default Notation;
