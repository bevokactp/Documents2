// circularGarden.js
import { drawCommonElements } from './utils';

export const drawCircularGarden = (ctx, width, height, gardenRadius, innerCircleRadius, treeCrownDiameter, petals, colors) => {
    const distanceBetweenPetals = (gardenRadius - innerCircleRadius) / petals.length;
    let totalTreesCount = 0;
    const angleStep = (2 * Math.PI) / petals.length;

    drawCommonElements(ctx, width, height, gardenRadius, innerCircleRadius, colors.outerCircle, colors.innerCircle);

    for (let i = 0; i < petals.length; i++) {
        if (petals[i]) {
            const petalRadius = innerCircleRadius + distanceBetweenPetals * (i + 1);
            const treesCount = Math.floor((2 * Math.PI * petalRadius) / (treeCrownDiameter * 2));
            totalTreesCount += treesCount;

            // Рисуем деревья на лепестке
            const treeAngleStep = (2 * Math.PI) / treesCount;
            for (let j = 0; j < treesCount; j++) {
                const treeAngle = treeAngleStep * j - Math.PI / 2; // Начало с угла 90°
                const treeX = width / 2 + petalRadius * Math.cos(treeAngle);
                const treeY = height / 2 + petalRadius * Math.sin(treeAngle);
                ctx.beginPath();
                ctx.arc(treeX, treeY, treeCrownDiameter / 2, 0, 2 * Math.PI);
                ctx.fillStyle = colors.petals[i];
                ctx.fill();
            }
        }
    }
    return totalTreesCount;
};
