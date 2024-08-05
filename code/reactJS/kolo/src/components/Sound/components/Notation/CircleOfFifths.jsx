import React from 'react';

const CircleOfFifths = () => {
  const radius = 200; // Радиус круга
  const center = radius; // Центр круга
  const notes = [
    'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭', 'F'
  ];
  const angleStep = (2 * Math.PI) / notes.length;

  return (
    <svg width={2 * radius} height={2 * radius} viewBox={`0 0 ${2 * radius} ${2 * radius}`} style={{ border: '1px solid #000' }}>
      <circle cx={center} cy={center} r={radius} fill="#fff" stroke="#000" strokeWidth="2" />
      {notes.map((note, index) => {
        const angle = index * angleStep;
        const x = center + radius * Math.cos(angle);
        const y = center - radius * Math.sin(angle);
        return (
          <text
            key={note}
            x={x}
            y={y}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="16"
            fill="#000"
            transform={`rotate(${(index * 360) / notes.length}, ${x}, ${y})`}
          >
            {note}
          </text>
        );
      })}
    </svg>
  );
};

export default CircleOfFifths;
