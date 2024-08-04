import React, { useState } from 'react';
import {
    calculateResonanceFrequency,
    calculateDirectivity
} from './AcousticDesignCalculator';
import {
    calculateCableLength,
    calculatePowerLoss
} from './CableCalculator';
import {
    calculateCrossoverFrequency,
    calculateSlope
} from './CrossoverCalculator';
import {
    calculateImpedance
} from './ImpedanceCalculator';
import {
    calculateMaxPower
} from './PowerCalculator';
import {
    analyzeAmplitude,
    analyzeFrequency
} from './SpectrumAnalyzer';
import {
    measureVolume
} from './VolumeMeter';

export default function AudioMeasurement() {
    // Acoustic Design Calculator
    const [speedOfSound, setSpeedOfSound] = useState(343);
    const [mass, setMass] = useState(0.01);
    const [stiffness, setStiffness] = useState(100);
    const [wavelength, setWavelength] = useState(0.34);
    const [diameter, setDiameter] = useState(0.25);

    const resonanceFrequency = calculateResonanceFrequency(speedOfSound, mass, stiffness);
    const directivity = calculateDirectivity(wavelength, diameter);

    // Crossover Calculator
    const [inductance, setInductance] = useState(0.002);
    const [capacitance, setCapacitance] = useState(0.000001);
    const crossoverFrequency = calculateCrossoverFrequency(inductance, capacitance);
    const [inputVoltage, setInputVoltage] = useState(1);
    const [outputVoltage, setOutputVoltage] = useState(0.5);
    const slope = calculateSlope(inputVoltage, outputVoltage);

    // Impedance Calculator
    const [resistanceImpedance, setResistanceImpedance] = useState(8);
    const [inductiveReactance, setInductiveReactance] = useState(4);
    const [capacitiveReactance, setCapasitiveReactance] = useState(5);
    const impedance = calculateImpedance(resistanceImpedance, inductiveReactance, capacitiveReactance);

    // Power Calculator
    const [maxVoltage, setMaxVoltage] = useState(50);
    const [safetyFactor, setSafetyFactor] = useState(1.2);
    const maxPower = calculateMaxPower(maxVoltage, safetyFactor);

    // Volume Meter
    const [signalLevel, setSignalLevel] = useState(0.02);
    const [referenceLevel, setReferenceLevel] = useState(0.00002);
    const volume = measureVolume(signalLevel, referenceLevel);

    const [voltage, setVoltage] = useState(1); // Напряжение (В)
    const [referenceVoltage, setReferenceVoltage] = useState(0.0001); // Опорное напряжение (В)
    const [period, setPeriod] = useState(0.01); // Период сигнала (с)
    const amplitudeResult = analyzeAmplitude(voltage, referenceVoltage);
    const frequencyResult = analyzeFrequency(period);

    const [resistance, setResistance] = useState(0.01); // Сопротивление кабеля (Ом)
    const [crossSectionalArea, setCrossSectionalArea] = useState(1.5); // Площадь поперечного сечения (мм²)
    const [resistivity, setResistivity] = useState(0.0175); // Удельное сопротивление материала кабеля (Ом·мм²/м)
    const [current, setCurrent] = useState(1.0); // Ток в кабеле (А)
    const [resistanceForPowerLoss, setResistanceForPowerLoss] = useState(0.01); // Сопротивление кабеля (Ом)
    const cableLengthResult = calculateCableLength(resistance, crossSectionalArea, resistivity);
    const powerLossResult = calculatePowerLoss(current, resistanceForPowerLoss);

    return (
      <div>

            <hr />

            <h3>Длина кабеля: {cableLengthResult} м = <i>сопротивление * площадь поперечного сечения / удельное сопротивление материала</i></h3>
            <label> Сопротивление кабеля (Ω): <input type="number" value={resistance} onChange={e => setResistance(parseFloat(e.target.value))} /> </label>
            <label> Площадь поперечного сечения (мм²): <input type="number" value={crossSectionalArea} onChange={e => setCrossSectionalArea(parseFloat(e.target.value))} /> </label>
            <label> Удельное сопротивление (Ω·мм²/м): <input type="number" value={resistivity} onChange={e => setResistivity(parseFloat(e.target.value))} /> </label>

            <hr />

            <h3>Потери мощности: {powerLossResult} Вт = <i>(ток в кабеле)² * сопротивление кабеля</i></h3>
            <label> Ток в кабеле (А): <input type="number" value={current} onChange={e => setCurrent(parseFloat(e.target.value))} /> </label>
            <label> Сопротивление кабеля (Ω): <input type="number" value={resistanceForPowerLoss} onChange={e => setResistanceForPowerLoss(parseFloat(e.target.value))} />
            </label>

            <hr />

            <h3>Частота резонанса: {resonanceFrequency} Гц = <i>скорость звука / (2 * √(масса / жесткость)</i></h3>
            <label> Скорость звука (м/с): <input type="number" value={speedOfSound} onChange={e => setSpeedOfSound(e.target.value)} /> </label>
            <label> Масса (кг): <input type="number" value={mass} onChange={e => setMass(e.target.value)} /> </label>
            <label> Жесткость (Н/м): <input type="number" value={stiffness} onChange={e => setStiffness(e.target.value)} /> </label>

            <hr />

            <h3>Направленность: {directivity} = <i>2 * π * (диаметр / длина волны)</i></h3>
            <label> Длина волны (м): <input type="number" value={wavelength} onChange={e => setWavelength(e.target.value)} /> </label>
            <label> Диаметр (м): <input type="number" value={diameter} onChange={e => setDiameter(e.target.value)} /> </label>

            <hr />

            <h3>Частота кроссовера: {crossoverFrequency} Гц = <i>1 / (2 * π * √(индуктивность * ёмкость))</i></h3>
            <label> Индуктивность (Гн): <input type="number" value={inductance} onChange={e => setInductance(e.target.value)} /> </label>
            <label> Ёмкость (Ф): <input type="number" value={capacitance} onChange={e => setCapacitance(e.target.value)} /> </label>

            <hr />

            <h3>Уклон: {slope} дБ = <i>20 * log10(входное напряжение / выходное напряжение)</i></h3>
            <label> Входное напряжение (В): <input type="number" value={inputVoltage} onChange={e => setInputVoltage(e.target.value)} /> </label>
            <label> Выходное напряжение (В): <input type="number" value={outputVoltage} onChange={e => setOutputVoltage(e.target.value)} /> </label>

            <hr />

            <h3>Импеданс: {impedance} Ω = <i>√(сопротивление² + (индуктивное сопротивление - ёмкостное сопротивление)²)</i></h3>
            <label> Сопротивление (Ω): <input type="number" value={resistanceImpedance} onChange={e => setResistanceImpedance(e.target.value)} /> </label>
            <label> Индуктивное сопротивление (Ом) (Ω): <input type="number" value={inductiveReactance} onChange={e => setInductiveReactance(e.target.value)} /> </label>
            <label> Ёмкостное сопротивление (Ом) (Ω): <input type="number" value={capacitiveReactance} onChange={e => setCapasitiveReactance(e.target.value)} /> </label>

            <hr />

            <h3>Максимальная мощность: {maxPower} Вт = <i>номинальная мощность (Вт) * коэффициент безопасности</i></h3>
            <label> Максимальное напряжение (В): <input type="number" value={maxVoltage} onChange={e => setMaxVoltage(e.target.value)} /> </label>
            <label> Коэффициент безопасности: <input type="number" value={safetyFactor} onChange={e => setSafetyFactor(e.target.value)} /> </label>

            <hr />

            <h3>Амплитуда: {amplitudeResult} дБ = <i>20 * log10(напряжение / напряжение опорное)</i></h3>
            <label> Напряжение (В): <input type="number" value={voltage} onChange={e => setVoltage(parseFloat(e.target.value))} /> </label>
            <label> Опорное напряжение (В): <input type="number" value={referenceVoltage} onChange={e => setReferenceVoltage(parseFloat(e.target.value))} /> </label>

            <hr />

            <h3>Частота: {frequencyResult} Гц = <i>1 / период сигнала</i></h3>
            <label> Период сигнала (с): <input type="number" value={period} onChange={e => setPeriod(parseFloat(e.target.value))} /> </label>

            <hr />

            <h3>Громкость {volume} дБ = <i>20 * log10(уровень сигнала / референсный уровень)</i></h3>
            <label> Уровень сигнала (Па): <input type="number" value={signalLevel} onChange={e => setSignalLevel(e.target.value)} /> </label>
            <label> Референсный уровень (Па): <input type="number" value={referenceLevel} onChange={e => setReferenceLevel(e.target.value)} /> </label>

        </div>
    );
}
