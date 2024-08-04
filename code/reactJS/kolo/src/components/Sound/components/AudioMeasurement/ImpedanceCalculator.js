// Расчет импеданса динамиков.

// Функция для расчета импеданса (Z = sqrt(R^2 + (X_L - X_C)^2))
export function calculateImpedance(resistance, inductiveReactance, capacitiveReactance) {
    // resistance - сопротивление (Ом)
    // inductiveReactance - индуктивное сопротивление (Ом)
    // capacitiveReactance - емкостное сопротивление (Ом)
    const impedance = Math.sqrt(Math.pow(resistance, 2) + Math.pow((inductiveReactance - capacitiveReactance), 2));
    return impedance.toFixed(2);
}
