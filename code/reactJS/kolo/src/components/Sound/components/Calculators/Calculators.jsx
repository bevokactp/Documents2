import { useState } from 'react';
import { calculateFrequency, adaptTo438Hz } from './FrequencyCalculator';
import { buildChord, determineScale, transpose_accords_or_gammas } from './HarmonyCalculator';
import { generateMelody, transposeMelody, analyzeMelodicPhrases } from './MelodyGenerator';
import { calculateResonatorSize } from './ResonatorSizeCalculator';
import { generateRhythmPattern } from './RhythmCalculator';
import { analyzeSpectrum, convertToDecibels, calculateFrequenciesAndIntervals, analyzeTemporalCharacteristics } from './SoundAnalysis';
import { calculateStringLength } from './StringLengthCalculator';
import { createTonic } from './TonicGenerator';

export default function Calculators() {
        const [baseFrequency, setBaseFrequency] = useState(440);
        const [semitones, setSemitones] = useState(0);
        const [rootNote, setRootNote] = useState('C');
        const [intervals, setIntervals] = useState(['3', '5']);
        const [key, setKey] = useState('C');
        const [isMajor, setIsMajor] = useState(true);
        const [notes, setNotes] = useState(['C', 'E', 'G']);
        const [transposeSemitones, setTransposeSemitones] = useState(2);
        const [melodyParams, setMelodyParams] = useState({
            length: 8,
            scale: 'C Major',
            tempo: 120,
        });
        const [transposedMelodyParams, setTransposedMelodyParams] = useState({
            transposeAmount: 2,
        });
        const [melodicPhrases, setMelodicPhrases] = useState(['C-D-E', 'G-A-B']);
        const [resonatorParams, setResonatorParams] = useState({
            frequency: 440,
            material: 'wood',
        });
        const [rhythmPatternParams, setRhythmPatternParams] = useState({
            beatsPerMeasure: 4,
            noteValue: 4,
        });
        const [spectrumData, setSpectrumData] = useState({
            dataPoints: [100, 200, 300],
        });
        const [decibels, setDecibels] = useState(60);
        const [frequencies, setFrequencies] = useState([440, 880, 1320]);
        const [temporalData, setTemporalData] = useState({
            duration: 5,
        });
        const [stringLengthParams, setStringLengthParams] = useState({
            tension: 100,
            gauge: 0.01,
        });
        const [tonicParams, setTonicParams] = useState({
            rootNote: 'C',
            scaleType: 'Major',
        });
        const frequencyResult = calculateFrequency(baseFrequency, semitones);
        const adaptedFrequency = adaptTo438Hz(baseFrequency);
        const chordResult = buildChord(rootNote, intervals);
        const scaleResult = determineScale(key, isMajor);
        const transposedNotes = transpose_accords_or_gammas(notes, transposeSemitones);
        const melodyResult = generateMelody(melodyParams);
        const transposedMelodyResult = transposeMelody(transposedMelodyParams);
        const phraseAnalysis = analyzeMelodicPhrases(melodicPhrases);
        const resonatorSize = calculateResonatorSize(resonatorParams);
        const rhythmPattern = generateRhythmPattern(rhythmPatternParams);
        const spectrumAnalysis = analyzeSpectrum(spectrumData);
        const decibelConversion = convertToDecibels(decibels);
        const frequencyIntervalAnalysis = calculateFrequenciesAndIntervals(frequencies);
        const temporalAnalysis = analyzeTemporalCharacteristics(temporalData);
        const stringLength = calculateStringLength(stringLengthParams);
        const tonic = createTonic(tonicParams);

   return (
        <div>
            {/* Frequency Calculation */}
            <h2>Frequency Calculation</h2>
            <div>
                <label>Base Frequency (Hz): </label>
                <input
                    type="number"
                    value={baseFrequency}
                    onChange={(e) => setBaseFrequency(parseFloat(e.target.value))}
                />
                <label>Semitones: </label>
                <input
                    type="number"
                    value={semitones}
                    onChange={(e) => setSemitones(parseInt(e.target.value))}
                />
                <hr />
                <h3>Frequency = <i>{`baseFrequency * 2^(semitones/12)`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{frequencyResult}</span></p>
            </div>
            <hr />

            {/* Adapt to 438Hz */}
            <h2>Adapt to 438Hz</h2>
            <div>
                <label>Base Frequency (Hz): </label>
                <input
                    type="number"
                    value={baseFrequency}
                    onChange={(e) => setBaseFrequency(parseFloat(e.target.value))}
                />
                <hr />
                <h3>Adapted Frequency = <i>{`baseFrequency - 2`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{adaptedFrequency}</span></p>
            </div>
            <hr />

            {/* Chord Building */}
            <h2>Chord Building</h2>
            <div>
                <label>Root Note: </label>
                <input
                    type="text"
                    value={rootNote}
                    onChange={(e) => setRootNote(e.target.value)}
                />
                <label>Intervals (comma-separated): </label>
                <input
                    type="text"
                    value={intervals.join(', ')}
                    onChange={(e) => setIntervals(e.target.value.split(', '))}
                />
                <hr />
                <h3>Chord = <i>{`rootNote + intervals`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{chordResult}</span></p>
            </div>
            <hr />

            {/* Scale Determination */}
            <h2>Scale Determination</h2>
            <div>
                <label>Key: </label>
                <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <label>Is Major: </label>
                <input
                    type="checkbox"
                    checked={isMajor}
                    onChange={(e) => setIsMajor(e.target.checked)}
                />
                <hr />
                <h3>Scale = <i>{`key + (isMajor ? ' Major' : ' Minor')`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{scaleResult}</span></p>
            </div>
            <hr />

            {/* Transpose Notes */}
            <h2>Transpose Notes</h2>
            <div>
                <label>Notes (comma-separated): </label>
                <input
                    type="text"
                    value={notes.join(', ')}
                    onChange={(e) => setNotes(e.target.value.split(', '))}
                />
                <label>Transpose Semitones: </label>
                <input
                    type="number"
                    value={transposeSemitones}
                    onChange={(e) => setTransposeSemitones(parseInt(e.target.value))}
                />
                <hr />
                <h3>Transposed Notes = <i>{`notes + transposeSemitones`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{transposedNotes}</span></p>
            </div>
            <hr />

            {/* Melody Generation */}
            <h2>Melody Generation</h2>
            <div>
                <label>Melody Parameters: </label>
                <textarea
                    value={JSON.stringify(melodyParams, null, 2)}
                    onChange={(e) => setMelodyParams(JSON.parse(e.target.value))}
                />
                <hr />
                <h3>Melody = <i>{`melodyParams`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{melodyResult}</span></p>
            </div>
            <hr />

            {/* Transpose Melody */}
            <h2>Transpose Melody</h2>
            <div>
                <label>Transpose Melody Parameters: </label>
                <textarea
                    value={JSON.stringify(transposedMelodyParams, null, 2)}
                    onChange={(e) => setTransposedMelodyParams(JSON.parse(e.target.value))}
                />
                <hr />
                <h3>Transposed Melody = <i>{`transposedMelodyParams`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{transposedMelodyResult}</span></p>
            </div>
            <hr />

            {/* Melodic Phrases Analysis */}
            <h2>Melodic Phrases Analysis</h2>
            <div>
                <label>Melodic Phrases (comma-separated): </label>
                <input
                    type="text"
                    value={melodicPhrases.join(', ')}
                    onChange={(e) => setMelodicPhrases(e.target.value.split(', ').map(phrase => phrase.trim()))}
                />
                <hr />
                <h3>Phrase Analysis = <i>{`melodicPhrases`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{phraseAnalysis}</span></p>
            </div>
            <hr />

            {/* Resonator Size Calculation */}
            <h2>Resonator Size Calculation</h2>
            <div>
                <label>Resonator Parameters: </label>
                <textarea
                    value={JSON.stringify(resonatorParams, null, 2)}
                    onChange={(e) => setResonatorParams(JSON.parse(e.target.value))}
                />
                <hr />
                <h3>Resonator Size = <i>{`resonatorParams`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{resonatorSize}</span></p>
            </div>
            <hr />

            {/* Rhythm Pattern Generation */}
            <h2>Rhythm Pattern Generation</h2>
            <div>
                <label>Rhythm Pattern Parameters: </label>
                <textarea
                    value={JSON.stringify(rhythmPatternParams, null, 2)}
                    onChange={(e) => setRhythmPatternParams(JSON.parse(e.target.value))}
                />
                <hr />
                <h3>Rhythm Pattern = <i>{`rhythmPatternParams`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{rhythmPattern}</span></p>
            </div>
            <hr />

            {/* Spectrum Analysis */}
            <h2>Spectrum Analysis</h2>
            <div>
                <label>Spectrum Data: </label>
                <textarea
                    value={JSON.stringify(spectrumData, null, 2)}
                    onChange={(e) => setSpectrumData(JSON.parse(e.target.value))}
                />
                <hr />
                <h3>Spectrum Analysis = <i>{`spectrumData`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{spectrumAnalysis}</span></p>
            </div>
            <hr />

            {/* Decibel Conversion */}
            <h2>Decibel Conversion</h2>
            <div>
                <label>Decibels: </label>
                <input
                    type="number"
                    value={decibels}
                    onChange={(e) => setDecibels(parseInt(e.target.value))}
                />
                <hr />
                <h3>Decibel Conversion = <i>{`decibels`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{decibelConversion}</span></p>
            </div>
            <hr />

            {/* Frequency Interval Analysis */}
            <h2>Frequency Interval Analysis</h2>
            <div>
                <label>Frequencies (comma-separated): </label>
                <input
                    type="text"
                    value={frequencies.join(', ')}
                    onChange={(e) => setFrequencies(e.target.value.split(', ').map(freq => parseFloat(freq)))}
                />
                <hr />
                <h3>Frequency Interval Analysis = <i>{`frequencies`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{frequencyIntervalAnalysis}</span></p>
            </div>
            <hr />

            {/* Temporal Characteristics Analysis */}
            <h2>Temporal Characteristics Analysis</h2>
            <div>
                <label>Temporal Data: </label>
                <textarea
                    value={JSON.stringify(temporalData, null, 2)}
                    onChange={(e) => setTemporalData(JSON.parse(e.target.value))}
                />
                <hr />
                <h3>Temporal Analysis = <i>{`temporalData`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{temporalAnalysis}</span></p>
            </div>
            <hr />

            {/* String Length Calculation */}
            <h2>String Length Calculation</h2>
            <div>
                <label>String Length Parameters: </label>
                <textarea
                    value={JSON.stringify(stringLengthParams, null, 2)}
                    onChange={(e) => setStringLengthParams(JSON.parse(e.target.value))}
                />
                <hr />
                <h3>String Length = <i>{`stringLengthParams`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{stringLength}</span></p>
            </div>
            <hr />

            {/* Tonic Creation */}
            <h2>Tonic Creation</h2>
            <div>
                <label>Tonic Parameters: </label>
                <textarea
                    value={JSON.stringify(tonicParams, null, 2)}
                    onChange={(e) => setTonicParams(JSON.parse(e.target.value))}
                />
                <hr />
                <h3>Tonic = <i>{`tonicParams`}</i></h3>
                <p>Result: <span style={{ color: 'blue' }}>{tonic}</span></p>
            </div>
            <hr />
        </div>
    );
}
