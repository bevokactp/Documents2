
export const drawCommonElements = (ctx, width, height, gardenRadius, innerCircleRadius, outerCircleColor, innerCircleColor) => {
    // Рисуем внешний круг
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, gardenRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = outerCircleColor;
    ctx.stroke();

    // Рисуем внутренний круг
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, innerCircleRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = innerCircleColor;
    ctx.stroke();

    // Рисуем линии от центра
    const angleStep = (2 * Math.PI) / 8; // По умолчанию 24 линии
    for (let i = 0; i < 24; i++) {
        const angle = angleStep * i;
        const startX = width / 2 + innerCircleRadius * Math.cos(angle);
        const startY = height / 2 + innerCircleRadius * Math.sin(angle);
        const endX = width / 2 + gardenRadius * Math.cos(angle);
        const endY = height / 2 + gardenRadius * Math.sin(angle);

        ctx.strokeStyle = '#000000'; // Цвет линий от центра
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
};
