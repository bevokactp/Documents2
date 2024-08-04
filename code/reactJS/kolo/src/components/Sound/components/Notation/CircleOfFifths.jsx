import React from 'react';
import './CircleOfFifths.css'; // Импорт стилей для компонента

const CircleOfFifths = ({ notes }) => {
  const radius = 200; // Радиус круга
  const centerX = 250; // X-координата центра круга
  const centerY = 250; // Y-координата центра круга
  const angle = 2 * Math.PI / notes.length; // Угол между нотами

  return (
    <div className="circle-container">
      <svg width="500" height="500" viewBox="0 0 500 500">
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="black" strokeWidth="2" />
        {notes.map((note, index) => {
          const x = centerX + radius * Math.cos(index * angle - Math.PI / 2);
          const y = centerY + radius * Math.sin(index * angle - Math.PI / 2);
          return (
            <text
              key={note}
              x={x}
              y={y}
              textAnchor="middle"
              alignmentBaseline="central"
              fontSize="16"
              fill="black"
              transform={`translate(${x}, ${y})`}
            >
              {note}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default CircleOfFifths;
