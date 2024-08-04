import React, { useState, useEffect, useRef } from 'react';
import { drawCircularGarden } from './circular';
import { drawFiveLeafGarden } from './5';
import { drawTwentyFourLeafGarden } from './24';
import { drawConcentricAccumulatingGarden, drawConcentricRadiatingGarden } from './concentric';
import { drawCommonElements } from './utils';

const Pasha = () => {
  const canvasRef = useRef(null);
  const canvasSize = 900;
  const [gardenRadius, setGardenRadius] = useState(canvasSize / 2);
  const [innerCircleRadius, setInnerCircleRadius] = useState(canvasSize / 10);
  const [treeCrownDiameter, setTreeCrownDiameter] = useState(5);
  const [petalsCount, setPetalsCount] = useState(24);
  const [petals, setPetals] = useState(new Array(24).fill(true));
  const [gardenType, setGardenType] = useState('24-leaf');
  const [colors, setColors] = useState({ outerCircle: '', innerCircle: '', petals: [] });
  const [totalTrees, setTotalTrees] = useState(0);

  useEffect(() => {
    setPetals(new Array(petalsCount).fill(true));
    setInnerCircleRadius(gardenRadius / 5);
  }, [petalsCount, gardenRadius]);

  useEffect(() => {
    setColors({
      outerCircle: generateRandomColor(),
      innerCircle: generateRandomColor(),
      petals: Array.from({ length: petalsCount }, generateRandomColor) // Генерация цветов для лепестков
    });
  }, [petalsCount]);

  useEffect(() => {
    drawGarden();
  }, [gardenRadius, innerCircleRadius, treeCrownDiameter, petals, gardenType]);

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  };

  const drawGarden = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Рисуем общий функционал
    drawCommonElements(ctx, width, height, gardenRadius, innerCircleRadius, colors.outerCircle, colors.innerCircle);

    let totalTreesCount = 0;
    switch (gardenType) {
      case 'circular':
        totalTreesCount = drawCircularGarden(ctx, width, height, gardenRadius, innerCircleRadius, treeCrownDiameter, petals, colors);
        break;
      case '5-leaf':
        totalTreesCount = drawFiveLeafGarden(ctx, width, height, gardenRadius, innerCircleRadius, treeCrownDiameter, petals, colors);
        break;
      case '24-leaf':
        totalTreesCount = drawTwentyFourLeafGarden(ctx, width, height, gardenRadius, innerCircleRadius, treeCrownDiameter, petals, colors);
        break;
      case 'concentric-in':
        totalTreesCount = drawConcentricAccumulatingGarden(ctx, width, height, gardenRadius, innerCircleRadius, treeCrownDiameter, petals, colors);
        break;
      case 'concentric-out':
        totalTreesCount = drawConcentricRadiatingGarden(ctx, width, height, gardenRadius, innerCircleRadius, treeCrownDiameter, petals, colors);
        break;
      default:
        break;
    }
    setTotalTrees(totalTreesCount);
  };

  const PetalVisibilityToggle = (index) => {
    setPetals(petals.map((visible, i) => (i === index ? !visible : visible)));
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '10px' }}>
        <div>
          <label>
            Диаметр внешнего круга:
            <input
              type="number"
              value={gardenRadius * 2}
              onChange={(e) => setGardenRadius(parseFloat(e.target.value) / 2)}
              step="100"
              min="100"
            />
          </label>
        </div>
        <div>
          <label>
            Диаметр кроны дерева:
            <input
              type="number"
              value={treeCrownDiameter}
              onChange={(e) => setTreeCrownDiameter(parseFloat(e.target.value))}
              step="1"
              min="1"
            />
          </label>
        </div>
        <div>
          <label>
            Количество лепестков:
            <input
              type="number"
              value={petalsCount}
              onChange={(e) => setPetalsCount(parseInt(e.target.value))}
              step="1"
              min="5"
              max="24"
            />
          </label>
        </div>
        <div>
          <label>
            Тип ращи:
            <select value={gardenType} onChange={(e) => setGardenType(e.target.value)}>
              <option value="circular">Круговая</option>
              <option value="5-leaf">5-лепестковая</option>
              <option value="24-leaf">24-лепестковая</option>
              <option value="concentric-in">Концентрическая накапливающая</option>
              <option value="concentric-out">Концентрическая отдающая</option>
            </select>
          </label>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Видимость</th>
                <th>Лепесток</th>
                <th>Количество деревьев</th>
              </tr>
            </thead>
            <tbody>
              {petals.map((isVisible, index) => {
                const treesCount = Math.floor((2 * Math.PI * (innerCircleRadius + (gardenRadius - innerCircleRadius) / petals.length * (index + 1))) / (treeCrownDiameter * 2));
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={() => PetalVisibilityToggle(index)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{treesCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <div>Общее количество деревьев: {totalTrees}</div>
        {gardenType === 'circular' && (
          <div>
            <div>
              Диаметр внутреннего круга: {innerCircleRadius * 2}
            </div>
            <div>
              Диаметры лепестков:
              <ul>
                {petals.map((_, index) => (
                  <li key={index}>
                    Лепесток {index + 1}: {innerCircleRadius + (gardenRadius - innerCircleRadius) / petals.length * (index + 1) * 2}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div style={{ flex: 1, border: '1px solid black' }}>
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          style={{ border: '1px solid black', backgroundColor: 'white' }}
        />
      </div>
    </div>
  );
};

export default Pasha;
