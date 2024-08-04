// Отображает гаммы в различных тональностях и мажорах/минорах.

import React from 'react';
import { createScale } from './ScaleCreator.js';

const ScaleViewer = ({ tonic, scaleType }) => {
  const scales = {
    major: [2, 2, 1, 2, 2, 2, 1],
    minor: [2, 1, 2, 2, 1, 2, 2],
    // Добавьте другие типы гамм по необходимости
  };

  const scale = createScale(tonic, scales[scaleType]);

  return (
    <div>
      <h3>{tonic} {scaleType} Scale</h3>
      <ul>
        {scale.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScaleViewer;
