import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";

import { getSolidInfo, solidsAttrs } from "./geometryUtils";
import Solid from "./solid";


export default function PlatonicMetki() {
  const [sideLength, setSideLength] = useState(1);
  const [rotationSpeed, setRotationSpeed] = useState({
    x: 0.5,
    y: 0.5,
    z: 0.5,
  });
  const [hideFaces, setHideFaces] = useState(false); // Состояние для скрытия плоскостей

  const handleChangeHideFaces = () => {
    setHideFaces((prevHideFaces) => !prevHideFaces);
  };

  const handleChangeSideLength = (e) => {
    setSideLength(Number(e.target.value) || 1); // Значение по умолчанию 1
  };

  const handleChangeRotationSpeed = (e) => {
    const { name, value } = e.target;
    setRotationSpeed((prev) => ({
      ...prev,
      [name]: Math.max(0, Math.min(2, parseFloat(value) || 0)),
    }));
  };

  return (
    <div>
      <h1>Метки</h1>
      <div>
        <label>
          {" "}
          Длина (радиус) стороны:{" "}
          <input
            type="number"
            value={sideLength}
            onChange={handleChangeSideLength}
            step="0.1"
            min="0.1"
          />{" "}
        </label>
        <label>
          Скорость вращения по осям: Х{" "}
          <input
            type="number"
            name="x"
            value={rotationSpeed.x}
            onChange={handleChangeRotationSpeed}
            step="0.1"
            min="0"
            max="2"
            required
          />
          У{" "}
          <input
            type="number"
            name="y"
            value={rotationSpeed.y}
            onChange={handleChangeRotationSpeed}
            step="0.1"
            min="0"
            max="2"
            required
          />
          Д{" "}
          <input
            type="number"
            name="z"
            value={rotationSpeed.z}
            onChange={handleChangeRotationSpeed}
            step="0.1"
            min="0"
            max="2"
            required
          />
        </label>
        <label>
          {" "}
          Скрыть плоскости:{" "}
          <input
            type="checkbox"
            checked={hideFaces}
            onChange={handleChangeHideFaces}
          />{" "}
        </label>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {Object.keys(solidsAttrs).map((key, index) => {
          const solid = solidsAttrs[key];
          const { volume, surfaceArea, vertices, edges, faces } = getSolidInfo(
            key,
            sideLength
          );
          return (
            <div key={index} style={{ width: "200px" }}>
              <h2>{solid.name}</h2>
              <Canvas
                style={{ height: "200px", width: "100%", background: "snow" }}
              >
                <PerspectiveCamera makeDefault position={[3, 0, 0]} />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Solid
                  type={key}
                  sideLength={sideLength}
                  rotationSpeed={rotationSpeed}
                  hideFaces={hideFaces}
                />
                <OrbitControls />
              </Canvas>
              <div>
                <p>Объем: {volume.toFixed(2)}</p>
                <p>Площадь: {surfaceArea.toFixed(2)}</p>
                <p>Вершины: {vertices}</p>
                <p>Ребра: {edges}</p>
                <p>Плоскости: {faces}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
