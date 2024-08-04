import React, { useState } from 'react';

// Замените на свои пути
const FILES_PATHS = [
  '/mitpiki/2023_12_29.json',
  '/mitpiki/2023_8_1.json',
  // Добавьте другие пути при необходимости
];

const fetchFileData = async (filepath) => {
  const response = await fetch(filepath);
  return await response.json();
};

const Mitrik = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [calculatedParams, setCalculatedParams] = useState(null);

  const handleFileSelect = async (filepath) => {
    const data = await fetchFileData(filepath);
    setSelectedFile(filepath);
    setParameters(data);

    // Вычисление новых параметров
    const рост = data['нога левая']['голень'] + data['нога левая']['бедро'] + data['туловище']['сажень казая'];
    const рукаДлина = data['рука левая']['локоть']['лучевой'] + data['рука левая']['ладонь'] + data['рука левая']['конечности']['палецъ'][2];
    setCalculatedParams({ рост, рукаДлина });
  };

  return (
    <div>
      <h1>Медицинская карта</h1>
      <ul>
        {FILES_PATHS.map((filepath) => (
          <li key={filepath} onClick={() => handleFileSelect(filepath)}>
            {filepath.split('/').pop()}
          </li>
        ))}
      </ul>
      {parameters && (
        <div>
          <h2>Параметры тела</h2>
          <pre>{JSON.stringify(parameters, null, 2)}</pre>
          {calculatedParams && (
            <div>
              <h3>Вычисленные параметры</h3>
              <p>Рост: {calculatedParams.рост}</p>
              <p>Длина руки: {calculatedParams.рукаДлина}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mitrik;
