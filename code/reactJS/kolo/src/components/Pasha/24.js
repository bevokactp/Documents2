export const drawTwentyFourLeafGarden = (ctx, width, height, gardenRadius, innerCircleRadius, treeCrownDiameter, petals, colors) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const petalCount = 24;
    const angleStep = (2 * Math.PI) / petalCount;

    let totalTreesCount = 0;

    for (let i = 0; i < petalCount; i++) {
      const angle = i * angleStep;

      // Calculate tree position at the outer circle
      const treeX = centerX + gardenRadius * Math.cos(angle);
      const treeY = centerY + gardenRadius * Math.sin(angle);

      // Draw tree at the outer circle
      ctx.fillStyle = colors.petals[i];
      ctx.beginPath();
      ctx.arc(treeX, treeY, treeCrownDiameter / 2, 0, 2 * Math.PI);
      ctx.fill();

      totalTreesCount++;
    }

    return totalTreesCount;
  };
