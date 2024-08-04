// Расчет частот среза кроссоверов.
// Определение крутизны спада.

// Функция для расчета частоты среза (f_c = 1 / (2 * π * sqrt(L * C)))
export function calculateCrossoverFrequency(inductance, capacitance) {
    // inductance - индуктивность (Гн)
    // capacitance - емкость (Ф)
    const frequency = 1 / (2 * Math.PI * Math.sqrt(inductance * capacitance));
    return frequency.toFixed(2);
}

// Функция для определения крутизны спада (Slope = 20 * log10(V_out / V_in))
export function calculateSlope(voltageOut, voltageIn) {
    // voltageOut - выходное напряжение (В)
    // voltageIn - входное напряжение (В)
    const slope = 20 * Math.log10(voltageOut / voltageIn);
    return slope.toFixed(2);
}
