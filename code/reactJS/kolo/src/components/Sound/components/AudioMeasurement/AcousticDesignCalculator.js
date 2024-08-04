// Расчет размеров акустического оформления для динамиков.
// Определение частоты резонанса и характеристик направленности

// Функция для расчета частоты резонанса (f = c / (2 * π * sqrt(m * k)))
export function calculateResonanceFrequency(speedOfSound, mass, stiffness) {
    // speedOfSound - скорость звука в воздухе (м/с)
    // mass - масса подвижной системы динамика (кг)
    // stiffness - жесткость подвеса динамика (Н/м)
    const frequency = speedOfSound / (2 * Math.PI * Math.sqrt(mass * stiffness));
    return frequency.toFixed(2);
}

// Функция для расчета характеристик направленности
export function calculateDirectivity(wavelength, diameter) {
    // wavelength - длина волны (м)
    // diameter - диаметр динамика (м)
    const directivity = wavelength / diameter;
    return directivity.toFixed(2);
}
