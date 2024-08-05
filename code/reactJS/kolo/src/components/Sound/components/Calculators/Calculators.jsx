// SoundComponents.jsx
import React, { useState } from 'react';
import { calculateFrequency, adaptTo438Hz } from './FrequencyCalculator';
import { buildChord, determineScale, transpose_accords_or_gammas } from './HarmonyCalculator';
import { generateMelody, transposeMelody, analyzeMelodicPhrases } from './MelodyGenerator';
import { calculateResonatorSize } from './ResonatorSizeCalculator';
import { generateRhythmPattern } from './RhythmCalculator';
import { analyzeSpectrum, convertToDecibels, calculateFrequenciesAndIntervals, analyzeTemporalCharacteristics } from './SoundAnalysis';
import { calculateStringLength } from './StringLengthCalculator';
import { createTonic } from './TonicGenerator';

const SoundComponents = () => {
    // State hooks for each function's inputs and results
    const [baseFrequency, setBaseFrequency] = useState(440);
    const [semitones, setSemitones] = useState(0);
    const [frequency, setFrequency] = useState(440);
    const [resonatorType, setResonatorType] = useState('пластинчатый');
    const [note, setNote] = useState('C');
    const [intervals, setIntervals] = useState(['3', '5']);
    const [scale, setScale] = useState(['C', 'D', 'E']);
    const [melodyLength, setMelodyLength] = useState(10);
    const [melody, setMelody] = useState([]);
    const [transposedMelody, setTransposedMelody] = useState([]);
    const [resonatorSize, setResonatorSize] = useState(0);
    const [tonic, setTonic] = useState([]);
    const [rhythmPattern, setRhythmPattern] = useState([1, 0.5, 0.5]);
    const [bpm, setBpm] = useState(120);
    const [spectrum, setSpectrum] = useState([]);
    const [stringLength, setStringLength] = useState(0);

    // Handlers for updating the state
    const handleBaseFrequencyChange = (e) => setBaseFrequency(Number(e.target.value));
    const handleSemitonesChange = (e) => setSemitones(Number(e.target.value));
    const handleFrequencyChange = (e) => setFrequency(Number(e.target.value));
    const handleResonatorTypeChange = (e) => setResonatorType(e.target.value);
    const handleNoteChange = (e) => setNote(e.target.value);
    const handleIntervalsChange = (e) => setIntervals(e.target.value.split(','));
    const handleScaleChange = (e) => setScale(e.target.value.split(','));
    const handleMelodyLengthChange = (e) => setMelodyLength(Number(e.target.value));
    const handleMelodyChange = (e) => setMelody(e.target.value.split(','));
    const handleBpmChange = (e) => setBpm(Number(e.target.value));
    const handleRhythmPatternChange = (e) => setRhythmPattern(e.target.value.split(',').map(Number));
    const handleSpectrumChange = (e) => setSpectrum(e.target.value.split(',').map(Number));
    const handleStringLengthChange = (e) => setStringLength(Number(e.target.value));
    const handleTonicChange = (e) => setTonic(e.target.value.split(',').map(Number));

    // Calculate results
    const frequencyResult = calculateFrequency(baseFrequency, semitones);
    const adaptedFrequency = adaptTo438Hz(frequency);
    const chord = buildChord(note, intervals);
    const scaleNotes = determineScale(note, true); // true for major scale
    const transposedChord = transpose_accords_or_gammas(chord, semitones);
    const generatedMelody = generateMelody(scale, melodyLength);
    const transposedGeneratedMelody = transposeMelody(generatedMelody, semitones);
    const resonatorSizeResult = calculateResonatorSize(frequency, resonatorType);
    const rhythmPatternResult = generateRhythmPattern(rhythmPattern, bpm);
    const spectrumAnalysis = analyzeSpectrum(spectrum);
    const decibels = convertToDecibels(frequency);
    const frequenciesAndIntervals = calculateFrequenciesAndIntervals(spectrum);
    const temporalCharacteristics = analyzeTemporalCharacteristics(spectrum);
    const stringLengthResult = calculateStringLength(100, frequency, 0.01); // Example values
    const tonicResult = createTonic(frequency, 10);
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1>Музыкальные Инструменты и Анализ</h1>

            <div style={{ marginBottom: '20px' }}>
                <h2>Расчет частоты музыкальной ноты</h2>
                <label>Основная частота (Гц): <input type="number" value={baseFrequency} onChange={handleBaseFrequencyChange} /></label>
                <br />
                <label>Полутона: <input type="number" value={semitones} onChange={handleSemitonesChange} /></label>
                <br />
                <p>Результат частоты (с учетом полутона): <span style={{ color: 'blue' }}>{frequencyResult.toFixed(2)} Гц</span></p>
                <p>Адаптированная частота к 428 Гц: <span style={{ color: 'blue' }}>{adaptedFrequency.toFixed(2)} Гц</span></p>
                <hr />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Построение аккордов и гамм</h2>
                <label>Основной тон: <input type="text" value={note} onChange={handleNoteChange} /></label>
                <br />
                <label>Интервалы (через запятую): <input type="text" value={intervals.join(',')} onChange={handleIntervalsChange} /></label>
                <br />
                <p>Аккорд: <span style={{ color: 'blue' }}>{chord.join(', ')}</span></p>
                <p>Гамма: <span style={{ color: 'blue' }}>{scaleNotes.join(', ')}</span></p>
                <p>Транспонированный аккорд: <span style={{ color: 'blue' }}>{transposedChord.join(', ')}</span></p>
                <hr />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Генерация и транспонирование мелодий</h2>
                <label>Гамма (через запятую): <input type="text" value={scale.join(',')} onChange={handleScaleChange} /></label>
                <br />
                <label>Длина мелодии: <input type="number" value={melodyLength} onChange={handleMelodyLengthChange} /></label>
                <br />
                <label>Мелодия (через запятую): <input type="text" value={melody.join(',')} onChange={handleMelodyChange} /></label>
                <br />
                <p>Сгенерированная мелодия: <span style={{ color: 'blue' }}>{generatedMelody.join(', ')}</span></p>
                <p>Транспонированная мелодия: <span style={{ color: 'blue' }}>{transposedMelody.join(', ')}</span></p>
                <p>Анализ мелодических фраз: <span style={{ color: 'blue' }}>{JSON.stringify(analyzeMelodicPhrases(generatedMelody))}</span></p>
                <hr />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Расчет размеров резонаторов</h2>
                <label>Частота (Гц): <input type="number" value={frequency} onChange={handleFrequencyChange} /></label>
                <br />
                <label>Тип резонатора: <input type="text" value={resonatorType} onChange={handleResonatorTypeChange} /></label>
                <br />
                <button onClick={() => setResonatorSize(calculateResonatorSize(frequency, resonatorType))}>Рассчитать размер резонатора</button>
                <br />
                <p>Размер резонатора: <span style={{ color: 'blue' }}>{resonatorSize.toFixed(2)} м</span></p>
                <hr />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Генерация ритмических паттернов</h2>
                <label>Паттерн долей (через запятую): <input type="text" value={rhythmPattern.join(',')} onChange={handleRhythmPatternChange} /></label>
                <br />
                <label>Темп (BPM): <input type="number" value={bpm} onChange={handleBpmChange} /></label>
                <br />
                <button onClick={() => setRhythmPattern(generateRhythmPattern(rhythmPattern, bpm))}>Генерировать ритмический паттерн</button>
                <br />
                <p>Ритмический паттерн: <span style={{ color: 'blue' }}>{rhythmPattern.join(', ')}</span></p>
                <hr />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Анализ звуковых спектров</h2>
                <label>Спектр (через запятую): <input type="text" value={spectrum.join(',')} onChange={handleSpectrumChange} /></label>
                <br />
                <button onClick={() => setSpectrum(analyzeSpectrum(spectrum))}>Анализировать спектр</button>
                <br />
                <p>Анализ спектра: <span style={{ color: 'blue' }}>{JSON.stringify(spectrumAnalysis)}</span></p>
                <p>Децибелы: <span style={{ color: 'blue' }}>{decibels.toFixed(2)} дБ</span></p>
                <p>Частоты и интервалы: <span style={{ color: 'blue' }}>{JSON.stringify(frequenciesAndIntervals)}</span></p>
                <p>Темпоральные характеристики: <span style={{ color: 'blue' }}>{JSON.stringify(temporalCharacteristics)}</span></p>
                <hr />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Расчет длины струн</h2>
                <label>Основная частота (Гц): <input type="number" value={frequency} onChange={handleFrequencyChange} /></label>
                <br />
                <label>Материал струны: <input type="text" value="Нержавеющая сталь" /></label>
                <br />
                <button onClick={() => setStringLength(calculateStringLength(100, frequency, 0.01))}>Рассчитать длину струны</button>
                <br />
                <p>Длина струны: <span style={{ color: 'blue' }}>{stringLength.toFixed(2)} м</span></p>
                <hr />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Создание пользовательских тоников</h2>
                <label>Частота: <input type="number" value={frequency} onChange={handleFrequencyChange} /></label>
                <br />
                <label>Количество тоников: <input type="number" value={10} onChange={(e) => setTonic(createTonic(frequency, Number(e.target.value)))} /></label>
                <br />
                <p>Тоник: <span style={{ color: 'blue' }}>{tonic.join(', ')}</span></p>
            </div>
        </div>
    );

};

export default SoundComponents;
