import React, { useState } from 'react';

// Список 24 темных цветов для колец
const darkColors = [
  "#2E3A44", "#3A4A59", "#4A5D6A", "#5A6D7D", "#6A7F8A",
  "#7A8E9B", "#8A9FAD", "#9AB0BE", "#AAB9CE", "#B9C3DD",
  "#C9D3E0", "#D9E0E3", "#E9E6E8", "#F0F0F5", "#B9B9B9",
  "#8C8C8C", "#6F6F6F", "#535353", "#404040", "#2B2B2B",
  "#1E1E1E", "#141414", "#0D0D0D", "#0A0A0A", "#050505",
  "#2F2F2F", "#4F4F4F", "#6F6F6F", "#8F8F8F", "#AFAFAF"
];

const Apkohtahg = () => {
  const initialRadius = 50;
  const [radius, setRadius] = useState(initialRadius);
  const [spacing, setSpacing] = useState(10);
  const [rings, setRings] = useState([]);
  const [dividerCounts, setDividerCounts] = useState({});

  const handleDividerChange = (ringIndex, event) => {
    const value = Math.max(1, Math.min(24, Number(event.target.value)));
    setDividerCounts(prev => ({ ...prev, [ringIndex]: value }));
  };

  const addRing = () => {
    if (rings.length < 24) {
      const newIndex = rings.length;
      setRings([...rings, darkColors[newIndex]]);
      setDividerCounts(prev => ({ ...prev, [newIndex]: 1 }));
    }
  };

  const removeRing = () => {
    if (rings.length > 0) {
      const newRings = rings.slice(0, -1);
      const newDividerCounts = { ...dividerCounts };
      delete newDividerCounts[newRings.length];
      setRings(newRings);
      setDividerCounts(newDividerCounts);
    }
  };

  const generateCircle = (r, color, zIndex) => (
    <circle cx="0" cy="0" r={r} stroke={color} strokeWidth={spacing} fill="none" style={{ zIndex }} />
  );

  const generateDividers = (innerRadius, outerRadius, numDividers) => {
    if (numDividers <= 1) return null;

    const angleStep = (2 * Math.PI) / numDividers;
    const halfSpacing = spacing / 2;
    const dividers = [];
    const labels = [];

    for (let i = 0; i < numDividers; i++) {
      const angle = i * angleStep - Math.PI / 2; // Начальный угол 90°

      // Вычисляем начальные и конечные точки разделителя
      const x1 = (innerRadius - halfSpacing) * Math.cos(angle);
      const y1 = (innerRadius - halfSpacing) * Math.sin(angle);
      const x2 = (outerRadius - halfSpacing) * Math.cos(angle);
      const y2 = (outerRadius - halfSpacing) * Math.sin(angle);

      dividers.push(
        <line
          key={`divider-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="white"
          strokeWidth={2}
        />
      );

      // Вычисляем середину разделителя для метки
      const midAngle = angle + angleStep / 2;
      const midX = (outerRadius - spacing) * Math.cos(midAngle);
      const midY = (outerRadius - spacing) * Math.sin(midAngle);

      labels.push(
        <text
          key={`label-${i}`}
          x={midX}
          y={midY}
          fill="black"
          fontSize="10"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {numDividers - i} {/* Нумерация против часовой стрелки */}
        </text>
      );
    }

    return (
      <>
        {dividers}
        {labels}
      </>
    );
  };

  const circles = [radius, ...rings.map((_, index) => radius + (index + 1) * spacing)];

  return (
    <div>
      <button onClick={addRing}>Добавить кольцо</button>
      <button onClick={removeRing}>Удалить кольцо</button>

      <label>
        Отступ:
        <input
          type="number"
          min="1"
          value={spacing}
          onChange={(e) => setSpacing(Math.max(1, Number(e.target.value)))}
        />
      </label>

      {rings.map((_, index) => (
        <div key={index}>
          <label>
            Количество разделителей для кольца {index + 1}:
            <input
              type="number"
              min="1"
              max="24"
              value={dividerCounts[index] || 1}
              onChange={(event) => handleDividerChange(index, event)}
            />
          </label>
        </div>
      ))}

      <svg width="500" height="500" viewBox="-150 -150 300 300">
        {/* Внутренний круг неоново-синий */}
        {generateCircle(radius, 'deepskyblue', -1)}

        {/* Кольца */}
        {rings.map((color, index) => (
          <React.Fragment key={index}>
            {generateCircle(circles[index + 1], color, -index)}
          </React.Fragment>
        ))}

        {/* Разделители */}
        {rings.map((_, index) => (
          <React.Fragment key={index}>
            {generateDividers(circles[index], circles[index + 1], dividerCounts[index])}
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default Apkohtahg;
