// Определение максимальной мощности, которую может выдержать динамик

// Функция для определения максимальной мощности
export function calculateMaxPower(ratedPower, safetyFactor) {
    // ratedPower - номинальная мощность (Вт)
    // safetyFactor - коэффициент безопасности
    const maxPower = ratedPower * safetyFactor;
    return maxPower.toFixed(2);
}
