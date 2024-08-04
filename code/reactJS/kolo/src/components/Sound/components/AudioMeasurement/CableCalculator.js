// Расчет длины кабеля для заданного сопротивления.
// Определение потерь мощности в кабеле

// Функция для расчета длины кабеля (L = R * A / ρ)
export function calculateCableLength(resistance, crossSectionalArea, resistivity) {
    // resistance - сопротивление кабеля (Ом)
    // crossSectionalArea - площадь поперечного сечения кабеля (мм^2)
    // resistivity - удельное сопротивление материала кабеля (Ом·мм^2/м)
    const length = resistance * crossSectionalArea / resistivity;
    return length.toFixed(2);
}

// Функция для определения потерь мощности (P_loss = I^2 * R)
export function calculatePowerLoss(current, resistance) {
    // current - ток в кабеле (А)
    // resistance - сопротивление кабеля (Ом)
    const powerLoss = Math.pow(current, 2) * resistance;
    return powerLoss.toFixed(2);
}
